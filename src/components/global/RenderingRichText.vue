<script setup>
import { defineProps } from "vue";

const props = defineProps({
  html: String,
});
</script>

<template>
  <div class="rendering-richtext" v-html="html"></div>
</template>

<style lang="scss" scoped></style>
