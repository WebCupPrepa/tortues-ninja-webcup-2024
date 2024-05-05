<script setup>
import Modal from "@/components/global/Modal.vue";
import { reactive, ref } from "vue";
import InputText from "@/components/global/inputs/InputText.vue";
import InputSelect from "@/components/global/inputs/InputSelect.vue";
import CardRadio from "@/components/global/inputs/CardRadio.vue";
import { toastType } from "@/components/global/toast/toastType.js";
import { createToast } from "@/utils/createToast.js";
import { useCollectionsStore } from "@/stores/admin/collections.js";
import { storeToRefs } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { optionsTypesField } from "@/enums/admin/typesField.js";

const collectionsStore = useCollectionsStore();

const show = ref(null);

function openModal() {
  show.value = true;
}

const collectionName = ref(null);
const collectionDesc = ref(null);

/* FIELDS*/

const fields = ref([
  {
    name: "title",
    type: "text",
    value: null,
  },
]);

function addNewField() {
  const newField = {
    name: null,
    type: null,
    value: null,
  };
  fields.value.push(newField);
}

async function createCollection() {
  if (checkFieldsEmpty() && !collectionName.value) {
    createToast(toastType.error, "Champs invalides", "Merci de remplir tous les champs");
    return false;
  }

  const docCollection = {
    name: collectionName.value,
    id: uuidv4(),
    description: collectionDesc.value,
    // docs: [],
    fields: fields.value,
  };

  await collectionsStore.createDoc(docCollection);
}

function checkFieldsEmpty() {
  for (let field of fields.value) {
    const fieldEmpty = !field.value && !field.name;
    if (fieldEmpty) {
      return true;
    }
  }

  return false;
}
</script>

<template>
  <button class="btn btn--primary" @click="openModal">Créer une collection</button>
  <Modal header="Créer une nouvelle collection" v-model:show="show">
    <div class="new-collection">
      <InputText label="Nom de la collection : " v-model="collectionName"></InputText>
      <InputText label="Description de la collection : " v-model="collectionDesc"></InputText>
    </div>
    <div class="fields-collection">
      <p class="title__fields-collection">Construisez vos champs</p>
      <div class="row-fields" v-for="field of fields">
        <div class="col-fields">
          <InputSelect
            label="Sélectionner un champ"
            v-model="field.type"
            :options="optionsTypesField"
          />
        </div>
        <div class="col-name">
          <InputText label="Donner un nom à ce champ" v-model="field.name"></InputText>
        </div>
      </div>
    </div>
    <div class="wrapper-btn">
      <div class="btn btn--secondary" @click="addNewField">Ajouter un nouveau champ</div>
      <div class="btn btn--primary" @click="createCollection">Créer la collection</div>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.new-collection {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title__fields-collection {
  color: var(--text-color);
}

.fields-collection {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.row-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.wrapper-btn {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;

  .btn {
    flex: 1;
  }
}
</style>
@/enums/admin/typesField.js
