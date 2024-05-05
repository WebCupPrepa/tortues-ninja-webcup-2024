<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import ContentDesktop from "./desktop/ContentDesktop.vue";
import ContentMobile from "./mobile/ContentMobile.vue";
import { breakpoints } from "@/utils/responsive.js";
import { useResponsiveStore } from "@/stores/global/responsive.js";
import { gsap } from "gsap";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

const route = useRoute();
const navbar = ref(null);

watch(route, () => {
  console.log("watch");
  setTransparentIfHome();
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  setTransparentIfHome();
});

function setTransparentIfHome() {
  if (route.path === "/") {
    gsap.set(navbar.value, { background: "transparent" });
  } else {
    gsap.set(navbar.value, { clearProps: "all" });
  }
}

// Scroll navbar show/hide
function handleScroll() {
  const breakpointScroll = 50;
  const currentScroll = window.scrollY;
  const scrollBreakpoint = currentScroll > breakpointScroll;

  if (scrollBreakpoint) {
    navbarEnterAnimation();
  }
}

function navbarEnterAnimation() {
  gsap.to(navbar.value, {
    width: "92%",
    duration: 0.5,
    top: "1rem",
    borderRadius: "var(--border-radius)",
    background: "var(--surface-a)",
  });
}

// RESPONSIVE

const responsiveStore = useResponsiveStore();
</script>

<template>
  <div class="navbar" ref="navbar">
    <div class="page-padding">
      <div class="container">
        <div class="navbar-component">
          <ContentDesktop v-if="responsiveStore.currentBreakpoint === breakpoints.desktop.value" />
          <ContentMobile v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.navbar {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid var(--surface-border);
  height: $navbar-height;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: transparent;
  @include zIndex("navbar");

  @include tablet {
    height: $navbar-height-mobile;
  }
}

[data-theme="dark"] {
  background-color: var(--surface-ground);
}

.navbar-component {
  display: flex;
  gap: 2rem;
}
</style>
@/stores/global/responsive.js
