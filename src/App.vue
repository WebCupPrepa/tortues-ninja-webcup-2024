<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useResponsiveStore } from "@/stores/global/responsive.js";
import ShowToast from "./components/global/toast/ShowToast.vue";
import { useAuthStore } from "@/stores/global/auth";
import PageTransition from "@/components/global/page-transition/PageTransition.vue";
import { useThemeStore } from "./stores/global/theme";
import { useSoundStore } from "@/stores/global/sound";
import { animationEnterTransition } from "@/components/global/page-transition/pageTransition.js";
import { useSmoothiesStore } from "@/stores/data/smoothies";
import { useIngredientsStore } from "@/stores/data/ingredients";
import { useToppingsStore } from "./stores/data/toppings";

const route = useRoute();
const themeStore = useThemeStore();
const responsiveStore = useResponsiveStore();
const soundStore = useSoundStore();
const authStore = useAuthStore();

// DATA store
const smoothiesStore = useSmoothiesStore();
const ingredientsStore = useIngredientsStore();
const toppingsStore = useToppingsStore();

onMounted(() => {
  responsiveStore.initBreakpoint();
  responsiveStore.addResizeListenner();
  authStore.initUSer();
  themeStore.initTheme();
  soundStore.initWatchLightSound();
  soundStore.initWatchDarkSound();

  // Fecth DATA
  smoothiesStore.getDocs();
  ingredientsStore.getDocs();
  toppingsStore.getDocs();
});
onUnmounted(() => {
  responsiveStore.removeResizeListenner();
});

const firstNavigation = ref(true);
async function enterTransition() {
  if (firstNavigation.value) {
    firstNavigation.value = false;
    return;
  }

  animationEnterTransition();
}
</script>
<template>
  <ShowToast></ShowToast>
  <PageTransition></PageTransition>
  <router-view v-slot="{ Component }">
    <transition name="opacity-app" @enter="enterTransition">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<style lang="scss">
.opacity-app-enter-from,
.opacity-app-leave-to {
  opacity: 0;
}

.opacity-app-enter-active,
.opacity-app.leave-active {
  transition: 1s ease-in-out;
}
</style>
./stores/data/toppings
