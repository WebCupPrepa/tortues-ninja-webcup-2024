<!-- This component replace input radio with a card -->
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    required: true,
  },
});

const model = defineModel();
</script>

<template>
  <div class="mask-radio">
    <input class="input-radio" type="radio" :name="name" :value="value" v-model="model" />
    <div class="card-radio">
      <div class="check-card-radio">
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
      <div class="content-card-radio">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mask-radio {
  position: relative;
}

.card-radio {
  background-color: var(--surface-card);
  height: 200px;
  border-radius: var(--border-radius-secondary);
  border: solid 2px transparent;
  transition: var(--transition-duration);
}

.input-radio {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.check-card-radio {
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
  z-index: 1;
}

.input-radio:checked + .card-radio {
  border-color: var(--primary-color);

  .check-card-radio {
    background-color: var(--primary-color);
    opacity: 1;
  }
}

.content-card-radio {
  pointer-events: none;
  height: 100%;
}
</style>
