import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";
import { useSound } from "@/composables/useSound.js";
import { delay } from "@/utils/delay";
import { useThemeStore } from "./theme";

export const useSoundStore = defineStore("sound", () => {
  const themeStore = useThemeStore();
  const { currentTheme } = storeToRefs(themeStore);

  const soundIsActive = ref(false);
  const soundDark = ref(new Audio("/audio/bg-sound/dark.mp3"));
  const soundLight = ref(new Audio("/audio/bg-sound/light.mp3"));

  const bgSound = computed(() => {
    return currentTheme.value === "light" ? soundLight.value : soundDark.value;
  });

  const inModif = ref(false);

  function toggleSound() {
    soundIsActive.value = !soundIsActive.value;
  }

  function initWatchLightSound() {
    const { configPlayer, startAudio, pauseAudio } = useSound(soundLight, inModif);

    configPlayer(() => {
      soundLight.value.loop = true;
    });

    watch(soundIsActive, (newVal, oldVal) => {
      return soundIsActive.value && currentTheme.value === "light" ? startAudio() : pauseAudio();
    });

    watch(currentTheme, (newVal) => {
      console.log("new val from light" + newVal);
      if (newVal !== "light" && soundIsActive.value) {
        pauseAudio();
      } else if (newVal === "light" && soundIsActive.value) {
        startAudio();
      }
    });
  }

  function initWatchDarkSound() {
    const { configPlayer, pauseAudio, startAudio } = useSound(soundDark, inModif);

    configPlayer(() => {
      soundDark.value.loop = true;
    });

    watch(soundIsActive, (newVal, oldVal) => {
      return soundIsActive.value && currentTheme.value === "dark" ? startAudio() : pauseAudio();
    });

    watch(currentTheme, (newVal) => {
      if (newVal !== "dark" && soundIsActive.value) {
        pauseAudio();
      } else if (newVal === "dark" && soundIsActive.value) {
        startAudio();
      }
    });
  }

  watch(currentTheme, (newVal) => {});

  return { soundIsActive, bgSound, inModif, initWatchDarkSound, initWatchLightSound, toggleSound };
});
