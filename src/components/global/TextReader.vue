<script setup>
import { delay } from "@/utils/delay";
import { onMounted, ref, watch, defineEmits } from "vue";
import { useSound } from "@/composables/useSound.js";

const text = ref(
  `Depuis des temps immémoriaux, les vampires ont fasciné et effrayé l'humanité. Ces créatures immortelles, se nourrissant de sang pour survivre, demeurent enveloppées de mystère et de secrets. Aujourd'hui, alors que le monde moderne évolue rapidement, les vampires restent dans l'ombre, témoins silencieux de notre existence. Bienvenue dans notre domaine secret, où les smoothies vampiriques vous attendent pour une expérience gustative aussi mystérieuse que délicieuse. Plongez dans les ténèbres et laissez-vous séduire par le frisson de la nuit éternelle.`
);
text.value = text.value.split("");

const emit = defineEmits(["isFinish"]);

const next = ref(false);
const player = ref(new Audio("/audio/intro.mp3"));
const inModif = ref(false);
const { configPlayer, startAudio, stopAudio, watchAudio } = useSound(player, inModif, {
  maxVolume: 0.5,
});

watchAudio();

onMounted(async () => {
  configPlayer(() => (player.value.playbackRate = 1.2));
  startAudio();
  await startReaderTextAnimation();
  emit("isFinish");
});

async function startReaderTextAnimation() {
  const letters = document.querySelectorAll(".txt-reader .letter");
  for (let letter of letters) {
    if (next.value) return stopReader();
    await delay(70);
    letter.style.opacity = 1;
  }
}

function stopReader() {
  stopAudio();
  emit("isFinish");
}
</script>

<template>
  <div class="txt-reader">
    <p class="txt">
      <span class="letter" v-for="letter of text">{{ letter }}</span>
    </p>
    <div class="wrapper-btn">
      <div class="btn-next" @click="next = true">Passer</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.txt {
  margin-bottom: 1rem;
}

.letter {
  transition: 0.3s ease;
  opacity: 0.4;
}

.wrapper-btn {
  display: flex;
  justify-content: flex-end;
}

.btn-next {
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.15);
  border: solid 1px var(--surface-border);
  cursor: pointer;
}
</style>
