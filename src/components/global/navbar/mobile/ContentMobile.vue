<script setup>
import StartNavbar from "../desktop/parts/StartNavbar.vue";
import EndMobile from "./parts/EndMobile.vue";
import MenuMobile from "./parts/MenuMobile.vue";
import { computed, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { delay } from "@/utils/delay";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

const showMenu = ref(false);
const isAnimating = ref(false);

function toggleMenu() {
  if (isAnimating.value) {
    return;
  }

  const toggleChoice = showMenu.value ? closeMenu : openMenu;
  toggleChoice();
}

const menuMobile = ref(null);
const body = ref(null);

const overflowHiddenClass = "overflow-hidden";
const timeAnimation = {
  s: 0.7,
};
timeAnimation.ms = timeAnimation.s * 1000;

async function openMenu() {
  showMenu.value = true;
  await animationEnterMenu();
}

async function closeMenu() {
  showMenu.value = false;
  await animationOutMenu();
}

async function animationEnterMenu() {
  isAnimating.value = true;
  body.value.classList.add(overflowHiddenClass);
  menuMobile.value.dom.style.display = "";
  await delay(1);
  menuMobile.value.dom.style.height = "";
  isAnimating.value = false;
}

async function animationOutMenu() {
  isAnimating.value = true;

  body.value.classList.remove(overflowHiddenClass);
  menuMobile.value.dom.style.height = "0";
  await delay(timeAnimation.ms + 1);
  menuMobile.value.dom.style.display = "none";

  isAnimating.value = false;
}

function initializeMenuStyle() {
  menuMobile.value.dom.style.display = "none";
  menuMobile.value.dom.style.height = "0";
  menuMobile.value.dom.style.transition = `height ${timeAnimation.s}s ease`;
}
onMounted(() => {
  initializeMenuStyle();
  body.value = document.querySelector("body");
});

onBeforeRouteUpdate(async (to, from) => {
  if (showMenu.value) await closeMenu();
});
</script>

<template>
  <div class="content-mobile">
    <StartNavbar></StartNavbar>
    <EndMobile @toggleMenu="toggleMenu"></EndMobile>
    <MenuMobile ref="menuMobile"></MenuMobile>
  </div>
</template>

<style lang="scss" scoped>
.content-mobile {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
