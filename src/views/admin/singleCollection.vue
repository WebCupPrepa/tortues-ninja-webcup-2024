<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import ModalDoc from "@/components/admin/collections/ModalDoc.vue";
import ListDocs from "@/components/admin/ListDocs.vue";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard.vue";
import { useCollectionsStore } from "@/stores/admin/collections.js";
import { useCurrentCollectionStore } from "@/stores/admin/currentCollection.js";
import { useRoute, useRouter } from "vue-router";

const currentCollectionStore = useCurrentCollectionStore();
const { currentCollection } = storeToRefs(currentCollectionStore);

const collectionsStore = useCollectionsStore();
const { collections } = storeToRefs(collectionsStore);

const collectionStruct = computed(() => {
  return collections.value.data.find(
    (element) => element.name === currentCollection.value.collectionName
  );
});

const route = useRoute();
</script>
<template>
  <section class="section-collections" v-if="currentCollection && collectionStruct">
    <HeaderDashboard
      :title="currentCollection.collectionName"
      :subtitle="collectionStruct.description"
    >
      <template #btn>
        <ModalDoc :collection="collectionStruct"></ModalDoc>
      </template>
    </HeaderDashboard>
    <div class="collection-component">
      <ListDocs :items="currentCollection.data" :baseSingleUrl="route.params.name"></ListDocs>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
