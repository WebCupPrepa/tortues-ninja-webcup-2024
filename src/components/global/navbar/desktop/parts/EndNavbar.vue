<script setup>
import OptionsNavbar from "./OptionsNavbar.vue";
import Avatar from "@/components/global/Avatar.vue";
import LinkList from "@/components/global/navigation/LinkList.vue";
import { useAuthStore } from "@/stores/global/auth";
import { useNavigationStore } from "@/stores/global/navigation/navigation";
import { useRouter } from "vue-router";

const navigationStore = useNavigationStore();
const authStore = useAuthStore();

const router = useRouter();
</script>

<template>
  <div class="end-navbar">
    <OptionsNavbar></OptionsNavbar>
    <!-- DONT CO -->
    <div class="wrapper-btn-end-navbar" v-if="!authStore.currentUser">
      <div class="btn btn--secondary" @click="router.push('inscription')">Inscription</div>
      <div class="btn btn--primary" @click="router.push('connexion')">Connexion</div>
    </div>
    <!-- CO -->
    <template v-if="authStore.currentUser">
      <LinkList :links="navigationStore.linksUserIfAdmin || navigationStore.linksUser">
        <Avatar :name="authStore.currentUser.name" size="2"></Avatar>
      </LinkList>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.end-navbar {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.wrapper-btn-end-navbar {
  display: flex;
  gap: 1rem;

  .btn {
    padding: 0.7rem 1.3rem;
    font-size: 0.9rem;
  }
}
</style>
@/stores/global/navigation/navigation
