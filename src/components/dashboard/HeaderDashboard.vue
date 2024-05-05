<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: String,
  subtitle: String,
});
</script>

<template>
  <div class="header-dashboard">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
    <div class="btn-header">
      <div class="wrapper-btn">
        <slot name="btn"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-dashboard {
  border-bottom: solid 1px var(--surface-border);
  margin-bottom: 2rem;
}

.btn-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.wrapper-btn {
  display: flex;
  gap: 1rem;
}
</style>
