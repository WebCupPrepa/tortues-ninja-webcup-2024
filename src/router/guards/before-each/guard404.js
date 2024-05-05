import { toastType } from "@/components/global/toast/toastType";
import { createToast } from "@/utils/createToast";

export function guard404(to, from, next) {
  if (!to.matched.length) {
    createToast(toastType.error, "Erreur 404", "La page demandée n'existe pas.");
    next(from.path);
  } else {
    next();
  }
}
