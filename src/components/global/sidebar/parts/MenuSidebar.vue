<script setup>
import LinkSidebar from "../LinkSidebar.vue";
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  links: Array,
  extendClass: String,
});

const emit = defineEmits(["clickLink"]);
</script>

<template>
  <div class="menu-sidebar">
    <div class="padding-sidebar">
      <div class="wrapper-links-sidebar">
        <LinkSidebar
          v-for="(link, index) of links"
          :text="link.text"
          :url="link.url"
          :icon="link.icon"
          :extend-class="extendClass"
          :key="index"
          @click="emit('clickLink')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-sidebar {
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}

.wrapper-links-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
</style>
