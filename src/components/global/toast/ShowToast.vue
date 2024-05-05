<script setup>
import { onMounted, reactive, ref, toRef } from "vue";
import Toast from "./Toast.vue";
import { useToastsStore } from "@/stores/global/toasts";
import { storeToRefs } from "pinia";

const toastsStore = useToastsStore();

const { toasts } = storeToRefs(toastsStore);
</script>

<template>
  <div class="show-toast">
    <TransitionGroup name="toast">
      <template v-for="toast of toasts" :key="toast.id">
        <Toast
          :type="toast.type"
          :title="toast.title"
          :message="toast.message"
          :id="toast.id"
          @deleteToast="toastsStore.deleteToast"
        />
      </template>
    </TransitionGroup>
  </div>
</template>

<style lang="scss">
.show-toast {
  position: fixed;
  top: 1rem;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 0rem 1rem;
  max-width: 500px;
  @include zIndex("toast");
  @include tablet {
    right: 0rem;
  }
}

// TRANSITION

.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease-out;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateY(-1rem) scale(0.3);
  opacity: 0;
}
</style>
@/stores/global/toasts
