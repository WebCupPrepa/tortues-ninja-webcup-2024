import { defineStore } from "pinia";
import {
  createDocFirestore,
  getDocsFirestore,
  updateDocFirestore,
} from "@/firebase/services/firestore";
import { reactive, ref } from "vue";
import { createToast } from "@/utils/createToast";
import { toastType } from "@/components/global/toast/toastType";

export const useCollectionsStore = defineStore("collections", () => {
  // DATA
  const collections = reactive({
    collectionName: "collections",
    data: [],
    isLoad: false,
  });

  // METHODS
  async function createDoc(data) {
    const checkIfCollectionExist = () => {
      const checkerName = collections.data.some(
        (docCollection) => docCollection.name === data.name
      );
      if (checkerName) {
        createToast(
          toastType.error,
          "Collection déjà existante",
          "Le nom de la collection doit être unique"
        );
        return true;
      } else {
        return false;
      }
    };

    const collectionExist = checkIfCollectionExist();
    if (collectionExist) return;

    await createDocFirestore(collections.collectionName, data);
    collections.data.push(data);
  }

  async function getDocs() {
    const dataEmpty = !collections.data.length;
    if (dataEmpty) {
      const docs = await getDocsFirestore(collections.collectionName);
      docs.forEach((doc) => {
        collections.data.push(doc);
      });
      collections.isLoad = true;
    }
  }

  async function updateDoc(collectionName, docId, data) {
    await updateDocFirestore(collectionName, docId, data);
    console.log("finis");
  }
  function resetData() {
    collections.data = [];
    collections.isLoad = false;
  }

  return { collections, updateDoc, getDocs, createDoc, resetData };
});
