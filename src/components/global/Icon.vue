<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from "vue";

const props = defineProps({
  name: String,
  size: {
    default: "1rem",
    type: String,
  },
  directory: {
    default: "lucide",
    type: String,
  },
});

const dom = ref(null);
defineExpose({ dom });

const icon = defineAsyncComponent(() => {
  return import(`../../assets/icons/${props.directory}/${props.name}.svg`);
});
</script>

<template>
  <div class="icon" :style="{ height: props.size, width: props.size }" ref="dom">
    <component :is="icon" v-if="props.name"></component>
  </div>
</template>

<style lang="scss">
.icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;

  svg {
    height: 100%;
    width: 100%;
  }
}
</style>
