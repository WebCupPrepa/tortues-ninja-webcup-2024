<script setup>
import { RouterLink } from "vue-router";
import Icon from "../Icon.vue";
import { computed } from "vue";
import { linkTypes } from "../navigation/linkTypes";

const props = defineProps({
  text: String,
  url: String,
  icon: String,
  extendClass: String,
  type: {
    default: linkTypes.router,
    type: String,
  },
});
</script>
<template>
  <Link class="link-sidebar" :url="url" :type="type">
    <Icon class="icon__link-sidebar" :name="icon" size="1.3rem"></Icon>
    <p :class="`txt__link-sidebar ${extendClass}`">{{ text }}</p>
  </Link>
</template>
<style lang="scss" scoped>
.link-sidebar {
  display: flex;
  gap: 1rem;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
}

.link-sidebar:hover {
  background-color: var(--surface-hover);
}

.icon__link-sidebar {
  color: var(--text-color);
}

.txt__link-sidebar,
p {
  text-wrap: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease-out;
  transition-delay: 0.1s;
  color: var(--text-color);

  &.extend {
    opacity: 1;
  }

  @include tablet {
    opacity: 1;
  }
}
</style>
