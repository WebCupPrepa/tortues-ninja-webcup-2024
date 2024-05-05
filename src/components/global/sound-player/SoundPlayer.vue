<script setup>
import { useSound } from "@/composables/useSound.js";
import { onMounted, ref } from "vue";
import { useSoundStore } from "@/stores/global/sound";
import { storeToRefs } from "pinia";
import Spinner from "../loaders/Spinner.vue";

const soundStore = useSoundStore();
const { soundIsActive, inModif } = storeToRefs(soundStore);
</script>

<template>
  <div class="sound-player toggle" @click="soundStore.toggleSound" v-if="!inModif">
    <Icon name="volume-1" size="100%" v-if="soundIsActive" />
    <Icon name="volume-x" size="100%" v-if="!soundIsActive" />
  </div>
  <div class="sound-player toggle" v-else>
    <Spinner size="100%" v-if="inModif"></Spinner>
  </div>
</template>

<style lang="scss" scoped></style>
