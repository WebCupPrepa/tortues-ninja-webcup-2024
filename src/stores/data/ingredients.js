import { defineStore } from "pinia";
import { reactive, watchEffect, computed } from "vue";
import { useDocs } from "@/composables/useDocs.js";
import { updateDoc } from "firebase/firestore";
import { useAuthStore } from "@/stores/global/auth.js";
import { where } from "firebase/firestore";
import { useThemeStore } from "@/stores/global/theme.js";

// TEMPLATE STORE POUR UNE COLLECTION

export const useIngredientsStore = defineStore("ingredients", () => {
  const ingredients = reactive({
    collectionName: "Ingredients",
    isLoad: false,
    data: [],
  });

  const authStore = useAuthStore();
  const themeStore = useThemeStore();

  const ingredientsFilter = computed(() => {
    if (themeStore.currentTheme === "dark" && ingredients.isLoad) {
      const withVampire = ingredients.data.filter((ingredient) => ingredient.isVampire == "true");
      return withVampire;
    } else {
      const withoutVampire = ingredients.data.filter(
        (ingredient) => ingredient.isVampire != "true"
      );
      return withoutVampire;
    }
  });

  const { getDocs, createDoc, deleteDoc, updateDoc } = useDocs(
    ingredients.collectionName,
    ingredients
  );

  return {
    ingredients,
    ingredientsFilter,
    getDocs,
    createDoc,
    deleteDoc,
    updateDoc,
  };
});
