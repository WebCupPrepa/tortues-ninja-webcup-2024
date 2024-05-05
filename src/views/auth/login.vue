<script setup>
import { onMounted, ref } from "vue";
import InputPassword from "@/components/global/inputs/InputPassword.vue";
import InputText from "@/components/global/inputs/InputText.vue";
import { createToast } from "@/utils/createToast";
import { useAuthStore } from "@/stores/global/auth";
import { toastType } from "@/components/global/toast/toastType";
import { useRouter } from "vue-router";
import { validatePassword, validateEmail } from "@/utils/validation.js";

const emailValue = ref("");
const passwordValue = ref("");

async function getDataForm() {
  const formIsComplete = emailValue.value && passwordValue.value;
  if (!formIsComplete) {
    createToast(
      toastType.error,
      "Formulaire incomplet ",
      "Merci de remplir tous les champs"
    );
    return;
  }

  const validationEmail = validateEmail(emailValue.value);
  if (!validationEmail.isValid) {
    createToast(validationEmail.status, validationEmail.title);
    return;
  }

  const validationPassword = validatePassword(passwordValue.value);
  if (!validationPassword.isValid) {
    createToast(
      validationPassword.status,
      validationPassword.title,
      validationPassword.message
    );
    return;
  }

  //  CONNEXION
  const authStore = useAuthStore();
  authStore.loginWithFirebase(emailValue.value, passwordValue.value);
  createToast(toastType.info, "Connexion en cours");

  resetForm();
}

// TEST CO

function resetForm() {
  emailValue.value = "";
  passwordValue.value = "";
}

const authStore = useAuthStore();
</script>

<template>
  <div>
    <div class="text-center">
      <h1 class="text-center">Connexion</h1>
    </div>

    <form class="form-login" @submit="getDataForm" @submit.prevent>
      <div class="wrapper-inputs">
        <InputText label="Email *" v-model="emailValue"></InputText>
        <InputPassword label="Mot de passe *" v-model="passwordValue" />
      </div>
      <input type="submit" class="mb-3" value="Se connecter" />
      <div class="text-center text-sm">
        <p>
          Vous n'avez pas de compte ? Inscrivez-vous !
          <Link text="Inscription" url="/inscription"></Link>
        </p>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-inputs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
</style>
