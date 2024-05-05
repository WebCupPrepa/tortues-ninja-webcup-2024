<script setup>
import { reactive } from "vue";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard.vue";
import { useOrdersStore } from "@/stores/data/orders.js";
import Accordion from "@/components/global/accordion/Accordion.vue";
import Panel from "@/components/global/accordion/Panel.vue";
import ListItemsSmoothie from "@/components/ListItemsSmoothie.vue";
import { storeToRefs } from "pinia";
import Skeleton from "@/components/global/loaders/Skeleton.vue";

const ordersStore = useOrdersStore();
const { orders } = storeToRefs(ordersStore);
</script>

<template>
  <HeaderDashboard title="Mes commandes" subtitle="historique des commandes passées" />


  <div v-if="!olders">
    <Accordion class="accordion-orders">
      <Panel v-for="order of orders.data" :key="order.id" :header="order.title">
        <ListItemsSmoothie :items="order"></ListItemsSmoothie>
      </Panel>
    </Accordion>
  </div>
  <div v-else-if="olders.data.length === 0">
      <p> Pas encore de commande </p>
  </div>
  <div v-else>
    <Skeleton></Skeleton>
  </div>
</template>
