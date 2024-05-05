<script setup>
import { defineProps, defineModel } from "vue";

const props = defineProps({
  label: String,
});

const model = defineModel();
</script>
<template>
  <div class="input-number">
    <label v-if="label" class="label label--input">{{ label }}</label>
    <input v-model="model" type="number" class="field__input-number" />
  </div>
</template>

<style lang="scss" scoped>
input[type="number"] {
  width: 100%;
}
</style>
