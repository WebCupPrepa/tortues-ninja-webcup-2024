<script setup>
import { defineProps } from "vue";
</script>

<template>
  <div class="overlay"></div>
</template>

<style lang="scss" scoped>
.overlay {
  backdrop-filter: blur(3px);
  background-color: var(--surface-overlay);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  @include zIndex("overlay");
}
</style>
