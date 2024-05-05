<script setup>
const props = defineProps({
  name: String,
  numberDocs: Number,
});
</script>

<template>
  <div class="card-collection">
    <p class="title__card-collection">{{ name }}</p>
  </div>
</template>

<style lang="scss" scoped>
.card-collection {
  background-color: var(--surface-card);
  border-radius: var(--border-radius);
  border: solid 1px var(--surface-border);
  padding: 1.5rem;
  position: relative;
  min-height: 200px;
  transition: var(--transition-duration) ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 10px 15px -8px rgba(0, 0, 0, 0.1);
  }
}

.title__card-collection {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-color);
}

.docs-card-collection {
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  color: var(--text-color-secondary);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  background-color: var(--primary-50);
  color: var(--primary-600);
}
</style>
