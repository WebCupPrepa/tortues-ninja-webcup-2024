import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useDocs } from "@/composables/useDocs.js";
import { updateDoc } from "firebase/firestore";
import { useAuthStore } from "@/stores/global/auth.js";
import { where } from "firebase/firestore";
import { useThemeStore } from "@/stores/global/theme.js";

// TEMPLATE STORE POUR UNE COLLECTION

export const useToppingsStore = defineStore("toppings", () => {
  const toppings = reactive({
    collectionName: "Toppings",
    isLoad: false,
    data: [],
  });

  const authStore = useAuthStore();
  const themeStore = useThemeStore();

  const toppingsFilter = computed(() => {
    if (themeStore.currentTheme === "dark" && toppings.isLoad) {
      const withVampire = toppings.data.filter((topping) => topping.isVampire == "true");
      return withVampire;
    } else {
      const withoutVampire = toppings.data.filter((topping) => topping.isVampire != "true");
      return withoutVampire;
    }
  });

  const { getDocs, createDoc, deleteDoc, updateDoc } = useDocs(toppings.collectionName, toppings);

  return {
    toppings,
    toppingsFilter,
    getDocs,
    createDoc,
    deleteDoc,
    updateDoc,
  };
});
