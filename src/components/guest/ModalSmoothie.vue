<script setup>
import Modal from "@/components/global/Modal.vue";
import CardSmoothie from "./CardSmoothie.vue";
import { ref, defineProps, defineEmits, watch } from "vue";
import { useOrdersStore } from "@/stores/data/orders";
import { useAuthStore } from "@/stores/global/auth.js";
import { createToast } from "@/utils/createToast.js";
import { toastType } from "@/components/global/toast/toastType";
import { useRouter } from "vue-router";
import ListItemsSmoothie from "@/components/ListItemsSmoothie.vue";

const router = useRouter();
const ordersStore = useOrdersStore();
const authStore = useAuthStore();

const props = defineProps({
  smoothie: Object,
});

const model = defineModel();
const emit = defineEmits(["cancelOrder"]);
const orderFinish = ref(false);

function createOrder() {
  const copySmoothie = { ...props.smoothie };
  delete copySmoothie.id;

  const dataOrder = {
    ...copySmoothie,
    idSmoothie: props.smoothie.id,
    userId: authStore.currentUser.id,
  };

  ordersStore.createDoc(dataOrder);
  createToast(toastType.info, "Commande en cours de création");
  orderFinish.value = true;
}
</script>
<template>
  <Modal header="Ma commande" v-model:show="model">
    <div class="content-modal">
      <CardSmoothie v-if="smoothie" :smoothie="smoothie"></CardSmoothie>
      <ListItemsSmoothie :items="smoothie"></ListItemsSmoothie>

      <div class="wrapper-btn">
        <template v-if="!orderFinish">
          <div class="btn btn--secondary" @click="emit('cancelOrder')">Annuler ma commande</div>
          <div class="btn btn--primary" @click="createOrder">Valider ma commande</div>
        </template>
        <div v-else class="btn btn--primary" @click="router.push('/mes-commandes')">
          Voir l'historique des commandes
        </div>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.wrapper-btn {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  .btn {
    flex: 1;
  }
}
</style>
