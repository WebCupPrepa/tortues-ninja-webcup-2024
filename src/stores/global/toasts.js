import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastsStore = defineStore("toasts", () => {
  const toasts = ref([]);

  function deleteToast(toastId) {
    const indexToast = toasts.value.findIndex((toast) => toast.id === toastId);
    toasts.value.splice(indexToast, 1);
  }

  return { toasts, deleteToast };
});
