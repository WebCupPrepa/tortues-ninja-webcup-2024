<script setup>
import { defineModel, reactive } from "vue";
import InputText from "@/components/global/inputs/InputText.vue";
import InputNumber from "@/components/global/inputs/InputNumber.vue";
import RichText from "@/components/global/inputs/RichText.vue";
import SelectorMedia from "../medias/selector-media/SelectorMedia.vue";
import { typesfield } from "@/enums/admin/typesField";

const modelFields = defineModel("fields");
</script>

<template>
  <div class="loop-fields">
    <template v-for="(field, index) of modelFields" :key="index">
      <InputText v-model="field.value" :label="field.name" v-if="field.type === typesfield.text" />
      <InputNumber
        v-model="field.value"
        :label="field.name"
        v-else-if="field.type === typesfield.number"
      />
      <RichText
        v-model="field.value"
        :label="field.name"
        v-else-if="field.type === typesfield.richtext"
      />

      <SelectorMedia
        :label="field.name"
        v-model:images="field.value"
        :onlySelect="field.type === typesfield.image ? true : false"
        v-else-if="field.type === typesfield.image || field.type === typesfield.listImages"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.loop-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
