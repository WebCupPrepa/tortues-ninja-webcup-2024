<script setup>
import { computed, defineProps } from "vue";
import { useToppingsStore } from "@/stores/data/toppings";

const props = defineProps({
  toppingId: String,
});

const toppingStore = useToppingsStore();

const topping = computed(() => {
  if (toppingStore.toppings.data) {
    return toppingStore.toppings.data.find((topping) => topping.id === props.toppingId);
  }
  return null;
});
</script>

<template>
  <div class="item-topping" v-if="topping">
    <img class="img__item" :src="topping.image[0].url" alt="" />
    <p class="txt__item">{{ topping.title }}</p>
  </div>
</template>

<style lang="scss" scoped>
.item-topping {
  display: inline-block;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .img__item {
    width: 80px;
    height: 80px;

    object-fit: contain;
    pointer-events: none;
  }

  .txt__item {
    text-align: center;
  }
}
</style>
