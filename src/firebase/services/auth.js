import { getDatabase, ref as dbRef, get, set, push, update, onValue } from "firebase/database";
import { authRoles } from "@/enums/authRoles";
import { database, auth } from "..";
import { createUserWithEmailAndPassword } from "firebase/auth";

// USE AUTH AND REALTIME

// CREATE NEW USER
export async function createUser(user = { email: null, password: null, name: null, role: null }) {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, user.email, user.password);
    const userId = newUser.user.uid;
    const role = user.role || authRoles.user;
    const currentDate = new Date().toISOString().substring(0, 10);

    const userData = {
      email: user.email,
      name: user.name || "",
      role: role,
      creationDate: currentDate,
      id: userId,
    };

    const createUserInDb = async () => {
      console.log("create DB");
      const userRef = dbRef(database, "Users/" + userId);
      await set(userRef, userData);
    };

    await createUserInDb();

    return userData;
  } catch (e) {
    console.error(e);
    const errorMessage = handleErrorRegister(e.code);
    throw new Error(errorMessage);
  }
}

function handleErrorRegister(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Veuillez entrer une adresse e-mail valide.";
    case "auth/weak-password":
      return "Le mot de passe doit contenir au moins 6 caractères.";
    case "auth/email-already-in-use":
      return "L'adresse email est déjà utilisée par un autre compte.";
    default:
      return "Une erreur est survenue. Veuillez réessayer plus tard.";
  }
}
