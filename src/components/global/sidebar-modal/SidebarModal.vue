<script setup>
import Overlay from "@/components/global/Overlay.vue";
import { defineProps, defineModel, watch } from "vue";

const props = defineProps({
  header: String,
});

const model = defineModel();

function closeSidebarModal() {
  model.value = false;
}
</script>

<template>
  <Transition name="sidebar-modal">
    <div class="sidebar-modal" v-if="model">
      <div class="header-sidebar-modal">
        <div class="start-header-sidebar-modal">
          <Logo size="2rem"></Logo>
          <span class="title__header-sidebar-modal">{{ header }}</span>
        </div>
        <div class="close-sidebar-modal" @click="closeSidebarModal">
          <Icon size="100%" name="x"></Icon>
        </div>
      </div>
      <div class="menu-sidebar-modal">
        <slot name="menu"></slot>
      </div>
      <div class="footer-sidebar-modal">
        <slot name="footer"></slot>
      </div>
    </div>
  </Transition>
  <Transition name="opacity">
    <Overlay @click="closeSidebarModal" v-show="model"></Overlay>
  </Transition>
</template>

<style lang="scss" scoped>
.sidebar-modal {
  max-width: 300px;
  height: 100svh;
  width: 100%;
  background-color: var(--surface-a);
  position: fixed;
  top: 0;
  left: 0;
  @include zIndex("modal");
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.header-sidebar-modal {
  border-bottom: solid 1px var(--surface-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
}

.start-header-sidebar-modal {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title__header-sidebar-modal {
  font-weight: 500;
}

.close-sidebar-modal {
  height: 2rem;
  padding: 0.3rem;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    background-color: var(--surface-border);
  }
}

.menu-sidebar-modal {
  flex: 1;
}

.footer-sidebar-modal {
}

/* TRANSITIONS */

/* SLIDE LEFT */

.sidebar-modal-enter-active,
.sidebar-modal-leave-active {
  transition: 0.7s ease;
}

.sidebar-modal-enter-from,
.sidebar-modal-leave-to {
  transform: translateX(-100vw);
}
</style>
