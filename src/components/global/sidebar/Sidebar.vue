<script setup>
import { computed, ref, defineEmits } from "vue";
import { useResponsiveStore } from "@/stores/global/responsive";
import { breakpoints } from "@/utils/responsive";
import { storeToRefs } from "pinia";
import HeaderSidebar from "./parts/HeaderSidebar.vue";
import MenuSidebar from "./parts/MenuSidebar.vue";
import FooterSidebar from "./parts/FooterSidebar.vue";
import SidebarModal from "../sidebar-modal/SidebarModal.vue";
import { onBeforeRouteUpdate } from "vue-router";

const props = defineProps({
  links: Array,
});

// RESPONSIVE
const responsiveStore = useResponsiveStore();
const { currentBreakpoint } = storeToRefs(responsiveStore);

const responsiveActive = computed(() => {
  return currentBreakpoint.value !== breakpoints.desktop.value ? true : false;
});

const showMenu = ref(false);

function handleMenuMobile() {
  showMenu.value = !showMenu.value;
}

// HOVER SIDEBAR EXTEND

const emit = defineEmits(["getExtendClass"]);
const sidebarExtend = ref(false);
const sidebarExtendClass = computed(() => (sidebarExtend.value ? "extend" : ""));

function activeExtendSidebar() {
  if (!sidebarExtend.value && !responsiveActive.value) {
    sidebarExtend.value = !sidebarExtend.value;
    emit("getExtendClass", sidebarExtendClass);
  }
}

function disableExtendSidebar() {
  if (sidebarExtend.value && !responsiveActive.value) {
    sidebarExtend.value = !sidebarExtend.value;
    emit("getExtendClass", sidebarExtendClass);
  }
}

onBeforeRouteUpdate((to) => {
  showMenu.value = false;
});
</script>

<template>
  <div
    :class="`sidebar ${sidebarExtendClass}`"
    @mouseenter="activeExtendSidebar"
    @mouseleave="disableExtendSidebar"
  >
    <div class="container-sidebar w-full h-full">
      <HeaderSidebar
        :extend-class="sidebarExtendClass"
        :responsiveActive="responsiveActive"
        @toggleResponsive="handleMenuMobile"
      />
      <div class="main-sidebar" v-if="!responsiveActive">
        <MenuSidebar
          :links="links"
          :extend-class="sidebarExtendClass"
          @clickLink="disableExtendSidebar"
        />

        <FooterSidebar :extend-class="sidebarExtendClass">
          <slot name="footer"></slot>
        </FooterSidebar>
      </div>
    </div>
  </div>
  <!-- MOBILE MENU -->
  <SidebarModal v-model="showMenu" v-if="responsiveActive">
    <template #menu>
      <MenuSidebar :links="links" :extend-class="sidebarExtendClass" />
    </template>
    <template #footer>
      <FooterSidebar :extend-class="sidebarExtendClass">
        <slot name="footer"></slot>
      </FooterSidebar>
    </template>
  </SidebarModal>
</template>

<style lang="scss">
$height-sidebar: 100px;
$background-color: var(--surface-card);
$border-color: var(--surface-border);

.sidebar {
  height: 100%;
  position: fixed;
  top: 0;
  background-color: $background-color;
  border-right: solid 1px var(--surface-border);
  transition: 0.3s ease-in;
  width: $sidebar-width;
  @include zIndex("navbar");

  &.extend {
    width: $sidebar-width-extend;
  }

  p,
  span {
    color: var(--text-color);
  }
}

.padding-sidebar {
  padding: 1rem;
  height: 100%;
}

.container-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

// MAIN

.main-sidebar {
  background-color: $background-color;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* RESPONSIVE */

@include tablet {
  .sidebar {
    width: 100%;
    height: $navbar-height-mobile;
  }

  .header-sidebar {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
@/stores/global/navigation/navigation@/stores/global/navigation/typesNavLinks.js
