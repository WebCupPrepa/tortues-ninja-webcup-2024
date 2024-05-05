<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  smoothie: Object,
});
</script>

<template>
  <div class="card-smoothie">
    <div class="wrapper-img-card">
      <img :src="smoothie.image[0].url" alt="" />
    </div>
    <div class="content-card">
      <p class="title__card">{{ smoothie.title }}</p>
    </div>
    <div class="footer-card">
      <div class="wrapper-btn-card">
        <slot name="btn"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-smoothie {
  background-color: var(--surface-card);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  position: relative;
}

$height-img: 200px;

.content-card {
  margin-bottom: 1rem;
  margin-top: $height-img;
}

.wrapper-img-card {
  height: $height-img;
  position: absolute;
  top: -3rem;
  left: 0;
  right: 0;
  height: 250px;

  img {
    height: 100%;
    object-fit: contain;
  }
}

.title__card {
  color: var(--text-color);
  font-size: var(--text-lg);
}

.wrapper-btn-card {
  display: flex;
  justify-content: flex-end;
}
</style>
