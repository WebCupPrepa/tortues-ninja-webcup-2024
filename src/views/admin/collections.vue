<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import ModalCollection from "@/components/admin/collections/ModalCollection.vue";
import CardCollection from "@/components/admin/collections/CardCollection.vue";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard.vue";
import { useCollectionsStore } from "@/stores/admin/collections.js";
import ListSkeletons from "@/components/global/loaders/ListSkeletons.vue";

const collectionsStore = useCollectionsStore();
const { collections } = storeToRefs(collectionsStore);

const router = useRouter();

function goToCollection(collection) {
  router.push(`collections/${collection.name}`);
}
</script>
<template>
  <section class="section-archive-collections">
    <div class="archive-collections-component">
      <HeaderDashboard title="Collections" subtitle="Voici toutes les collections">
        <template #btn>
          <ModalCollection />
        </template>
      </HeaderDashboard>
      <div class="wrapper-cards-archive-collections">
        <CardCollection
          v-for="collection of collections.data"
          @click="goToCollection(collection)"
          :name="collection.name"
          :number-docs="collection.docs ? collection.docs.length : 0"
          v-if="collections.isLoad"
        />
        <ListSkeletons v-else></ListSkeletons>
        <div v-if="!collections.data.length && collections.isLoad">Pas de collection</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper-cards-archive-collections {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mobileSmall {
    grid-template-columns: repeat(1, 1fr);
  }
}

.add-collection {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}
</style>
