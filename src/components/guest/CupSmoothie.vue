<script setup>
import { onMounted, ref, watch } from "vue";
import ItemJuice from "@/components/guest/ItemJuice.vue";
import gsap from "gsap";

const cupElements = ref([]);

const props = defineProps({
  ingredients: Array,
});

// watch sur ingredients si il y a un changement et que la longueur est égale à 0 reinitialiser lastPosition
watch(
  () => props.ingredients,
  (ingredients) => {
    if (ingredients.length === 0) {
      lastPosition.value = 0;
    }
  }
);

const lastPosition = ref(0);

function enterTransition(e) {
  gsap.set(e, { zIndex: 0, height: "0%" });

  gsap.to(e, {
    bottom: `${lastPosition.value}%`,
    duration: 1,
    height: "13%",
    zIndex: 0,
    onComplete: () => (e.style.zIndex = "1"),
  });

  lastPosition.value += 13;
}

function add(new_ingredient) {
  cupElements.value.push(new_ingredient.value);
}

// function remove(ingredient) {
//   cupElements.value = cupElements.value.filter((el) => el !== ingredient.value);
// }
</script>

<template>
  <!-- <div class="btn btn--primary" @click="add">click</div> -->
  <div class="cup-smoothie">
    <div class="top-smoothie"></div>
    <div class="content-smoothie">
      <div class="wrapper-items">
        <TransitionGroup tag="div" @enter="enterTransition">
          <template v-for="element of ingredients" :key="element">
            <ItemJuice :item-id="element"></ItemJuice>
          </template>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cup-smoothie {
  height: 100%;
  height: 80%;
  width: 80%;
  position: relative;

  @include tablet {
    height: 60vh;
  }
}

.content-smoothie {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50px 50px 10px 10px;
  background: linear-gradient(
    to bottom,
    rgba(192, 192, 192, 0.444) 5%,
    rgba(248, 248, 248, 0.6) 95%
  );
  border: 2px solid rgba(209, 209, 209, 0.6);
}

:deep(.txt__item) {
  display: none;
}

.body-cup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
