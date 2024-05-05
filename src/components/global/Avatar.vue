<script setup>
import { ref } from "vue";

const props = defineProps({
  url: String, // url image profil
  name: String,
  size: {
    type: String,
    default: "2",
  },
});

const { name, url, size } = props;
const initials = ref(nameToInitials(name));

function nameToInitials(name) {
  const splitName = name.split(" ");
  const firstName = splitName[0];

  // si 1 nom renvoie lettre
  if (splitName.length <= 1) {
    return firstName[0];
  } else {
    const lastName = splitName[1];
    return firstName[0] + lastName[0];
  }
}

const colors = [
  "primary",
  "blue",
  "green",
  "yellow",
  "cyan",
  "pink",
  "indigo",
  "teal",
  "orange",
  "bluegray",
  "purple",
  "red",
  "gray",
];

const colorAvatar = ref(getRandomColor(colors));

function getRandomColor(colors) {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  return randomColor;
}
</script>

<template>
  <div
    class="avatar"
    :style="`aspect-ratio: 1/1; width: ${size}rem; font-size: ${size}rem; background : var(--${colorAvatar}-500)`"
  >
    <img class="img" v-if="url" :src="url" alt="Photo de profil" />
    <p v-if="!url" class="initials uppercase">{{ initials }}</p>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  background-color: var(--surface-300);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .img {
    height: 100%;
    width: 100%;
  }

  img {
    object-fit: cover;
  }

  .initials {
    font-size: 0.4em;
    font-weight: 500;
    color: var(--surface-0);
  }
}
</style>
