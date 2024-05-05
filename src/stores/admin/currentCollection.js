import { defineStore } from "pinia";
import {
  createDocFirestore,
  getDocsFirestore,
  updateDocFirestore,
  deleteDocFirestore,
} from "@/firebase/services/firestore";
import { reactive, ref } from "vue";

export const useCurrentCollectionStore = defineStore("currentCollection", () => {
  const currentCollection = reactive({
    collectionName: "",
    collectionDesc: "",
    data: [],
  });

  // METHODS
  async function createDoc(data) {
    try {
      const docCreated = await createDocFirestore(currentCollection.collectionName, data);
      currentCollection.data.push(docCreated);
    } catch (e) {
      console.error(e);
    }
  }

  async function getDocs() {
    const docs = await getDocsFirestore(currentCollection.collectionName);
    docs.forEach((doc) => {
      currentCollection.data.push(doc);
    });
  }

  function setCollectionName(collectionName) {
    currentCollection.collectionName = collectionName;
  }

  function resetData() {
    while (currentCollection.data.length > 0) {
      currentCollection.data.pop();
    }
  }

  async function updateDoc(collectionName, docId, data) {
    const docUpdated = await updateDocFirestore(collectionName, docId, data);
    const docIndex = currentCollection.data.findIndex((doc) => doc.id === docId);
    currentCollection.data[docIndex] = { ...currentCollection.data[docIndex], ...data };
  }

  async function deleteDoc(collectionName, docId) {
    const docDeleted = await deleteDocFirestore(collectionName, docId);
    const docIndexInCurrent = currentCollection.data.findIndex((doc) => doc.id === docId);
    currentCollection.data.splice(docIndexInCurrent, 1);
  }

  return {
    currentCollection,
    createDoc,
    getDocs,
    setCollectionName,
    resetData,
    updateDoc,
    deleteDoc,
  };
});
