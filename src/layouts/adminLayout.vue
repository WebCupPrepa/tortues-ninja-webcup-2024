<script setup>
import { useNavigationStore } from "@/stores/global/navigation/navigation";
import { storeToRefs } from "pinia";
import SidebarDashboard from "@/components/dashboard/SidebarDashboard.vue";
import { onMounted } from "vue";
import { useCollectionsStore } from "@/stores/admin/collections";
import { onBeforeRouteLeave } from "vue-router";
import { useUsersStore } from "@/stores/admin/users";
import { useMediasStore } from "@/stores/admin/medias";

const navigationStore = useNavigationStore();
const { linksAdmin } = storeToRefs(navigationStore);
const collectionsStore = useCollectionsStore();
const usersStore = useUsersStore();
const mediasStore = useMediasStore();

onMounted(() => {
  collectionsStore.getDocs();
  usersStore.getUsers();
  mediasStore.getDocs();
});

onBeforeRouteLeave(() => {
  collectionsStore.resetData();
  usersStore.resetData();
  mediasStore.resetData();
});
</script>

<template>
  <div class="admin-layout">
    <SidebarDashboard :links="linksAdmin"></SidebarDashboard>
    <div class="router-view-admin">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/components/_containers.scss";

.router-view-admin {
  padding-top: 1rem;
  margin-left: $sidebar-width;
  @extend .page-padding;
  width: auto;
}

@include tablet {
  .router-view-admin {
    margin-left: 0;
    padding-top: calc(#{$navbar-height-mobile} + 1rem);
  }
}
</style>
