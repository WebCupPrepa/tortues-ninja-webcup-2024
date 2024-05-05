<script setup>
import StartNavbar from "./parts/StartNavbar.vue";
import MenuNavbar from "./parts/MenuNavbar.vue";
import EndNavbar from "./parts/EndNavbar.vue";
import { useNavigationStore } from "@/stores/global/navigation/navigation";

const navigationStore = useNavigationStore();
</script>

<template>
  <StartNavbar></StartNavbar>
  <MenuNavbar :links="navigationStore.linksGuest"></MenuNavbar>
  <EndNavbar></EndNavbar>
</template>

<style lang="scss"></style>
