<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  items: Array,
  headers: Array, // custom headers if don't want use item keys
  align: String,
});

const emit = defineEmits(["clickItem"]);

const keysItem = computed(() => (props.items[0] ? Object.keys(props.items[0]) : []));

const headersItems = computed(() => {
  return props.headers ? props.headers : keysItem.value;
});
</script>

<template>
  <div class="wrapper-table">
    <table class="table">
      <thead class="header-table">
        <tr class="row row--header">
          <template v-for="(header, index) of headersItems" :key="index">
            <th class="item item--header" :style="{ textAlign: align }">
              {{ header }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody class="body-table">
        <tr
          class="row row--body"
          v-for="(item, index) of items"
          :key="index"
          @click="emit('clickItem', item)"
        >
          <th
            v-for="(header, index) of keysItem"
            :key="index"
            class="item item--body"
            :style="{ textAlign: align }"
          >
            {{ item[header] }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-table {
  max-width: 100%;
  overflow-x: auto;
  width: 100%;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.row {
  &--header {
    background-color: var(--surface-100);
    text-transform: capitalize;
  }

  &--body {
    background-color: var(--surface-a);
    border-bottom: solid 3px var(--surface-ground);
  }

  &--body:last-child {
    border-bottom: none;
  }
}

[data-theme="dark"] {
  .item--header {
    background-color: var(--surface-200);
  }
}

.item {
  padding: 1rem 2rem;
  min-width: 300px;

  &--header {
    font-weight: 600;
  }

  &--body {
    font-weight: 400;
  }
}
</style>
