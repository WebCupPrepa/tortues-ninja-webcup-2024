<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import ListDocs from "@/components/admin/ListDocs.vue";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard.vue";
import ModalUsers from "@/components/admin/users/ModalUsers.vue";
import { useUsersStore } from "@/stores/admin/users";
import ListSkeletons from "@/components/global/loaders/ListSkeletons.vue";

const route = useRoute();
const usersStore = useUsersStore();
</script>
<template>
  <section class="section-users">
    <HeaderDashboard :title="route.meta.title" :subtitle="route.meta.description">
      <template #btn> <ModalUsers></ModalUsers> </template>
    </HeaderDashboard>
    <div class="users-component">
      <ListDocs class="list-users" v-if="usersStore.users.isLoad" :items="usersStore.users.data" />
      <div class="list-users-skeletons" v-else>
        <ListSkeletons class-item="user-skeleton"></ListSkeletons>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.list-users-skeletons {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

:deep(.user-skeleton) {
  height: 50px;
}
</style>
