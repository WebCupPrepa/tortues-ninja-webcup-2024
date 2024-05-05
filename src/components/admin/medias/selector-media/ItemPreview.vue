<script setup>
import { defineEmits, defineProps, watchEffect, ref } from "vue";
import Link from "@/components/global/navigation/Link.vue";

const props = defineProps({
  image: Object,
});

const emit = defineEmits(["removeItem"]);
</script>
<template>
  <div class="item-preview">
    <img class="img-bg" :src="image.url" alt="" />
    <div class="start-item">
      <div class="wrapper-preview-item">
        <img class="preview__item" :src="image.url" alt="" />
      </div>
      <Link :text="image.name" :external="true" :url="image.url" class="txt__item"></Link>
    </div>
    <!-- END -->
    <div class="end-item">
      <div class="delete-item" @click="emit('removeItem', image)">
        <Icon name="x" size="100%"></Icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-preview {
  width: 100%;
  position: relative;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background-color: var(--surface-card);
  box-shadow: 0px 10px 15px -8px rgba(0, 0, 0, 0.1);
}

.img-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  z-index: 0;
  opacity: 0.1;
  filter: blur(3px);
}

.txt__item {
  color: var(--text-color);
  font-size: 0.9rem;
}

@mixin toggle() {
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  border-radius: 100%;
  background-color: var(--surface-a);
  border: solid 1px var(--surface-border);
  padding: 0.3rem;
  color: var(--text-color);
  cursor: pointer;
  border: solid 1px white;
  transition: var(--transition-duration);
}

.start-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.wrapper-preview-item {
  height: 50px;
  border-radius: var(--border-radius-secondary);
  overflow: hidden;

  img {
    object-fit: contain;
    height: 100%;
  }
}

.end-item {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.delete-item {
  @include toggle();

  &:hover {
    border-color: var(--text-color);
  }
}
</style>
