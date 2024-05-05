<script setup>
import { defineProps, defineModel } from "vue";

const props = defineProps({
  label: String,
  options: Array,
});

// ex: option
// {
//     name :"",
//     value : ""
// }

const model = defineModel();
</script>

<template>
  <div class="input-select">
    <label v-if="label" class="label label--input">{{ label }}</label>
    <select v-model="model">
      <option v-for="option of options" :value="option.value">{{ option.name }}</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
select {
  width: 100%;
}
</style>
