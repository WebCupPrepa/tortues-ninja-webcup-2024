import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { uploadImagesStorage } from "@/firebase/services/storage.js";
import { createDocFirestore, getDocsFirestore } from "@/firebase/services/firestore";

export const useMediasStore = defineStore("medias", () => {
  const medias = reactive({
    collectionName: "medias",
    data: [],
    isLoad: false,
  });

  async function createDoc(file) {
    const imageStorage = await uploadImagesStorage({ file });
    if (imageStorage.error) {
      return imageStorage;
    }

    await createDocFirestore(medias.collectionName, imageStorage);
    medias.data.push(imageStorage);

    return imageStorage;
  }

  async function getDocs() {
    const dataEmpty = !medias.data.length;

    if (dataEmpty) {
      const docs = await getDocsFirestore(medias.collectionName);
      docs.forEach((doc) => {
        medias.data.push(doc);
      });
      medias.isLoad = true;
    }
  }

  function resetData() {
    medias.data = [];
    medias.isLoad = false;
  }

  return { medias, createDoc, getDocs, resetData };
});
