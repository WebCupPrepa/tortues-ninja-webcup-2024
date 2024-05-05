import { v4 as uuidv4 } from "uuid";
import { useToastsStore } from "@/stores/global/toasts";
import { toastType } from "@/components/global/toast/toastType";

export function createToast(typeToast = toastType.info, titleToast, messageToast) {
  const toast = {
    title: titleToast,
    message: messageToast,
    type: typeToast,
    id: uuidv4(),
  };

  const toastsStore = useToastsStore();

  toastsStore.toasts.push(toast);
}
