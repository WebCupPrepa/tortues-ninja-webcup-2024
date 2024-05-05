<script setup>
import { createToast } from "@/utils/createToast";
import { defineProps, ref, watch } from "vue";


const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    required: true,
  },
  reset: {
    type: Boolean,
    default: false,
  },
});

const modelValue = defineModel();

const checked = ref(false);
const isDisabled = ref(false);

function checkCheckbox() {
  isDisabled.value = true;
}

function resetCheckbox() {
  checked.value = false;
  isDisabled.value = false;
}

watch(
  () => props.reset,
  (newValue) => {
    if (newValue) {
      resetCheckbox();
    }
  }
);
</script>

<template>
  <div class="mask-checkbox">
    <input
      class="input-checkbox"
      type="checkbox"
      :name="name"
      :value="value"
      v-model="modelValue"
      :disabled="isDisabled"
      @change="checkCheckbox"
    />
    <div class="card-checkbox">
      <div class="check-card-checkbox">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-check"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <!-- CONTENT CARD -->
      <div class="content-card-checkbox">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mask-checkbox {
  position: relative;
}

.card-checkbox {
  background-color: var(--surface-card);
  height: 200px;
  border-radius: var(--border-radius-secondary);
  border: solid 2px transparent;
  transition: border-color 0.3s;
}

.input-checkbox {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.check-card-checkbox {
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: var(--transition-duration);
  pointer-events: none;
}

.input-checkbox:checked + .card-checkbox .check-card-checkbox {
  background-color: var(--primary-color);
  opacity: 1;
}

.content-card-checkbox {
  pointer-events: none;
  height: 100%;
}
</style>
