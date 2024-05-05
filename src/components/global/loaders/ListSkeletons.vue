<script setup>
import { defineProps } from "vue";
import Skeleton from "@/components/global/loaders/Skeleton.vue";

// USE COMPONENT INSIDE LAYOUT

const props = defineProps({
  classItem: String,
  nbLoop: {
    type: Number,
    default: 6,
  },
});
</script>

<template>
  <Skeleton v-for="i of nbLoop" :class="classItem" :key="i"></Skeleton>
</template>

<style lang="scss" scoped></style>
