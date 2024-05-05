<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import InputPassword from "@/components/global/inputs/InputPassword.vue";
import { toastType } from "@/components/global/toast/toastType.js";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/stores/global/theme";

/* PASSWORD*/
const router = useRouter();

const passwordInput = ref(null);
const passwordFromApi = ref("jaimeLeSang");
const message = reactive({ value: "", type: "" });
const themeStore = useThemeStore();

function enterWebsite() {
  if (!passwordInput.value) {
    message.value = "Le formulaire est vide";
    message.type = toastType.error;
    return;
  }

  if (passwordInput.value !== passwordFromApi.value) {
    message.value = "Le mot de passe est incorrect";
    message.type = toastType.error;
    return;
  }

  message.value = "Le mot passe est bon";
  message.type = toastType.success;
  themeStore.initAuthFromVampire();
  localStorage.setItem("introFinish", true);
  router.push("/");
}
</script>

<template>
  <div class="third-part-intro">
    <h1>Entrez dans la zone</h1>
    <form class="form-enter-intro" @submit="enterWebsite" @submit.prevent>
      <InputPassword v-model="passwordInput"></InputPassword>
      <input type="submit" value="Entrer" />
    </form>
    <div class="password-fictive">Mot de passe : {{ passwordFromApi }}</div>
    <div :class="`message-enter-intro ${message.type}`">
      {{ message.value }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* FORM */
.form-enter-intro {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.message-enter-intro {
  @include validation();
}

.password-fictive {
  margin-bottom: 1rem;
}
</style>
