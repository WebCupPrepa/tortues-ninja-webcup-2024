<script setup>
import { computed, defineProps } from "vue";
import Link from "@/components/global/navigation/Link.vue";
import { linkTypes } from "@/components/global/navigation/linkTypes";

const props = defineProps({
  image: Object,
});

const otherKeysArray = computed(() => getOtherKeysArray(props.image));

function getOtherKeysArray(image) {
  const copyImage = { ...props.image };
  delete copyImage.name;
  delete copyImage.url;
  return Object.keys(copyImage);
}

const extensionImage = computed(() => {
  const regex = /\.(png|jpe?g|svg)$/i;
  const match = props.image.name.match(regex);
  const extension = match ? match[1] : "";
  return extension;
});

const classObjectFitImage = computed(() => {
  const containExtension = extensionImage.value === "png" || extensionImage.value === "svg";
  return containExtension ? "contain" : "cover";
});
</script>
<template>
  <div class="card-media">
    <div class="preview-card-media">
      <img :class="`img__preview-card-media ${classObjectFitImage}`" :src="image.url" alt="" />
    </div>
    <div class="content-card-media">
      <Link
        class="name__card-media"
        :url="image.url"
        :text="image.name"
        :type="linkTypes.external"
      />
      <div class="meta-card-media">
        <div class="item__meta-card-media" v-for="key of otherKeysArray">
          <span class="key">{{ key }}: </span>
          <span class="value"> {{ image[key] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-media {
  padding: 1rem;
  border: solid 1px var(--surface-border);
  background-color: var(--surface-card);
  border-radius: var(--border-radius);
}
.preview-card-media {
  height: 200px;
  border-radius: var(--border-radius-secondary);
  overflow: hidden;
  margin-bottom: 1rem;
}

.name__card-media {
  margin-bottom: 1rem;
}

.img__preview-card-media {
  height: 100%;

  &.contain {
    object-fit: contain;
  }

  &.cover {
    object-fit: cover;
  }
}

.item__meta-card-media {
  margin-bottom: 0.5rem;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}
</style>
