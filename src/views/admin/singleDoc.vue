<script setup>
import { ref, computed, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard.vue";
import LoopFields from "@/components/admin/collections/LoopFields.vue";
import { useCollectionsStore } from "@/stores/admin/collections.js";
import { useCurrentCollectionStore } from "@/stores/admin/currentCollection.js";
import { useFieldsDoc } from "@/composables/admin/useFieldsDoc.js";
import isEqual from "lodash.isequal";
import { createToast } from "@/utils/createToast";
import { toastType } from "@/components/global/toast/toastType";
import { updateDocFirestore, deleteDocFirestore } from "@/firebase/services/firestore";

// STORE INIT
const currentCollectionStore = useCurrentCollectionStore();
const { currentCollection } = storeToRefs(currentCollectionStore);
const collectionsStore = useCollectionsStore();
const { collections } = storeToRefs(collectionsStore);

// ROUTE & ROUTER
const route = useRoute();
const router = useRouter();

// CURRENT DOC ET COLLECTION STRUCTURE
const currentDoc = computed(() => {
  return currentCollection.value.data.find((doc) => doc.id === route.params.id);
});

// chercher dans collections le model de la collection actuelle
const collectionStruct = computed(() => {
  return collections.value.data.find(
    (element) => element.name === currentCollection.value.collectionName
  );
});

// FIELDS
const { fieldsDoc, fieldsDocWithValue, createDocData, checkFieldsEmpty } = useFieldsDoc(
  collectionStruct.value.fields,
  currentDoc.value
);

async function updateDoc() {
  const newDocData = createDocData(fieldsDocWithValue);
  const lastDocData = { ...currentDoc.value };
  delete lastDocData.id;

  if (isEqual(lastDocData, newDocData)) {
    createToast(toastType.error, "Aucun changement effectué");
    return false;
  }

  currentCollectionStore.updateDoc(
    currentCollection.value.collectionName,
    currentDoc.value.id,
    newDocData
  );
}

async function deleteDoc() {
  await currentCollectionStore.deleteDoc(
    currentCollection.value.collectionName,
    currentDoc.value.id
  );
  router.go(-1);
}
</script>

<template>
  <section class="section-doc" v-if="currentCollection && collections">
    <div class="doc-component">
      <HeaderDashboard
        :title="currentDoc.title"
        :subtitle="`Collection parente : ${collectionStruct.name} | ID doc : ${currentDoc.id}`"
      >
        <template #btn>
          <button class="btn btn--secondary" @click="deleteDoc">Supprimer</button>
          <button class="btn btn--primary" @click="updateDoc">Mettre à jour</button>
        </template>
      </HeaderDashboard>
      <!-- FIELDS  -->
      <div class="fields-doc">
        <h2>Champs :</h2>
        <LoopFields v-model:fields="fieldsDocWithValue"></LoopFields>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.fields-doc {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
