import { toastType } from "@/components/global/toast/toastType";
import { createToast } from "@/utils/createToast";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { get, ref as refDb } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database } from "@/firebase/index.js";
import { createUser } from "@/firebase/services/auth.js";
import { useRoute, useRouter } from "vue-router";
import { authRoles } from "@/enums/authRoles";
import { useOrdersStore } from "@/stores/data/orders.js";

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref(null);
  const inLogin = ref(false);
  const inInscription = ref(false);

  const router = useRouter();
  const route = useRoute();

  async function loginWithFirebase(email, password) {
    try {
      inLogin.value = true;

      const response = await signInWithEmailAndPassword(auth, email, password);
      const { user } = response;
      const userData = await getCurrentUserBdd(user.uid);
      setCurrentUser(userData);
      createToast(toastType.success, "Connexion réussie", "Vous êtes connecté");
      inLogin.value = false;
    } catch (e) {
      const errorToast = {
        title: "Erreur de connexion",
        message: e,
      };
      createToast(toastType.error, errorToast.title, errorToast.message);
      console.error(e);
      inLogin.value = false;
    }
  }

  function setCurrentUser(userValue) {
    currentUser.value = userValue;
  }

  async function getCurrentUserBdd(userId) {
    const userRef = refDb(database, `Users/${userId}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();

    if (!userData) {
      throw new Error("Utilisateur inexistant dans la bdd");
    }

    return userData;
  }

  function initUSer() {
    auth.onAuthStateChanged(async (user) => {
      if (inLogin.value || inInscription.value) return;
      if (!user) return;
      try {
        const { uid } = user;
        const userData = await getCurrentUserBdd(uid);
        setCurrentUser(userData);
        createToast(toastType.success, "Connexion réussi", "Vous êtes connecté");
      } catch (e) {
        createToast(toastType.error, "Erreur de connexion", e);
      }
    });
  }

  async function logout() {
    try {
      await signOut(auth);
      currentUser.value = false;
      router.push("/");
      createToast(toastType.success, "Déconnexion réussi", "Vous êtes déconnecté");
    } catch (e) {
      console.error(e);
    }
  }

  async function signup(user = { email: null, password: null, name: null }) {
    try {
      inInscription.value = true;
      // CREATE USER IN DB
      const newUser = await createUser(user);
      setCurrentUser(newUser);
      createToast(toastType.success, "Compte créé avec succès");
      inInscription.value = false;
    } catch (e) {
      console.error(e);
      createToast(toastType.error, "Erreur d'inscription", e);
      inInscription.value = false;
    }
  }

  // WATCH NEW USER
  watch(currentUser, (newVal) => {
    if (currentUser.value) {
      loggedRedirection();
      fetchDataForUsers();
    } else {
      resetDataUsers();
    }
  });

  function loggedRedirection() {
    if (currentUser.value.role === authRoles.user) {
      redirectionIfInscriptionOrLoggin("/mes-commandes");
    }
    if (currentUser.value.role === authRoles.admin) {
      redirectionIfInscriptionOrLoggin("/admin");
    }
  }

  function redirectionIfInscriptionOrLoggin(redirectionPath) {
    const pathTest = ["/connexion", "/inscription"];
    if (pathTest.find((path) => path === route.path)) {
      router.push(redirectionPath);
    }
  }

  // FETCH OR CLEAR DATA FOR USER

  const ordersStore = useOrdersStore();

  function fetchDataForUsers() {
    ordersStore.getOrdersCurrentUser();
  }

  function resetDataUsers() {
    //data load order
    ordersStore.resetStore();
  }

  return {
    currentUser,
    logout,
    initUSer,
    loginWithFirebase,
    signup,
    logout,
  };
});
