<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import TextReader from "@/components/global/TextReader.vue";
import FirstPart from "@/components/global/intro/parts/FirstPart.vue";
import ThirdPart from "@/components/global/intro/parts/ThirdPart.vue";
import BgImages from "@/components/global/intro/parts/BgImages.vue";
import SoundPlayer from "@/components/global/sound-player/SoundPlayer.vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from "vue-router";
import { useThemeStore } from "@/stores/global/theme";

const router = useRouter();
const part = ref(1);

const theme = useThemeStore();

onMounted(() => {
  theme.toggleTheme();
  addOverflowHidden();
});

onUnmounted(() => {
  removeOverflow();
});

function addOverflowHidden() {
  const body = document.querySelector("body");
  body.classList.add("overflow-hidden");
}

function removeOverflow() {
  const body = document.querySelector("body");
  body.classList.remove("overflow-hidden");
}

onBeforeRouteUpdate((route) => {
  removeOverflow();
  if (theme.currentTheme === "dark" && !theme.initAuthFromVampire) {
    theme.toggleTheme();
  }
});

onBeforeRouteLeave((route) => {
  removeOverflow();
  if (theme.currentTheme === "dark" && !theme.initAuthFromVampire) {
    theme.toggleTheme();
  }
});
</script>

<template>
  <section class="section-intro" data-theme="dark">
    <BgImages></BgImages>
    <SoundPlayer class="sound-player-intro"></SoundPlayer>
    <p class="txt__bottom-intro">Pour une expérience immersive activé l'audio</p>
    <div class="layer-color"></div>
    <div class="page-padding">
      <div class="container container--xs">
        <div class="intro-component">
          <Transition name="opacity" mode="out-in">
            <!-- PARTS -->
            <FirstPart @enterClick="part++" v-if="part === 1" />
            <div class="second-part-intro" v-else-if="part === 2">
              <TextReader @is-finish="part++" />
            </div>
            <ThirdPart v-else-if="part === 3" />
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-intro {
  background-color: rgb(0, 0, 0);
  width: 100vw;
  height: 100svh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
  @include zIndex("max");
}

.sound-player-intro {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  height: 2.5rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
}

.layer-color {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, var(--red-600) 0%, transparent 0%, var(--red-600) 100%);
  opacity: 0.5;
  z-index: -1;
}

.txt__bottom-intro {
  position: absolute;
  bottom: 1rem;
  max-width: 60%;
  text-align: center;
  margin: auto;
  width: 100%;
}

.intro-component {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
