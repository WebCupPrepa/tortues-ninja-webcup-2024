<script setup>
import { nextTick, onMounted, ref, defineProps } from "vue";
import { accordionMode } from "./accordionMode.js";
import { delay } from "@/utils/delay.js";

const props = defineProps({
  mode: {
    type: String,
    default: accordionMode.STICKY,
  },
  header: String,
  iconSize: {
    default: "1.2rem",
    type: String,
  },
});

const classPanelMode = `${props.mode}-mode`;
const showContent = ref(false);
const contentPanel = ref(null);
const iconPanel = ref(null);

const delayAnimation = {
  s: 0.3,
};
delayAnimation.ms = delayAnimation.s * 1000;

function togglePanel() {
  showContent.value = !showContent.value;
  contentPanel.value.style.transition = `${delayAnimation.s}s ease`;
  iconPanel.value.dom.style.transition = `${delayAnimation.s}s ease`;

  if (showContent.value) {
    openPanel();
    rotateIcon(135);
  } else {
    closePanel(delayAnimation);
    rotateIcon(0);
  }
}

async function openPanel() {
  contentPanel.value.style.display = "block";
  await delay(1);
  contentPanel.value.style.height = contentPanel.value.scrollHeight + "px";
}

async function closePanel(delayAnimation) {
  contentPanel.value.style.height = "0px";
  await delay(delayAnimation.ms);
  contentPanel.value.style.display = "none";
}

function rotateIcon(deg) {
  iconPanel.value.dom.style.transform = `rotate(${deg}deg)`;
}
</script>

<template>
  <div :class="`panel ${classPanelMode}`">
    <div class="header-panel" @click="togglePanel">
      <div class="start-header-panel">
        <slot name="header">
          <span class="txt__header-panel"> {{ header }} </span>
        </slot>
      </div>
      <Icon :size="iconSize" name="plus" ref="iconPanel" />
    </div>
    <div class="content-panel" ref="contentPanel">
      <div class="padding-content-panel">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$paddingX-accordion: 1.5rem;
$paddingY-accordion: 1rem;

@layer default {
  .panel {
    &.gap-mode {
      border-radius: var(--border-radius);
      overflow: hidden;
    }

    &.sticky-mode {
      border-bottom: solid 1px var(--surface-50);
    }
  }

  .header-panel {
    padding: $paddingY-accordion $paddingX-accordion;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--surface-200);
    cursor: pointer;

    .start-header-panel {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    * {
      color: var(--text-primary-color);
      font-weight: 500;
    }
  }

  .header {
    font-weight: 800 !important;
  }

  [data-theme="light"] {
    .header-panel {
      background-color: var(--surface-0);
    }
  }

  [data-theme="dark"] {
    .header-panel {
      background-color: var(--surface-200);
    }
  }

  .content-panel {
    background-color: var(--surface-card);
    height: 0;
    display: none;
    color: var(--text-color-secondary);
  }

  .padding-content-panel {
    padding: $paddingY-accordion $paddingX-accordion;
  }
}
</style>
