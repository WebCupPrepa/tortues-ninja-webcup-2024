<script setup>
import Table from "@/components/global/Table.vue";
import { createToast } from "@/utils/createToast";
import { computed, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toastType } from "../global/toast/toastType";

// LIST OF DOCUMENT INSIDE ANY COLLECTION

const props = defineProps({
  items: Array,
  baseSingleUrl: String,
});

const router = useRouter();
const route = useRoute();

const itemsCopy = computed(() => (Array.isArray(props.items) ? [...props.items] : []));

const keysForRemove = checkKeysForRemove(itemsCopy.value[0]);

const itemsCleaned = computed(() => {
  return itemsCopy.value.map((item) => {
    return cleanObject(item, keysForRemove);
  });
});

function checkKeysForRemove(item) {
  const outputKeys = [];
  const copyItem = { ...item };

  for (let key in copyItem) {
    const value = copyItem[key];
    testHtml(value, key, outputKeys);
  }
  return outputKeys;
}

function testHtml(value, key, outputKeys) {
  if (typeof value !== "string") {
    return;
  }

  const regexHtml = /<[^>]+>/;

  if (value.match(regexHtml)) {
    outputKeys.push(key);
  }
}

function cleanObject(obj, keysForDeleted) {
  const newObj = { ...obj };
  keysForDeleted.forEach((key) => delete newObj[key]);
  return newObj;
}

function clickItem(item) {
  if (props.baseSingleUrl) {
    router.push(`${props.baseSingleUrl}/${item.id}`);
  } else {
    createToast(toastType.info, `Single non disponible pour ${route.meta.title}`);
  }
}
</script>

<template>
  <Table class="list-docs" :items="itemsCleaned" align="start" @clickItem="clickItem"></Table>
  <div class="nb-docs">
    <i>Total docs: {{ itemsCopy.length }}</i>
  </div>
</template>

<style lang="scss" scoped>
.list-docs {
  :deep(.item) {
    padding: 1.4rem 2rem;
  }
  :deep(.row--body) {
    cursor: pointer;
    position: relative;
  }

  :deep(.row--body):hover {
    color: var(--primary-color);
  }

  :deep(.row--body)::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--primary-color);
    width: 2px;
    height: 0px;
    transition: 0.3s ease;
  }

  :deep(.row--body):hover::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--primary-color);
    height: 100%;
  }
}

.nb-docs {
  padding: 0.5rem;
  display: flex;
  justify-content: flex-end;
  font-size: italic;
  color: var(--text-color-secondary);
}
</style>
