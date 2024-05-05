<script setup>
import { onMounted } from "vue";
import { delay } from "@/utils/delay";
import { gsap } from "gsap";

const images = [
  "intro/1.intro.webp",
  "intro/2.intro.webp",
  "/intro/3.intro.webp",
  "intro/4.intro.webp",
  "intro/5.intro.webp",
].reverse();

onMounted(() => {
  const itemsDom = Array.from(document.querySelectorAll(".bg-images-intro .item")).reverse();

  const tl = gsap.timeline({ repeat: -1 });

  for (let i = 0; i < itemsDom.length; i++) {
    const item = itemsDom[i];

    tl.to(item, {
      opacity: 0,
      duration: 2,
      delay: 5,
      zIndex: 1,
    });
  }
});
</script>
<template>
  <div class="bg-images-intro">
    <div class="item" v-for="image of images">
      <img class="img__item" :src="image" />
    </div>
    <div class="item--static">
      <img class="img__item" :src="images[images.length - 1]" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-images-intro {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.3;

  .item,
  .item--static {
    height: 100%;
    width: 100%;
    object-fit: cover;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .item--static {
    z-index: -1;
  }

  .img__item {
    object-fit: cover;
    height: 100%;
    animation: zoomIn 30s infinite ease-in-out;
  }
}

@keyframes zoomIn {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
