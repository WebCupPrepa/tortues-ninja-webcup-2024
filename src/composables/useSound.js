import { reactive, ref, watch } from "vue";
import { delay } from "@/utils/delay.js";
import { useSoundStore } from "@/stores/global/sound";
import { storeToRefs } from "pinia";

export function useSound(player, inModif, options = { maxVolume: 0.3 }) {
  const soundStore = useSoundStore();
  const { soundIsActive } = storeToRefs(soundStore);

  let maxVolumeAudio = options.maxVolume;

  function configPlayer(customConfig) {
    player.value.volume = 0;
    if (customConfig) customConfig();
  }

  //   FADE EFFECT

  async function fadeInAudio() {
    if (!soundIsActive.value && inModif.value) return;
    inModif.value = true;
    player.value.play();
    while (player.value.volume < maxVolumeAudio) {
      await delay(100);
      player.value.volume = Math.round((player.value.volume + 0.1) * 10) / 10;
    }
    inModif.value = false;
  }

  async function fadeOutAudio() {
    if (inModif.value) return;
    inModif.value = true;

    while (player.value.volume > 0) {
      await delay(100);
      player.value.volume = Math.round((player.value.volume - 0.1) * 10) / 10;
    }

    player.value.pause();
    inModif.value = false;
  }

  //   START PAUSE STOP

  function startAudio() {
    if (soundIsActive.value) {
      player.value.volume = maxVolumeAudio;
      player.value.play();
    }
  }

  function pauseAudio() {
    player.value.pause();
  }

  function stopAudio() {
    player.value.pause();
    player.value.currentTime = 0;
  }

  //   WATCH AUDIO
  function watchAudio() {
    watch(soundIsActive, (newVal) => {
      watchStartAudio();
      watchPauseAudio();
    });
  }

  function watchStartAudio() {
    console.log(player.value.currentTime);
    if (player.value.currentTime > 0 && soundIsActive.value) {
      console.log("test");
      startAudio();
    }
  }

  function watchPauseAudio() {
    if (!soundIsActive.value) {
      pauseAudio();
    }
  }

  return {
    fadeInAudio,
    fadeOutAudio,
    configPlayer,
    startAudio,
    pauseAudio,
    stopAudio,
    watchAudio,
  };
}
