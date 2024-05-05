<script setup>
import { computed, defineProps } from "vue";
import { useIngredientsStore } from "@/stores/data/ingredients";
import { useToppingsStore } from "@/stores/data/toppings";

const props = defineProps({
  ingredientId: String,
});

const ingredientsStore = useIngredientsStore();
const toppingsStore = useToppingsStore();

const ingredient = computed(() => {
  if (ingredientsStore.ingredients.data) {
    return (
      ingredientsStore.ingredients.data.find(
        (ingredient) => ingredient.id === props.ingredientId
      ) || toppingsStore.toppings.data.find((topping) => topping.id === props.ingredientId)
    );
  }
  return null;
});
</script>

<template>
  <div class="item-ingredient" v-if="ingredient">
    <img class="img__item" :src="ingredient.image[0].url" alt="" />
    <p class="txt__item">{{ ingredient.title }}</p>
  </div>
</template>

<style lang="scss" scoped>
.item-ingredient {
  display: inline-block;
  padding: 0.5rem 1rem;

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
