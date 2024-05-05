<script setup>
import HeaderDashboard from "@/components/dashboard/HeaderDashboard.vue";
import CardMedia from "../../components/admin/medias/CardMedia.vue";
import InputImage from "@/components/global/inputs/input-image/InputImage.vue";
import { useMediasStore } from "@/stores/admin/medias.js";
import { storeToRefs } from "pinia";
import ListSkeletons from "@/components/global/loaders/ListSkeletons.vue";

const mediasStore = useMediasStore();
const { medias } = storeToRefs(mediasStore);
</script>
<template>
  <section class="section-medias">
    <div class="media-collections-component">
      <HeaderDashboard title="Medias" subtitle="Voici toutes les medias">
        <template #btn>
          <InputImage></InputImage>
        </template>
      </HeaderDashboard>
      <div class="wrapper-card-media">
        <CardMedia v-if="medias.isLoad" v-for="media of medias.data" :image="media"></CardMedia>
        <ListSkeletons v-else></ListSkeletons>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper-card-media {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mobileLarge {
    grid-template-columns: repeat(1, 1fr);
  }
}

:deep(.btn-header) {
  display: block;
}

:deep(.wrapper-input-image) {
  margin-top: 1rem;
  width: 100%;
}
</style>
