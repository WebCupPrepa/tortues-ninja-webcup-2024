<script setup>
import { reactive, ref, defineProps } from "vue";
import { createToast } from "@/utils/createToast.js";
import { toastType } from "@/components/global/toast/toastType.js";
import { useFieldsDoc } from "@/composables/admin/useFieldsDoc.js";
import { useCollectionsStore } from "@/stores/admin/collections.js";
import Modal from "@/components/global/Modal.vue";
import LoopFields from "@/components/admin/collections/LoopFields.vue";
import { createDocFirestore } from "@/firebase/services/firestore";
import { useCurrentCollectionStore } from "@/stores/admin/currentCollection";
import { storeToRefs } from "pinia";

const props = defineProps({
  collection: Object,
});

const show = ref(false);
function openModal() {
  show.value = true;
}

const currentCollectionStore = useCurrentCollectionStore();

/* FIELDS*/
const { fieldsDoc, createDocData, checkFieldsEmpty } = useFieldsDoc(props.collection.fields);

async function createDoc() {
  if (checkFieldsEmpty()) {
    createToast(toastType.error, "Champs invalides", "Merci de remplir tous les champs");
    return false;
  }

  const docData = createDocData();
  await currentCollectionStore.createDoc(docData);
}
</script>

<template>
  <button class="btn btn--primary" @click="openModal">Créer un doc</button>
  <Modal header="Créer un nouveau doc" v-model:show="show">
    <div class="doc-fields">
      <LoopFields v-model:fields="fieldsDoc"></LoopFields>
    </div>
    <div class="wrapper-btn">
      <div class="btn btn--primary" @click="createDoc">Créer le doc</div>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.wrapper-btn {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;

  .btn {
    flex: 1;
  }
}
</style>
