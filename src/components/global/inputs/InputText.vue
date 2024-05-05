<script setup>
import { defineProps, defineModel } from "vue";

const props = defineProps({
  label: String,
});

const model = defineModel();
</script>
<template>
  <div class="input-text">
    <label v-if="label" class="label label--input">{{ label }}</label>
    <input v-model="model" type="text" class="field__input-text" />
  </div>
</template>

<style lang="scss" scoped>
input[type="text"] {
  width: 100%;
}
</style>
