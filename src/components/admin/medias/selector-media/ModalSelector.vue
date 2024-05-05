<script setup>
import { ref, defineModel, defineEmits, computed, defineProps } from "vue";
import Modal from "@/components/global/Modal.vue";
import CardRadio from "@/components/global/inputs/CardRadio.vue";
import CardCheckbox from "@/components/global/inputs/CardCheckbox.vue";
import { useMediasStore } from "@/stores/admin/medias";
import { storeToRefs } from "pinia";
import InputImage from "@/components/global/inputs/input-image/InputImage.vue";

const props = defineProps({
  onlySelect: Boolean,
});

const headerText = computed(() =>
  props.onlySelect ? "Sélectionnez une image" : "Sélectionnez les images"
);

const model = defineModel("modal");
const emit = defineEmits(["getSelectedImages"]);

const mediasStore = useMediasStore();
const { medias } = storeToRefs(mediasStore);

const selectedImages = ref([]);

function closeModal() {
  model.value = false;
  emit("getSelectedImages", selectedImages);
  resetImagesSelected();
}

function resetImagesSelected() {
  while (selectedImages.value.length > 0) {
    selectedImages.value.pop();
  }
}
</script>

<template>
  <Modal container-size="lg" v-model:show="model" :header="headerText">
    <div class="content-modal-selector-media" v-if="medias.data">
      <InputImage class="input-image-modal-selector" label="Importer des nouvelles images :" />
      <div class="wrapper-previews-media">
        <template v-for="image of medias.data" :key="image.url">
          <!-- ONE SELECT -->
          <CardRadio v-if="onlySelect" v-model="selectedImages" :name="image.name" :value="image">
            <div class="img-preview-media">
              <img :src="image.url" />
            </div>
            <div class="name__preview-media">{{ image.name }}</div>
          </CardRadio>
          <!-- MANY SELECT -->
          <CardCheckbox v-else v-model="selectedImages" :name="image.name" :value="image">
            <div class="img-preview-media">
              <img :src="image.url" />
            </div>
            <div class="name__preview-media">{{ image.name }}</div>
          </CardCheckbox>
        </template>
      </div>
      <div class="add-selector-media">
        <div class="btn btn--primary" @click="closeModal">Ajouter les images</div>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.input-image-modal-selector {
  margin-bottom: 2rem;
}
.wrapper-previews-media {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2em;
}

.img-preview-media {
  object-fit: cover;
  max-height: 80%;
  height: 100%;
  background-color: var(--surface-50);

  img {
    height: 100%;
    object-fit: contain;
  }
}

.name__preview-media {
  height: 20%;
  font-size: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
}

:deep(.input-checkbox:checked + .card-checkbox),
:deep(.input-radio:checked + .card-radio) {
  border-color: transparent;
}
</style>
