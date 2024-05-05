<script setup>
import { computed, ref, watch } from "vue";
import ModalSmoothie from "@/components/guest/ModalSmoothie.vue";
import { useSmoothiesStore } from "@/stores/data/smoothies";
import { storeToRefs } from "pinia";
import CardSmoothie from "@/components/guest/CardSmoothie.vue";
import { useAuthStore } from "@/stores/global/auth.js";
import { createToast } from "@/utils/createToast";
import { toastType } from "@/components/global/toast/toastType";

const authStore = useAuthStore();

const smoothiesStore = useSmoothiesStore();
const { smoothies, smoothiesFilter } = storeToRefs(smoothiesStore);

const selectedSmoothie = ref(null);
const showModal = ref(false);

const disabledBtn = computed(() => (!authStore.currentUser ? "disabled" : ""));

function selectSmoothie(smoothie) {
  if (disabledBtn.value) {
    createToast(
      toastType.info,
      "Compte requis",
      "Inscrivez-vous ou connectez vous pour commander un smoothie"
    );
    return;
  }
  // ajouter le produit
  selectedSmoothie.value = smoothie;
  showModal.value = true;
}

function deselectSmoothie() {
  selectedSmoothie.value = null;
  showModal.value = false;
}
</script>

<template>
  <div>
    <section class="section-smoothies mt-guest">
      <div class="page-padding">
        <div class="container">
          <div class="smoothies-component">
            <h1 class="title__smoothies">Nos smoothies</h1>
            <div class="wrapper-smoothies">
              <!-- CARD -->
              <CardSmoothie
                v-if="smoothies.isLoad"
                v-for="smoothie of smoothiesFilter"
                :key="smoothie.id"
                :smoothie="smoothie"
              >
                <template #btn>
                  <div :class="`btn btn--primary ${disabledBtn}`" @click="selectSmoothie(smoothie)">
                    Commander mon smoothie
                  </div>
                </template>
              </CardSmoothie>
              <ListSkeletons v-else-if="smoothies.isLoad"></ListSkeletons>
              <p v-else>Pas de smoothies</p>
              <!-- modal -->
              <modal-smoothie
                v-model="showModal"
                :smoothie="selectedSmoothie"
                @cancelOrder="deselectSmoothie"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.section-smoothies {
  margin-top: 1rem;
}
.title__smoothies {
  margin-bottom: 2rem;
}
.wrapper-smoothies {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @include tablet() {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mobileLarge() {
    grid-template-columns: repeat(1, 1fr);
  }
}

.btn {
  margin-top: 0.5rem;
  &.disabled {
    opacity: 0.5;
  }
}
</style>
