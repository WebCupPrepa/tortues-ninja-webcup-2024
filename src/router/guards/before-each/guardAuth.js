import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/global/auth";
import { createToast } from "@/utils/createToast.js";
import { toastType } from "@/components/global/toast/toastType.js";
import { auth } from "@/firebase";
import { authRoles } from "@/enums/authRoles";

export function guardAuth(to, from, next) {
  const router = useRouter();
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.currentUser) {
    router.push("/connexion");
    createToast(
      toastType.info,
      "Authentification requise",
      "Merci de vous identifier pour accéder à cette page"
    );
  } else if (to.meta.requiresAuth && authStore.currentUser) {
    adminCheck();
  }

  function adminCheck() {
    if (to.meta.role === authRoles.admin && authStore.currentUser.role !== authRoles.admin) {
      router.push(from.path ? from.path : "/");
      createToast(
        toastType.error,
        "Accès admin uniquement",
        "Un compte admin est nécessaire afin d'accéder à cette page"
      );
    }
  }

  next();
}
