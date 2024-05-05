<script setup>
import { computed, defineProps, defineEmits } from "vue";
import { linkTypes } from "@/components/global/navigation/linkTypes.js";
const props = defineProps({
  text: String,
  url: String,
  icon: String,
  type: {
    default: linkTypes.router,
    type: String,
  },
});
</script>

<template>
  <a class="link external" :href="url" target="_blank" v-if="type === linkTypes.external">
    <slot>
      <span class="txt__link">{{ text }}</span>
      <div class="icon__link">
        <Icon class="icon__link" name="external-link" size="100%"></Icon>
      </div>
    </slot>
  </a>
  <div class="link preventDefault" v-else-if="type === linkTypes.prevent">
    <slot>
      <div class="icon__link" v-if="icon">
        <Icon class="icon__link" :name="icon" size="100%"></Icon>
      </div>
      <span class="txt__link">{{ text }}</span>
    </slot>
  </div>
  <router-link class="link" :to="url" v-else>
    <slot>
      <div class="icon__link" v-if="icon">
        <Icon class="icon__link" :name="icon" size="100%"></Icon>
      </div>
      <span class="txt__link">{{ text }}</span>
    </slot>
  </router-link>
</template>

<style lang="scss">
.link {
  display: inline-flex;
  align-items: center;
  position: relative;
  transition: 0.2s;
  gap: 0.5rem;
  cursor: pointer;

  .icon__link {
    height: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    color: var(--primary-color);
  }
}

.link.external {
  gap: 0.35rem;
  .icon__link {
    height: 0.8rem;
  }
}
</style>
