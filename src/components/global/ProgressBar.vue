<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "primary",
  },
  percent: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
    default: "Progression: ",
  },
});
</script>

<template>
  <div class="progress-bar">
    <div class="header-progress-bar">
      <p class="text-sm text-color">{{ text }}</p>
      <p class="font-semibold text-sm text-color">{{ percent }}%</p>
    </div>
    <div class="bar">
      <div class="content" :style="`width : ${percent}%; background: var(--${color}-400)`"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bar {
  border-radius: var(--border-radius);
  height: 8px;
  position: relative;
  overflow: hidden;
  background-color: var(--surface-section);

  .header-progress-bar {
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: space-between;
  }

  .content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: var(--border-radius);
  }
}
</style>
