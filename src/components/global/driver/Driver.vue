<script setup>
import { onMounted, onUnmounted, watch, ref, computed } from "vue";
import ReplayDriver from "./ReplayDriver.vue";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { driverBtnType } from "./driverBtnType.js";

const props = defineProps({
  steps: Array,
  name: String,
});

/* code for display driver or not*/
const { steps, name } = props;
const driverName = name;

const driverHasAuthz = ref(checkDriverAuthz(driverName));

function checkDriverAuthz(driverName) {
  return localStorage.getItem(driverName) == "false" ? false : true;
}

// INITIALISÉ DRIVER

const driverObj = driver({
  steps: steps,
  nextBtnText: driverBtnType.next,
  prevBtnText: driverBtnType.prev,
  doneBtnText: driverBtnType.done,
  showProgress: true,
  onCloseClick: desactiveDriver,
  onNextClick: nextDriver,
});

// NEXT slide

function nextDriver(el, step) {
  const isLastPopover = step.popover.nextBtnText === driverBtnType.done ? true : false;
  if (isLastPopover) desactiveDriver();

  driverObj.moveNext();
}

// FONCTION active DRIVER

function activeDriver(driverObj) {
  driverHasAuthz.value = true;
  localStorage.setItem(driverName, true);
  driverObj.drive();
}

function desactiveDriver() {
  driverObj.destroy();

  // stocker la valeur dans localstorage
  localStorage.setItem(driverName, false);
  driverHasAuthz.value = false;
}

onMounted(() => {
  // si driver autorisé
  if (driverHasAuthz.value) {
    activeDriver(driverObj);
  }
});

onUnmounted(() => {
  driverObj.destroy(); // Détruire le tour
});
</script>

<template>
  <div class="driver-js"></div>
  <ReplayDriver @click="activeDriver(driverObj)"></ReplayDriver>
</template>

<style lang="scss">
/* DRIVER */
/* POPUP */
.driver-popover {
  background-color: var(--surface-ground);
  color: var(--text-color);
}

/* arrow popup */

.driver-popover .driver-popover-arrow-side-left.driver-popover-arrow {
  background-color: transparent;
}

.driver-popover .driver-popover-arrow-side-right.driver-popover-arrow {
  background-color: var(--primary-color);
}

.driver-popover .driver-popover-arrow-side-top.driver-popover-arrow {
  background-color: var(--primary-color);
}

.driver-popover .driver-popover-arrow-side-bottom.driver-popover-arrow {
  background-color: var(--primary-color);
}

/* CONTENT POPUP*/

.driver-popover .driver-popover-title {
  font-size: 20px;
  font-family: var(--primary-font) !important;
}

.driver-popover .driver-popover-description {
  font-size: 16px;
  color: var(--text-color-secondary);
  font-family: var(--secondary-font) !important;
}

/* BTN POPUP */

.driver-popover button {
  flex: 1;
  text-align: center;
  background-color: var(--primary-color);
  border: none !important;
  color: var(--primary-color-text);
  text-shadow: none;
  font-size: 14px;
  padding: 7px 8px;
  border-radius: 6px;
}

// .driver-popover button:hover {
//   background-color: var(--primary-600);
// }

.driver-popover .driver-popover-navigation-btns {
  justify-content: space-between;
  gap: 3px;
}

/* CLOSE ICON */
.driver-popover .driver-popover-close-btn {
  padding: 0;
  top: -0.5rem;
  right: -0.5rem;
  transition: 0.2s;
  color: var(--secondary-color-text);
  background-color: var(--secondary-color);
}

.driver-popover .driver-popover-close-btn:hover {
  color: grey;
}

/* footer wrapper */
.driver-popover .driver-popover-footer {
  gap: 1rem;
}

/* text progress state*/
.driver-popover .driver-popover-progress-text {
  color: var(--text-color-secondary);
}

.driver-popover-next-btn {
  &:hover {
    background-color: var(--primary-color) !important;
  }
}

/* BTN PREV */
.driver-popover-prev-btn {
  background-color: var(--secondary-color) !important;
  color: var(--secondary-color-text) !important;

  &.driver-popover-btn-disabled {
    opacity: 0.5;
    display: none !important;
  }
}

// OVERLAY
.driver-overlay {
  path {
    fill: var(--surface-overlay) !important;
  }
}
.driver-popover-arrow .driver-popover-arrow-side-bottom .driver-popover-arrow-align-start {
  display: none;
}
</style>
