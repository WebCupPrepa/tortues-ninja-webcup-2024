<script setup>
import { defineProps } from "vue";
import LinkList from "@/components/global/navigation/LinkList.vue";

const props = defineProps({
  position: String,
  links: Array,
});
</script>

<template>
  <div class="menu-navbar" :style="{ justifyContent: position }">
    <div class="wrapper-links-navbar">
      <template v-for="(link, index) of links" :key="index">
        <Link :text="link.text" :url="link.url" v-if="link.type === 'link'"></Link>
        <LinkList :name="link.name" :links="link.links" v-if="link.type === 'group'"></LinkList>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.menu-navbar {
  flex: 1;
  display: flex;

  .link {
    font-size: 0.9rem;
  }
}

.wrapper-links-navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}
</style>
