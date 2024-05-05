<script setup>
import { useThemeStore } from "@/stores/global/theme.js";
import { computed } from "vue";
import Spinner from "../loaders/Spinner.vue";

const themeStore = useThemeStore();

const disableClass = computed(() => {
  return themeStore.isAnimating ? "disable" : "";
});
</script>
<template>
  <div :class="`switch-theme toggle ${disableClass}`" @click="themeStore.changeTheme">
    <Icon
      class="icon__switch-theme"
      id="light"
      name="sun"
      size="100%"
      v-if="themeStore.currentTheme === 'light'"
    />
    <!-- DARK ICON -->
    <Icon
      class="icon__switch-theme"
      id="dark"
      name="sun-moon"
      size="100%"
      v-else-if="themeStore.currentTheme == 'dark'"
    />
    <!-- </Transition> -->
  </div>
</template>

<style lang="scss">
.switch-theme {
  &.disable {
    pointer-events: none;
  }
}
</style>
