import { defineStore } from "pinia";
import { reactive } from "vue";
import { useDocs } from "@/composables/useDocs.js";
import { updateDoc } from "firebase/firestore";
import { useAuthStore } from "@/stores/global/auth.js";
import { where } from "firebase/firestore";

// TEMPLATE STORE POUR UNE COLLECTION

export const useOrdersStore = defineStore("orders", () => {
  const orders = reactive({
    collectionName: "Orders",
    isLoad: false,
    data: [],
  });

  const authStore = useAuthStore();

  const { getDocs, createDoc, deleteDoc, updateDoc } = useDocs(orders.collectionName, orders);

  function getOrdersCurrentUser() {
    const userOrders = getDocs(where("userId", "==", authStore.currentUser.id));
  }

  function resetStore() {
    orders.data = [];
  }

  return {
    orders,
    getDocs,
    createDoc,
    deleteDoc,
    updateDoc,
    getOrdersCurrentUser,
    resetStore,
  };
});
