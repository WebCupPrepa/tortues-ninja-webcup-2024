<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="wrapper-btn">
    <button class="btn btn--primary" @click="router.push('/smoothies')">Voir les smoothies</button>
    <button class="btn btn--secondary" @click="router.push('/smoothie-perso')">
      Créer un smoothie
    </button>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-btn {
  display: flex;
  gap: 1rem;
}
</style>
