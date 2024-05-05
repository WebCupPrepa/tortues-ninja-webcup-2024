<script setup>
import { defineProps, defineModel } from "vue";

const props = defineProps({
  label: String,
});

const model = defineModel();
</script>
<template>
  <div class="input-password">
    <label v-if="label" class="label label--input">{{ label }}</label>
    <input v-model="model" type="password" class="field__input-password" />
  </div>
</template>

<style lang="scss" scoped>
input[type="password"] {
  width: 100%;
}
</style>
