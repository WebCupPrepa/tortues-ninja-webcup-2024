<script setup>
import { defineEmits, defineProps, watchEffect, ref } from "vue";
import Spinner from "../../loaders/Spinner.vue";
import { statusUpload } from "@/enums/statusUpload";

const props = defineProps({
  image: Object,
});

const emit = defineEmits(["removeItem"]);

const classState = ref(null);

watchEffect(() => {
  switch (props.image.state) {
    case statusUpload.publish:
      classState.value = "success";
      break;
    case statusUpload.error:
      classState.value = "error";
      break;
    case statusUpload.progress:
      classState.value = "progress";
      break;
    default:
      classState.value = "";
      break;
  }
});
</script>
<template>
  <div class="item-input-image">
    <img class="img-bg" :src="image.url" alt="" />
    <div class="start-item">
      <div class="wrapper-preview-item">
        <img class="preview__item" :src="image.url" alt="" />
      </div>
      <p class="txt__item">{{ image.name }}</p>
    </div>
    <!-- END -->

    <div class="end-item">
      <Transition name="slide-right">
        <div class="state-item" v-if="image.state">
          <i class="txt__state-item">{{ image.state }}</i>
          <div :class="`icon__state-item ${classState}`">
            <Icon
              size="100%"
              name="check"
              directory="bootstrap"
              v-if="image.state === statusUpload.publish"
            />
            <Icon
              size="100%"
              name="x"
              directory="bootstrap"
              v-else-if="image.state === statusUpload.error"
            />
            <Spinner size="1rem" v-else-if="image.state === statusUpload.progress"></Spinner>
          </div>
        </div>
      </Transition>
      <div class="delete-item" @click="emit('removeItem', image)">
        <Icon name="x" size="100%"></Icon>
      </div>
    </div>
    <!-- END -->
  </div>
</template>

<style lang="scss" scoped>
.item-input-image {
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

  &.success {
    color: white;
    background-color: var(--green-500);
  }
  &.error {
    color: white;
    background-color: var(--red-500);
  }
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

.state-item {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.txt__state-item {
  color: var(--text-color-secondary);
}

.icon__state-item {
  @include toggle();
}

.delete-item {
  @include toggle();

  &:hover {
    border-color: var(--text-color);
  }
}
</style>
