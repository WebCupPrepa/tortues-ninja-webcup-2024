<script setup>
import { defineProps } from "vue";

const props = defineProps({
  size: String,
  borderSize: String,
});
</script>

<template>
  <div
    class="loader"
    :style="{ width: props.size, height: props.size, borderWidth: props.borderSize }"
  ></div>
</template>

<style>
.loader {
  width: 30px;
  height: 30px;
  border: 3px solid var(--surface-100);
  border-bottom-color: var(--primary-color);
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
