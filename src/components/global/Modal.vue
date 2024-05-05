<script setup>
import { computed, ref, defineProps, defineModel } from "vue";
import Overlay from "./Overlay.vue";
const props = defineProps({
  header: String,
  containerSize: {
    default: "sm",
    type: String,
  },
});

const customHeaderClass = props.header ? "custom" : null;

const show = defineModel("show");

function closeModal() {
  show.value = false;
}
</script>

<template>
  <Transition name="popup">
    <section class="section-modal" v-if="show">
      <div :class="`container container--${containerSize}`">
        <div class="page-padding">
          <div class="modal-component">
            <!-- header -->
            <div :class="`header-modal ${customHeaderClass} `">
              <div class="start">
                <p class="text-color font-medium">{{ header }}</p>
              </div>
              <div class="close-modal" @click="closeModal">
                <Icon size="100%" name="x"></Icon>
              </div>
            </div>
            <!-- content -->
            <div class="content-modal">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Transition>
  <Transition name="opacity">
    <Overlay class="overlay__modal" v-if="show"></Overlay>
  </Transition>
</template>

<style lang="scss" scoped>
.section-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @include zIndex("modal");
}

.modal-component {
  border-radius: var(--border-radius-secondary);
  background-color: var(--surface-card);
  position: relative;
}

// HEADER MODAL

$padding-modal-y: 1rem;
$padding-modal-x: 1.5rem;
$padding-modal: $padding-modal-y $padding-modal-x;

.header-modal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem $padding-modal-x;
  padding-bottom: 0;

  .start {
    flex: 1;
  }

  &.custom {
    padding: $padding-modal;
    border-bottom: solid 1px var(--surface-border);
  }
}

$size-close: 2.5rem;
.close-modal {
  width: $size-close;
  height: $size-close;
  color: var(--text-color-secondary);
  padding: 0.5rem;
  border-radius: 50%;
  justify-self: flex-end;
  cursor: pointer;

  &:hover {
    background-color: var(--surface-hover);
  }
}

// CONTENT MODAL

.content-modal {
  padding: $padding-modal;
  padding-bottom: calc($padding-modal-y + 0.5rem);
  overflow: auto;
  max-height: 80vh;
}

// TRANSITION modal
</style>
