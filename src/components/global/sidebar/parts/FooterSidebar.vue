<script setup>
import { defineProps } from "vue";
import { useAuthStore } from "@/stores/global/auth";
import LinkSidebar from "../LinkSidebar.vue";
import SwitchTheme from "../../switch-theme/SwitchTheme.vue";

const props = defineProps({
  extendClass: String,
});

const logoutLink = {
  text: "Déconnexion",
  icon: "log-out",
  url: "#",
};

const authStore = useAuthStore();

function logout() {
  authStore.logout();
}
</script>

<template>
  <div class="footer-sidebar">
    <div class="padding-sidebar">
      <slot>
        <div class="wrapper-links">
          <slot> </slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-sidebar {
  border-top: solid 1px var(--surface-border);
}
</style>
