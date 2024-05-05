<script setup>
import ComposeSmoothie from "@/components/guest/ComposeSmoothie.vue";
import CupSmoothie from "@/components/guest/CupSmoothie.vue";
import Driver from "@/components/global/driver/Driver.vue";
import { useIngredientsStore } from "@/stores/data/ingredients";
import { useToppingsStore } from "@/stores/data/toppings";
import { onMounted, ref } from "vue";
import Skeleton from "@/components/global/loaders/Skeleton.vue";
// ingredients selected
// topppings selected
const tab_ingredients = ref([]);

async function updateIngredient(ingredients) {
  if (ingredients === null) {
    return;
  }
  tab_ingredients.value.push(ingredients.id);
}

async function removeIngredient(ingredient) {
  tab_ingredients.value = tab_ingredients.value.filter((el) => el !== ingredient);
}

async function migrateIngredients(ingredients) {
  tab_ingredients.value = ingredients;
}

async function clearIngredients() {
  tab_ingredients.value = [];
}

/* DRIVER JS */
const steps = [
  {
    element: ".b1-custom",
    popover: {
      title: "Bienvenue sur la page composer votre smoothie",
    },
  },
  {
    element: ".tab-compose",
    popover: {
      title: "Onglets ingrédients et toppings",
      description:
        "Ici vous pouvez sélectionner les ingrédients ou les toppings à travers un système d'onglets",
    },
  },
  {
    element: ".wrapper-ingredients",
    popover: {
      title: "Onglet ingrédient",
      description: "Voici les ingrédients à sélectioner",
    },
  },
  {
    element: ".cup-smoothie",
    popover: {
      title: "Prévisualisation des smoothies",
      description: "Ici vous prévisualiser la composition de votre smoothie",
    },
  },
  {
    element: ".wrapper-btn",
    popover: {
      title: "Passer une commande OU Recommencer",
      description:
        "Une fois les éléments sélectionnés vous pouvez commander votre smoothie ou le recommencer",
    },
  },
];

const ingredientsStore = useIngredientsStore();
const toppingsStore = useToppingsStore();
</script>

<template>
  <div>
    <section class="section-custom mt-guest">
      <div class="page-padding">
        <div class="container">
          <div class="layout-custom">
            <div class="b1-custom">
              <h1 class="title__custom">Composer votre smoothie</h1>
              <template v-if="ingredientsStore.ingredients.isLoad && toppingsStore.toppings.isLoad">
                <ComposeSmoothie
                  :ingredients="tab_ingredients"
                  @updateIngredient="updateIngredient"
                  @removeIngredient="removeIngredient"
                  @clearIngredients="clearIngredients"
                  @migrateIngredients="migrateIngredients"
                />
              </template>
              <Skeleton
                v-else-if="!ingredientsStore.ingredients.isLoad && !toppingsStore.toppings.isLoad"
              />
              <p v-else>Impossible de composer son smoothie</p>
            </div>
            <div class="b2-custom">
              <CupSmoothie :ingredients="tab_ingredients" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Driver :steps="steps" name="custom-smoothies"></Driver>
</template>

<style lang="scss" scoped>
.section-custom {
  margin-top: 1rem;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title__custom {
  margin-bottom: 2rem;
}

.layout-custom {
  min-height: calc(100vh - #{$navbar-height} - 1rem);
  display: flex;
  height: 100%;
  gap: 1rem;

  @include tablet {
    flex-direction: column;
  }
}

.b1-custom {
  // background-color: red;
  flex: 1;
}

.b2-custom {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.skeleton) {
  height: 100%;
}
</style>
