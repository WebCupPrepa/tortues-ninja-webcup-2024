import { defineStore } from "pinia";
import { reactive } from "vue";
import { createToast } from "@/utils/createToast";
import { toastType } from "@/components/global/toast/toastType";
import { createUser } from "@/firebase/services/auth";
import { database } from "@/firebase";
import { ref, get } from "firebase/database";

export const useUsersStore = defineStore("users", () => {
  const users = reactive({
    collectionName: "users",
    data: [],
    isLoad: false,
  });

  async function addUser(user) {
    try {
      const userCreated = await createUser(user);
      createToast(toastType.success, "Nouvelle utilisateur créé");
      users.data.push(userCreated);
    } catch (e) {
      console.error(e);
      createToast(toastType.error, "Erreur création user", e);
    }
  }

  async function getUsers() {
    const usersRef = ref(database, "/Users");
    try {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        // Vérifier si les données existent
        const usersData = snapshot.val();
        const usersArray = Object.values(usersData);
        usersArray.forEach((user) => {
          users.data.push(user);
        });
        users.isLoad = true;
        return usersData;
      } else {
        console.log("No users found");
        users.isLoad = true;
      }
    } catch (error) {
      console.error("Error getting users:", error); // Gérer les erreurs
    }
  }

  function resetData() {
    users.data = [];
    users.isLoad = false;
  }

  return { users, addUser, getUsers, resetData };
});
