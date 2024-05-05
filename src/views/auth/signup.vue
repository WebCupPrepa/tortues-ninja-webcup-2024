<script setup>
import { onMounted, ref } from "vue";
import ShowToast from "@/components/global/toast/ShowToast.vue";
import InputPassword from "@/components/global/inputs/InputPassword.vue";
import InputText from "@/components/global/inputs/InputText.vue";
import { createToast } from "@/utils/createToast";
import { useAuthStore } from "@/stores/global/auth";
import { toastType } from "@/components/global/toast/toastType";

const nameValue = ref("");
const emailValue = ref("");
const passwordValue = ref("");
const toasts = ref([]);

function getDataForm() {
  const formIsComplete = nameValue.value && emailValue.value && passwordValue.value;
  if (!formIsComplete) {
    createToast(toastType.error, "Formulaire incomplet ", "Merci de remplir tous les champs");
    return;
  }

  const validationEmail = validateEmail(emailValue.value);
  if (!validationEmail.isValid) {
    createToast(validationEmail.status, validationEmail.title);
    return;
  }

  const validationPassword = validatePassword(passwordValue.value);
  if (!validationPassword.isValid) {
    createToast(validationPassword.status, validationPassword.title, validationPassword.message);
    return;
  }

  // INSCRIPTION
  const authStore = useAuthStore();
  authStore.signup({
    email: emailValue.value,
    password: passwordValue.value,
    name: nameValue.value,
  });
  createToast(toastType.info, "Inscription en cours");
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validation = regex.test(email);

  if (!validation) {
    return {
      isValid: false,
      status: toastType.error,
      title: "Format Email non valide",
    };
  }

  return { isValid: true };
}

function validatePassword(password) {
  const minCharacters = 6;
  const validation = password.length > minCharacters ? true : false;

  if (!validation) {
    return {
      isValid: false,
      status: toastType.error,
      title: "Mot de passe trop faible",
      message: `Le mot de passe doit contenir au minimum ${minCharacters} caractères`,
    };
  }
  return {
    isValid: true,
  };
}

const authStore = useAuthStore();
</script>

<template>
  <div>
    <div class="text-center">
      <h1 class="text-center">Inscription</h1>
      <p class="mb-5">Lorem ipsum dolor sit amet.</p>
    </div>

    <form class="form-singup" @submit.prevent @submit="getDataForm">
      <div class="wrapper-inputs">
        <InputText label="Nom" v-model="nameValue"></InputText>
        <InputText label="Email *" v-model="emailValue"></InputText>
        <InputPassword label="Mot de passe *" v-model="passwordValue" />
      </div>
      <input type="submit" class="mb-3" value="Créer un compte" />
      <div class="text-center text-sm">
        <p>
          Vous avez déjà un compte ?
          <Link text="Connexion" url="/connexion"></Link>
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
