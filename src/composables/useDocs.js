/* COMPOSABLE FOR CRUD IN FIREBASE AND UPDATE STORE DIRECTLY */

import { useCollectionsStore } from "@/stores/admin/collections";
import {
  createDocFirestore,
  deleteDocFirestore,
  getDocsFirestore,
  updateDocFirestore,
} from "@/firebase/services/firestore";

export function useDocs(collectionName, collection) {
  async function createDoc(data) {
    try {
      const docCreated = await createDocFirestore(collectionName, data);
      collection.data.push(docCreated);
      return docCreated;
    } catch (e) {
      console.error(e);
    }
  }

  // where callback is option
  async function getDocs(whereCallback) {
    const dataEmpty = !collection.data.length && !collection.isLoad;
    if (dataEmpty) {
      const docs = await getDocsFirestore(collectionName, whereCallback);
      collection.data = docs;
      collection.isLoad = true;
      return docs;
    }
  }

  async function deleteDoc(docId) {
    const docDeleted = await deleteDocFirestore(collectionName, docId);
    if (docDeleted) {
      const indexDocInsideCollection = collection.data.findIndex((doc) => docId === doc.id);
      collection.data.splice(indexDocInsideCollection, 1);
    }
  }

  async function updateDoc(docId, data) {
    const docUpdated = await updateDocFirestore(collectionName, docId, data);
    if (docUpdated) {
      const indexDocInsideCollection = collection.data.findIndex((doc) => docId === doc.id);
      const lastDocData = collection.data[indexDocInsideCollection];
      collection.data[indexDocInsideCollection] = { ...lastDocData, ...data };
    }
  }

  return { createDoc, getDocs, updateDoc, deleteDoc };
}
