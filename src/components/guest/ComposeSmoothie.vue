<script setup>
import CardCheckbox from "../global/inputs/CardCheckbox.vue";
import ItemIngredient from "../fetch/ItemIngredient.vue";
import ItemTopping from "../fetch/ItemTopping.vue";
import { useIngredientsStore } from "@/stores/data/ingredients";
import { useToppingsStore } from "@/stores/data/toppings.js";
import { storeToRefs } from "pinia";
import { watch, ref, computed } from "vue";
import { useOrdersStore } from "@/stores/data/orders";
import { createToast } from "@/utils/createToast";
import { toastType } from "../global/toast/toastType";
import { useAuthStore } from "@/stores/global/auth";
import { defineEmits, defineProps } from "vue";
import GPT3Chat from "@/utils/useChatGptAPI";
import { useThemeStore } from "@/stores/global/theme";
import Driver from "../global/driver/Driver.vue";
import router from "@/router";

const ordersStore = useOrdersStore();
const authStore = useAuthStore();

const emit = defineEmits(["updateIngredient", "migrateIngredients", "clearIngredients"]);
const ingredientsStore = useIngredientsStore();
const { ingredients, ingredientsFilter } = storeToRefs(ingredientsStore);

const toppingsStore = useToppingsStore();
const { toppings, toppingsFilter } = storeToRefs(toppingsStore);

const selectedIngredients = ref([]);
const selectedToppings = ref([]);
const history = ref([]);
const topHistory = ref([]);

const tabPart = ref(1);

watch(selectedIngredients, (newValue) => {
  if (newValue.length > 4) {
    createToast(toastType.error, "Vous ne pouvez pas sélectionner plus de 4 ingrédients");
    selectedIngredients.value = newValue.slice(0, 4);
    return;
  } else {
    if (newValue.length > history.value.length) {
      const newIngredient = newValue.filter((ingredient) => !history.value.includes(ingredient));
      history.value = newValue;
      emit("updateIngredient", newIngredient[0]);
    } else {
      history.value = newValue;
    }
  }
});

watch(selectedToppings, (newValue) => {
  if (newValue.length > 2) {
    createToast(toastType.error, "Vous ne pouvez pas sélectionner plus de 2 toppings");
    selectedToppings.value = newValue.slice(0, 2);
    return;
  } else {
    if (newValue.length > topHistory.value.length) {
      console.log("new topping");
      const newIngredient = newValue.filter((ingredient) => !topHistory.value.includes(ingredient));
      topHistory.value = newValue;
      console.log(newIngredient[0]);
      emit("updateIngredient", newIngredient[0]);
    } else {
      topHistory.value = newValue;
    }
  }
});

const disabledBtn = computed(() => (!authStore.currentUser ? "disabled" : ""));

async function createSmoothie() {
  // si pas co
  if (!authStore.currentUser) {
    createToast(
      toastType.info,
      "Compte requis",
      "Inscrivez-vous ou connectez vous pour commander un smoothie"
    );
    return;
  }
  // si vide
  if (!selectedIngredients.value.length && !selectedToppings.value.length) {
    createToast(
      toastType.error,
      "Impossible de créer un smoothie vide",
      "Composer votre smoothie avant de le créer"
    );
    return;
  }

  const ingredientsObject = transformArrayToObject("ingredient", selectedIngredients.value);
  const toppingsObject = transformArrayToObject("topping", selectedToppings.value);

  const gpt3chat = new GPT3Chat();
  const ingredientString = selectedIngredients.value
    .map((ingredient) => ingredient.title)
    .join(", ");
  const randomTitle = await gpt3chat.getNameForSmoothie(ingredientString);


  const smoothieData = {
    title: randomTitle,
    userId: authStore.currentUser.id,
    //image à rajouter
  };

  const dataOrder = {
    ...ingredientsObject,
    ...toppingsObject,
    ...smoothieData,
  };

  ordersStore.createDoc(dataOrder);
  createToast(toastType.info, "Commande en cours de création");

  router.push("/mes-commandes");
}

function transformArrayToObject(baseKey, array) {
  const output = {};

  array.forEach((element, index) => {
    const keyName = `${baseKey}_${index + 1}`;
    output[keyName] = element.id;
  });

  return output;
}

const needReset = ref(false);

function allClear() {
  selectedIngredients.value = [];
  selectedToppings.value = [];
  emit("clearIngredients");
  needReset.value = !needReset.value;
}
</script>

<template>
  <div class="compose-smoothie">
    <div class="tab-compose">
      <p class="item__tab" @click="tabPart = 1">Ingrédients</p>
      <p class="item__tab" @click="tabPart = 2">Toppings</p>
    </div>

    <!-- INGREDIENTS -->
    <div class="ingredients" v-if="tabPart === 1">
      <p class="txt__compose">Ingrédients (4 maximums):</p>
      <div class="wrapper-ingredients" v-if="ingredients.isLoad">
        <CardCheckbox
          v-for="ingredient of ingredientsFilter"
          v-model="selectedIngredients"
          :value="ingredient"
          v-bind:key="ingredient.id"
          :reset="needReset"
          name="ingredient"
        >
          <div class="content-card">
            <ItemIngredient :ingredient-id="ingredient.id"></ItemIngredient>
          </div>
        </CardCheckbox>
      </div>
    </div>
    <!-- TOPPINGS -->
    <div class="toppings" v-else>
      <p class="txt__compose">Toppings (2 maximums):</p>
      <div class="wrapper-toppings" v-if="toppings.isLoad">
        <CardCheckbox
          v-for="topping of toppingsFilter"
          v-model="selectedToppings"
          :value="topping"
          v-bind:key="topping.id"
          :reset="needReset"
          name="topping"
        >
          <div class="content-card">
            <ItemTopping :topping-id="topping.id"></ItemTopping>
          </div>
        </CardCheckbox>
      </div>
    </div>

    <!--  FINISH -->
    <div class="wrapper-btn">
      <div class="btn btn--secondary" @click="allClear">Recommencer</div>
      <div :class="`btn btn--primary ${disabledBtn}`" @click="createSmoothie">
        Créer mon smoothie
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// TAB COMPOSE
.tab-compose {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.item__tab {
  padding: 0.5rem 1rem;
  background-color: var(--surface-card);
  border-radius: var(--border-radius);
  cursor: pointer;
}

:deep(.card-checkbox) {
  height: auto;
}

.wrapper-ingredients,
.wrapper-toppings {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  height: 100%;
  @include tablet {
    max-height: auto;
  }
}

.txt__compose {
  margin-bottom: 1rem;
}

:deep(.input-checkbox:checked + .card-checkbox) {
  border-color: var(--primary-color);
}

:deep(.check-card-checkbox) {
  display: none;
}

.wrapper-btn {
  display: flex;
  gap: 1rem;
}

.btn {
  margin-top: 0.5rem;
  &.disabled {
    opacity: 0.5;
  }
}
</style>
