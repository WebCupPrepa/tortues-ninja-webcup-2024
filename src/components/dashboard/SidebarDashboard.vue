<script setup>
import Sidebar from "@/components/global/sidebar/Sidebar.vue";
import LinkSidebar from "../global/sidebar/LinkSidebar.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/global/auth";
import { linkTypes } from "../global/navigation/linkTypes";
const props = defineProps({
  links: Array,
});

const logoutLink = {
  text: "Déconnexion",
  icon: "log-out",
  url: "",
};

const extendClass = ref("");

function getExtendClass(extendClassFromSidebar) {
  extendClass.value = extendClassFromSidebar.value;
}

const authStore = useAuthStore();

function logout(e) {
  authStore.logout();
}
</script>

<template>
  <Sidebar :links="links" @get-extend-class="getExtendClass">
    <template #footer>
      <LinkSidebar
        class="logout-link"
        :text="logoutLink.text"
        :url="logoutLink.url"
        :icon="logoutLink.icon"
        :extend-class="extendClass"
        :type="linkTypes.prevent"
        @click="logout"
      />
    </template>
  </Sidebar>
</template>

<style lang="scss" scoped>
.logout-link {
  &:hover {
    background-color: var(--red-50) !important;

    :deep(.txt__link-sidebar) {
      color: var(--red-500) !important;
    }

    :deep(.icon__link-sidebar) {
      color: var(--red-500) !important;
    }
  }
}
</style>
