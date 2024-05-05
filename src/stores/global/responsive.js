import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { breakpoints } from "@/utils/responsive";

export const useResponsiveStore = defineStore("responsive", () => {
  const currentBreakpoint = ref(null);

  function initBreakpoint() {
    checkSizeScreen(window.innerWidth);
  }

  function checkSizeScreen(currentSize) {
    if (currentSize <= breakpoints.mobileSmall.maxWidth) {
      currentBreakpoint.value = breakpoints.mobileSmall.value;
    } else if (currentSize <= breakpoints.mobileLarge.maxWidth) {
      currentBreakpoint.value = breakpoints.mobileLarge.value;
    } else if (currentSize <= breakpoints.tablet.maxWidth) {
      currentBreakpoint.value = breakpoints.tablet.value;
    } else {
      currentBreakpoint.value = breakpoints.desktop.value;
    }
  }

  function handleResize() {
    checkSizeScreen(window.innerWidth);
  }

  function addResizeListenner() {
    window.addEventListener("resize", handleResize);
  }

  function removeResizeListenner() {
    window.removeEventListener("resize", handleResize);
  }

  return { currentBreakpoint, addResizeListenner, removeResizeListenner, initBreakpoint };
});
