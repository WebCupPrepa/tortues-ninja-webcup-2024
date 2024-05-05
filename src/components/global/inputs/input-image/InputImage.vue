<script setup>
import { computed, defineProps, ref, defineModel, reactive } from "vue";
import ItemInput from "./ItemInput.vue";
import { statusUpload } from "@/enums/statusUpload.js";
import { v4 as uuidv4 } from "uuid";
import { createToast } from "@/utils/createToast";
import { toastType } from "../../toast/toastType";
import { deleteImageStorage } from "@/firebase/services/storage.js";
import { useMediasStore } from "@/stores/admin/medias";

const props = defineProps({
  label: String,
  multiple: {
    type: Boolean,
    default: true,
  },
});

const mediasStore = useMediasStore();

// Output model containing URLs of uploaded images
const uploadedImagesModel = defineModel();
uploadedImagesModel.value = Array.isArray(uploadedImagesModel.value)
  ? uploadedImagesModel.value
  : [];

// Queue of images waiting to be uploaded
const imagesPending = ref([]);
const maxImages = computed(() => (props.multiple ? Infinity : 1));

async function traitementImages(e) {
  const fileInput = e.target;
  const files = [...fileInput.files];

  for (const file of files) {
    if (maxImagesReached()) break;
    await newImage(file);
  }

  //reset input
  e.target.value = null;
}

async function newImage(file) {
  const urlPreview = await getUrlPreview(file);

  const newImage = {
    id: uuidv4(),
    url: urlPreview,
    name: file.name,
    file: file,
    state: null,
  };

  imagesPending.value.push(newImage);
}

async function getUrlPreview(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const urlPreview = event.target.result;
      resolve(urlPreview);
    };
    reader.readAsDataURL(file);
  });
}

function uploadImages() {
  const noImageSelected = !imagesPending.value.length;
  if (noImageSelected) {
    return createToast(
      toastType.error,
      "Aucune image",
      "Merci de sélectionner des images avant de les uploader"
    );
  }

  // chaque image dans la liste d'attente
  imagesPending.value.forEach(async (image, index) => {
    const imageIsPublish = image.state === statusUpload.publish;
    if (imageIsPublish) {
      return;
    }
    // Marquer l'image comme étant en cours de traitement
    image.state = statusUpload.progress;

    const upload = await mediasStore.createDoc(image.file);

    // assinger keys de l'upload et push dans les images upload
    Object.assign(image, upload);
    const copyImage = { ...image };
    delete copyImage.file;
    uploadedImagesModel.value.push(copyImage);
  });
}

function maxImagesReached() {
  const isFinish = imagesPending.value.length === maxImages.value ? true : false;
  if (isFinish) {
    createToast(
      toastType.error,
      "Maximum d'images atteints",
      `Nombre d'images autorisés : ${maxImages.value}`
    );
  }
  return isFinish;
}

async function removeImageList(image) {
  const imageIsPublished = image.state === statusUpload.publish;

  if (imageIsPublished) {
    image.state = statusUpload.progress;
    await deleteImageStorage({ image: image });
    const indexUploaded = uploadedImagesModel.value.findIndex((img) => img.id === image.id);
    uploadedImagesModel.value.splice(indexUploaded, 1);
  }

  const indexImage = imagesPending.value.findIndex((imgPending) => imgPending.id === image.id);
  imagesPending.value.splice(indexImage, 1);
}

// COMPONENT RETURN URLS IMAGES UPLOADED
// const urlImagesModel = defineModel();
// urlImagesModel.value = Array.isArray(urlImagesModel.value) ? urlImagesModel.value : reactive([]);

// const images = ref([]);
// const maxImages = computed(() => (props.multiple ? Infinity : 1));

// function uploadImages() {
//   if (!images.value.length) {
//     return createToast(
//       toastType.error,
//       "Aucune image",
//       "Merci de sélectionner des images avant de les uploader"
//     );
//   }

//   images.value.forEach(async (image, index) => {
//     if (image.state === statusUpload.publish) {
//       return;
//     }

//     image.state = statusUpload.progress;
//     const upload = await uploadImagesStorage({ file: image.file });
//     // assign keys return in upload
//     Object.assign(image, upload);
//     images.value.splice(index, 1);
//   });
// }

// async function traitementImages(e) {
//   const fileInput = e.target;
//   const files = [...fileInput.files];

//   for (const file of files) {
//     if (maxImagesReached()) break;
//     await newImage(file);
//   }

//   //reset input
//   e.target.value = null;
// }

// function maxImagesReached() {
//   const isFinish = images.value.length === maxImages.value ? true : false;
//   if (isFinish) {
//     createToast(
//       toastType.error,
//       "Maximum d'images atteints",
//       `Nombre d'images autorisés : ${maxImages.value} `
//     );
//   }
//   return isFinish;
// }

// async function removeImageList(image) {
//   const imageIsPublished = image.state === statusUpload.publish;

//   if (imageIsPublished) {
//     image.state = statusUpload.progress;
//     await deleteImageStorage({ file: image.file, fileName: image.nameInStorage });
//     const indexUrl = urlImagesModel.value.indexOf(image.url);
//     urlImagesModel.value.splice(indexUrl, 1);
//   }

//   const indexImage = images.value.indexOf(image);
//   images.value.splice(indexImage, 1);
// }

// async function newImage(file) {
//   const urlPreview = await getUrlPreview(file);

//   images.value.push({
//     id: uuidv4(),
//     url: urlPreview,
//     name: file.name,
//     file: file,
//     state: null,
//   });
// }

// async function getUrlPreview(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const urlPreview = event.target.result;
//       resolve(urlPreview);
//     };
//     reader.readAsDataURL(file);
//   });
// }
</script>
<template>
  <div class="wrapper-input-image">
    <label v-if="label" class="label label--input">{{ label }}</label>
    <div class="input-image">
      <div class="mask-input-image">
        <input type="file" accept="image/*" @change="traitementImages" :multiple="multiple" />
        <div class="content-input-image">
          <p class="txt__input-image">Ajouter des fichiers</p>
          <div class="upload-input-image" @click="uploadImages">
            <span>Upload</span>
            <Icon size="1rem" directory="lucide" name="upload"></Icon>
          </div>
        </div>
      </div>
      <div class="footer-input-image">
        <div class="wrapper-items-input-image">
          <TransitionGroup name="item-image">
            <ItemInput
              v-for="image of imagesPending"
              :key="image.id"
              :image="image"
              @removeItem="removeImageList"
            ></ItemInput>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-image {
  background-color: var(--surface-card);
  border-radius: var(--border-radius-secondary);
  border: solid 1px var(--surface-border);
  overflow: hidden;
}

.mask-input-image {
  position: relative;
  width: 100%;
  min-height: 80px;
}

input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}

.content-input-image {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  align-items: center;
}

.txt__input-image {
  text-align: center;
  flex: 1;
}

.footer-input-image {
  background-color: var(--surface-50);
}

[data-theme="dark"] {
  .footer-input-image {
    background-color: var(--surface-200);
  }
}

.wrapper-items-input-image {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.upload-input-image {
  position: relative;
  z-index: 2;
  justify-self: end;
  font-size: 0.9rem;
  padding: 0.7rem 1rem;
  background-color: var(--secondary-color);
  color: var(--secondary-color-text);
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);
  transition: var(--transition-duration);
  cursor: pointer;

  &:hover {
    transform: scale(0.9);
    opacity: 0.8;
  }
}

// TRANSITION
.item-image-enter-active,
.item-image-leave-active {
  transition: 0.3s ease-out;
}

.item-image-enter-from,
.item-image-leave-to {
  transform: translateY(-20px) scale(0.5);
  opacity: 0;
}
</style>
