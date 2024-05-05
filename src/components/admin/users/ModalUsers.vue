<script setup>
import { ref } from "vue";
import Modal from "@/components/global/Modal.vue";
import InputText from "@/components/global/inputs/InputText.vue";
import InputPassword from "@/components/global/inputs/InputPassword.vue";
import InputSelect from "@/components/global/inputs/InputSelect.vue";
import { optionsAuthRoles } from "@/enums/authRoles.js";
import { validatePassword, validateEmail } from "@/utils/validation.js";
import { createToast } from "@/utils/createToast";
import { toastType } from "@/components/global/toast/toastType";
import { useUsersStore } from "@/stores/admin/users.js";
import { storeToRefs } from "pinia";

const show = ref(false);
function openModal() {
  show.value = true;
}

const email = ref("");
const password = ref("");
const role = ref("");

async function addUser() {
  const formIsComplete = email.value && password.value && role.value;
  if (!formIsComplete) {
    createToast(toastType.error, "Formulaire incomplet ", "Merci de remplir tous les champs");
    return;
  }

  const validationEmail = validateEmail(email.value);
  if (!validationEmail.isValid) {
    createToast(validationEmail.status, validationEmail.title);
    return;
  }

  const validationPassword = validatePassword(password.value);
  if (!validationPassword.isValid) {
    createToast(validationPassword.status, validationPassword.title, validationPassword.message);
    return;
  }

  const usersStore = useUsersStore();

  usersStore.addUser({
    email: email.value,
    password: password.value,
    role: role.value,
  });
}
</script>

<template>
  <button class="btn btn--primary" @click="openModal">Ajouter un utilisateur</button>
  <Modal header="Créer un nouveau doc" v-model:show="show">
    <form class="fields-collection" @submit.prevent @submit="addUser">
      <div class="row-fields">
        <InputText label="Email" v-model="email"></InputText>
      </div>
      <div class="row-fields">
        <InputPassword v-model="password" label="Mot de passe"></InputPassword>
      </div>
      <div class="row-fields">
        <InputSelect label="Role" v-model="role" :options="optionsAuthRoles"></InputSelect>
      </div>
      <div class="wrapper-btn">
        <input type="submit" value="Ajouter" class="btn btn--primary" />
      </div>
    </form>
  </Modal>
</template>

<style lang="scss">
.wrapper-btn {
  margin-top: 2rem;
}
</style>
