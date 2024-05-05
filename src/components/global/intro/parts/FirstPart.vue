<script setup>
import { defineEmits, onMounted } from "vue";
import gsap from "gsap";

const emit = defineEmits(["enterClick"]);
let ctx = null;

onMounted(() => {
  ctx = gsap.context(() => {
    introBlockAnimation();
  }, ".first-part-intro");
});

function introBlockAnimation() {
  gsap.from(".txt__first-line-title", {
    y: 100,
    duration: 0.9,
    ease: "power4.inOut",
  });
  gsap.from(".txt__second-line-title", {
    y: 100,
    duration: 0.9,
    delay: 0.1,
    ease: "power4.inOut",
  });

  gsap.to(".btn-enter", {
    opacity: 1,
    delay: 1,
  });

  gsap.to(".welcome__intro", {
    opacity: 1,
    delay: 1,
    ease: "power4.inOut",
  });
}
</script>

<template>
  <div class="first-part-intro">
    <div class="welcome__intro">BIENVENUE</div>
    <div class="title__intro">
      <div class="first-line-title">
        <h1 class="txt__first-line-title">ZONE</h1>
      </div>
      <div class="second-line-title">
        <h1 class="txt__second-line-title">VAMPIRE</h1>
      </div>
    </div>
    <div class="btn-enter btn btn--primary" @click="emit('enterClick')">Entrer</div>
  </div>
</template>

<style lang="scss" scoped>
.welcome__intro {
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: block;
  opacity: 0;
}

.title__intro {
  margin-bottom: 2rem;
}

.first-line-title {
  overflow: hidden;
}

.txt__first-line-title {
  font-size: 5rem;
  margin: auto;
  line-height: 1;
  margin-bottom: 0;
}

.second-line-title {
  font-size: 8rem;
  overflow: hidden;
}

.txt__second-line-title {
  font-size: 5rem;
  margin: auto;
  line-height: 1;
  margin-bottom: 0;
}

.btn {
  width: 100%;
}

.btn-enter {
  opacity: 0;
}
</style>
