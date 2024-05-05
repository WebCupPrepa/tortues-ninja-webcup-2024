import { doc, setDoc, getDocs, query, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../index.js";
import { createToast } from "@/utils/createToast.js";
import { toastType } from "@/components/global/toast/toastType";

export async function getDocsFirestore(nameCollection, whereCallback) {
  const docs = [];
  const q = query(collection(db, nameCollection), whereCallback);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    docs.push(doc.data());
  });
  return docs;
}

export async function createDocFirestore(collectionName, data) {
  const copyData = { ...data };
  copyData.id = copyData.id || uuidv4();

  try {
    const newDoc = await setDoc(doc(db, collectionName, copyData.id), copyData);
    createToast(
      toastType.success,
      "Document créé",
      `Document : ${copyData.id} de ${collectionName}`
    );
    return copyData;
  } catch (e) {
    console.error(e);
    createToast(toastType.error, "Erreur lors de la création du document");
    return e;
  }
}

export async function updateDocFirestore(collectionName, docId, dataDoc) {
  try {
    const updatedDoc = await updateDoc(doc(db, collectionName, docId), dataDoc);
    createToast(toastType.success, "Document modifié`", `Document : ${docId} de ${collectionName}`);
    return true;
  } catch (e) {
    console.error(e);
    createToast(toastType.error, "Erreur lors de la modification du document");
  }
  return true;
}

export async function deleteDocFirestore(collectionName, docId) {
  try {
    const deletedDoc = await deleteDoc(doc(db, collectionName, docId));
    createToast(toastType.success, "Document supprimé");
    return true;
  } catch (e) {
    createToast(toastType.error, "Erreur lors de la suppression du document");
    console.error(e);
    return false;
  }
}
