<script setup>
import Panel from "@/components/global/accordion/Panel.vue";
import { computed, defineProps } from "vue";
import ItemIngredient from "@/components/fetch/ItemIngredient.vue";
import ItemTopping from "@/components/fetch/ItemTopping.vue";

const props = defineProps({
  items: Object,
});

const ingredients = computed(() => {
  return trierIngredients(props.items, "ingredient");
});

const toppings = computed(() => {
  return trierIngredients(props.items, "topping");
});

function trierIngredients(objet, value) {
  console.log(objet);
  const ingredients = [];

  const name = value === "ingredient" ? "ingredient_" : "topping_";

  for (const cle in objet) {
    if (cle.startsWith(name)) {
      ingredients.push(objet[cle]);
    }
  }

  console.log(ingredients);

  return ingredients;
}
</script>

<template>
  <div class="list-items">
    <p class="title-list">Détails de la commande :</p>
    <p>Ingrédients :</p>
    <div class="wrapper-items" v-if="ingredients">
      <ItemIngredient
        class="item-ingredient-order"
        v-for="ingredient of ingredients"
        :ingredientId="ingredient"
        v-bind:key="ingredient"
      />
    </div>
    <p>Topping :</p>
    <div class="wrapper-items" v-if="toppings">
      <ItemTopping
        class="item-ingredient-order"
        v-for="topping of toppings"
        :toppingId="topping"
        v-bind:key="topping"
      />
    </div>
    <div class="wrapper-ingredient-order" v-else>
      <p>No Topping</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-items {
  margin-bottom: 2rem;
}

.title-list {
  margin-bottom: 2rem;
}

.wrapper-items {
  display: flex;
  margin-bottom: 1.5rem;
}

:deep(.item-ingredient .img__item),
:deep(.item-topping .img__item) {
  height: 40px;
}
</style>
