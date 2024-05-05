<script setup>
import { computed, defineProps } from "vue";
import { useIngredientsStore } from "@/stores/data/ingredients";
import { useToppingsStore } from "@/stores/data/toppings";
import ItemIngredient from "../fetch/ItemIngredient.vue";

const props = defineProps({
  itemId: String,
});

const ingredientsStore = useIngredientsStore();
const toppingsStore = useToppingsStore();

const ingredient = computed(() => {
  if (ingredientsStore.ingredients.data) {
    console.log(
      ingredientsStore.ingredients.data.find((ingredient) => ingredient.id === props.itemId) ||
        toppingsStore.toppings.data.find((topping) => topping.id === props.itemId)
    );
    return (
      ingredientsStore.ingredients.data.find((ingredient) => ingredient.id === props.itemId) ||
      toppingsStore.toppings.data.find((topping) => topping.id === props.itemId)
    );
  }
  return null;
});
</script>

<template>
  <div
    class="item-juice"
    v-if="ingredient"
    :style="{
      backgroundColor: ingredient.color ? 'var(--' + ingredient.color + ')' : 'white',
    }"
  >
    <ItemIngredient class="item" :ingredient-id="itemId" />
  </div>
</template>

<style lang="scss" scoped>
.item-juice {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 13%;
  bottom: 0;

  z-index: 1;
}

:deep(.txt__item) {
  display: none;
}
</style>
