<script setup>
import InputImage from "@/components/global/inputs/input-image/InputImage.vue";
import SelectorMedia from "@/components/admin/medias/selector-media/SelectorMedia.vue";
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/global/auth";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard.vue";
import Gpt3Chat from "@/utils/useChatGptAPI";

const authStore = useAuthStore();
</script>
<template>
  <HeaderDashboard
    v-if="authStore.currentUser"
    :title="`Bonjour ${authStore.currentUser.name}`"
    subtitle="Pas d'infos pour le moment"
  />
</template>

<style lang="scss" scoped></style>
