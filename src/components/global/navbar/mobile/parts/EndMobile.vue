<script setup>
import OptionsNavbar from "@/components/global/navbar/desktop/parts/OptionsNavbar.vue";

import { defineEmits, ref } from "vue";

const emits = defineEmits(["toggleMenu"]);
</script>

<template>
  <div class="end-navbar">
    <OptionsNavbar></OptionsNavbar>
    <div class="toggle-navbar toggle" @click="emits('toggleMenu')">
      <Icon class="icon__toggle-navbar" name="menu" size="100%"></Icon>
    </div>
  </div>
</template>

<style scoped>
.end-navbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.toggle-navbar {
  height: 2.5rem;
}
</style>
