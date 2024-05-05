import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export const useThemeStore = defineStore("theme", () => {
  const currentTheme = ref(localStorage.getItem("theme") || "light");
  const app = ref(null);
  const theme = ref(null);
  const isAnimating = ref(false);
  const router = useRouter();
  const isAuthFromVampire = ref(localStorage.getItem("isVampire") || "");

  function initTheme() {
    app.value = document.querySelector("body");
    theme.value = app.value.getAttribute("data-theme");

    if (!theme.value) {
      app.value.setAttribute("data-theme", currentTheme.value);
    }
  }

  function loadIntro() {
    if (currentTheme.value === "light") {
      router.push("/bienvenue");
    }
  }

  function initAuthFromVampire() {
    isAuthFromVampire.value = true;
    localStorage.setItem("isVampire", isAuthFromVampire.value);

    if (currentTheme.value === "light") {
      changeTheme();
    }
  }

  function changeTheme() {
    if (isAnimating.value) {
      return;
    }

    if (!isAuthFromVampire.value) {
      console.log(isAuthFromVampire.value);
      loadIntro();
      return;
    }

    isAnimating.value = true;

    if (currentTheme.value === "light") {
      currentTheme.value = "dark";
    } else {
      currentTheme.value = "light";
    }

    app.value.setAttribute("data-theme", currentTheme.value);
    localStorage.setItem("theme", currentTheme.value);
    isAnimating.value = false;
  }

  function toggleTheme() {
    currentTheme.value = currentTheme.value === "light" ? "dark" : "light";

    app.value.setAttribute("data-theme", currentTheme.value);
    localStorage.setItem("theme", currentTheme.value);
  }

  return { currentTheme, isAnimating, changeTheme, initTheme, initAuthFromVampire, toggleTheme };
});
