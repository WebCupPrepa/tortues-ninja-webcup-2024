<script setup>
import { defineProps } from "vue";
import { useThemeStore } from "@/stores/global/theme.js";
import { storeToRefs } from "pinia";

const props = defineProps({
  size: {
    type: String,
  },
});

const themeStore = useThemeStore();
const { currentTheme } = storeToRefs(themeStore);
</script>
<template>
  <router-link to="/" class="logo" :style="{ width: size }">
    <img class="img__logo" :src="`/logos/logo-${currentTheme}.webp`" alt="logo" />
  </router-link>
</template>

<style lang="scss" scoped>
.logo {
  display: block;
  transition: var(--transition-duration);

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 100%;
    object-fit: contain;
  }
}
</style>
