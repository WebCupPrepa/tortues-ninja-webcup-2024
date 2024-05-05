import { useRouter } from "vue-router";

export function guardIntro(to, from, next) {
  const introFinish = localStorage.getItem("introFinish");

  if (to.path !== "/bienvenue" && !introFinish) {
    next("/bienvenue");
  } else {
    next();
  }
}
