<script setup>
import { ref, defineProps } from "vue";
import Panel from "./Panel.vue";
import { accordionMode } from "./accordionMode.js";

const props = defineProps({
  mode: {
    type: String,
    default: accordionMode.STICKY,
  },
});

const classAccordionMode = `${props.mode}-mode`;

/* SIMILAR primevue accordion  for add panel and add content inside panel 
https://primevue.org/accordion/ 

Only mode is addon
*/
</script>

<template>
  <div :class="`accordion ${classAccordionMode}`">
    <div class="wrapper-panel">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$paddingX-accordion: 1.5rem;
$paddingY-accordion: 1rem;

@layer default {
  .accordion {
    border: solid 1px var(--surface-border);
    border-bottom: none;
    border-radius: var(--border-radius-secondary);
    overflow: hidden;

    &.gap-mode {
      border: none;

      .wrapper-panel {
        gap: 1rem;
      }
    }

    &.sticky-mode {
      .wrapper-panel {
        gap: 0;
      }
    }
  }
  .wrapper-panel {
    display: flex;
    flex-direction: column;
  }
}
</style>
