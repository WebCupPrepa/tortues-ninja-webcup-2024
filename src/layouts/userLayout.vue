<script setup>
import SidebarDashboard from "@/components/dashboard/SidebarDashboard.vue";
import { useNavigationStore } from "@/stores/global/navigation/navigation";
import { storeToRefs } from "pinia";

//  NAVIGATION
const navigationStore = useNavigationStore();
const { linksUser } = storeToRefs(navigationStore);
</script>

<template>
  <div class="user-layout">
    <SidebarDashboard :links="linksUser"></SidebarDashboard>
    <div class="router-view-user">
      <router-view> </router-view>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/components/_containers.scss";

.router-view-user {
  padding-top: 1rem;
  margin-left: $sidebar-width;
  @extend .page-padding;
  width: auto;
}

@include tablet {
  .router-view-user {
    margin-left: 0;
    padding-top: calc(#{$navbar-height-mobile} + 1rem);
  }
}
</style>
