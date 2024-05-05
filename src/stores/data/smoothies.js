import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useDocs } from "@/composables/useDocs.js";
import { updateDoc } from "firebase/firestore";
import { useThemeStore } from "@/stores/global/theme.js";
import { useAuthStore } from "@/stores/global/auth.js";

// TEMPLATE STORE POUR UNE COLLECTION

export const useSmoothiesStore = defineStore("smoothies", () => {
  const smoothies = reactive({
    collectionName: "Smoothies",
    isLoad: false,
    data: [],
  });

  const authStore = useAuthStore();
  const themeStore = useThemeStore();

  const smoothiesFilter = computed(() => {
    console.log("smoothies");
    if (themeStore.currentTheme === "dark" && smoothies.isLoad) {
      console.log();
      const withVampire = smoothies.data.filter((smoothie) => smoothie.isVampire == "true");
      return withVampire;
    } else {
      const withoutVampire = smoothies.data.filter((smoothie) => smoothie.isVampire != "true");
      return withoutVampire;
    }
  });

  const { getDocs, createDoc, deleteDoc, updateDoc } = useDocs(smoothies.collectionName, smoothies);

  return {
    smoothies,
    smoothiesFilter,
    getDocs,
    createDoc,
    deleteDoc,
    updateDoc,
  };
});
