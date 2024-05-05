<script setup></script>

<template>
  <div class="skeleton"></div>
</template>

<style lang="scss" scoped>
.skeleton {
  border: solid 1px var(--surface-border);
  border-radius: var(--border-radius);
  height: 200px;
  width: 100%;
}

[data-theme="light"] {
  .skeleton {
    animation: pulseSkeletonLight 1.5s ease-out infinite;
  }
}
[data-theme="dark"] {
  .skeleton {
    animation: pulseSkeletonDark 1.5s ease-out infinite;
  }
}

@keyframes pulseSkeletonLight {
  0% {
    background-color: var(--surface-100);
  }
  50% {
    background-color: var(--surface-200);
  }
  100% {
    background-color: var(--surface-100);
  }
}

@keyframes pulseSkeletonDark {
  0% {
    background-color: var(--surface-200);
  }
  50% {
    background-color: var(--surface-300);
  }
  100% {
    background-color: var(--surface-200);
  }
}
</style>
