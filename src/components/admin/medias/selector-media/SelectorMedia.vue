<script setup>
import { ref, defineProps, defineModel, nextTick, computed } from "vue";
import ItemPreview from "./ItemPreview.vue";
import ModalSelector from "./ModalSelector.vue";
import { createToast } from "@/utils/createToast";
import { toastType } from "@/components/global/toast/toastType";
import { watch } from "vue";

const props = defineProps({
  onlySelect: {
    default: false,
    type: Boolean,
  },
  label: String,
});

const maxImages = computed(() => (props.onlySelect ? 1 : Infinity));
const imagesModels = defineModel("images");
imagesModels.value = Array.isArray(imagesModels.value) ? imagesModels.value : [];

const showModal = ref(false);

function getSelectedImages(images) {
  // si objet mettre dans array
  const selectedImages = computed(() => {
    return Array.isArray(images.value) ? images.value : [images.value];
  });

  if (maxImagesReached(selectedImages)) return;

  selectedImages.value.forEach((image) => {
    imagesModels.value.push(image);
  });
}

function maxImagesReached(selectedImages) {
  const isFinish =
    imagesModels.value.length + selectedImages.value.length > maxImages.value ? true : false;
  if (isFinish) {
    createToast(
      toastType.error,
      "Maximum d'images atteints",
      `Nombre d'images autorisés : ${maxImages.value}`
    );
  }
  return isFinish;
}

async function removeImageList(imageTarget) {
  const indexImage = imagesModels.value.findIndex((image) => imageTarget.url === image.url);
  imagesModels.value.splice(indexImage, 1);
}
</script>

<template>
  <div class="wrapper-selector-media">
    <label v-if="label" class="label label--input">{{ label }}</label>
    <div class="selector-media">
      <div class="select-selector-media" @click="showModal = true">
        <p>Sélectionner des fichiers</p>
      </div>
      <div class="footer-selector-media">
        <ItemPreview
          v-for="(image, index) of imagesModels"
          :key="image.url"
          :image="image"
          @removeItem="removeImageList"
        />
      </div>
    </div>
    <ModalSelector
      :onlySelect="onlySelect"
      @getSelectedImages="getSelectedImages"
      v-model:modal="showModal"
    />
  </div>
</template>

<style lang="scss">
.selector-media {
  background-color: var(--surface-card);
  border-radius: var(--border-radius-secondary);
  border: solid 1px var(--surface-border);
  overflow: hidden;
}

.select-selector-media {
  height: 80px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.footer-selector-media {
  background-color: var(--surface-50);
  padding: 1rem;
}

[data-theme="dark"] {
  .footer-selector-media {
    background-color: var(--surface-200);
  }
}
</style>
