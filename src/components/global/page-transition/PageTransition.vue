<script setup></script>

<template>
  <div class="mask-page-transition" ref="maskSection">
    <div class="item item--start" ref="maskStart"></div>
    <div class="item item--mid" ref="maskMid"></div>
    <div class="item item--last" ref="maskLast"></div>
    <div class="bg-mask"></div>
  </div>
</template>

<style lang="scss" scoped>
.mask-page-transition {
  height: 100svh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  @include zIndex("overlay", "front");
}
.item {
  height: 33.33%;
  width: 100%;
  transform: translateX(-100vw);
  &.item--start {
    background-color: var(--primary-color);
  }

  &.item--mid {
    background-color: var(--primary-color);
  }
  &.item--last {
    background-color: var(--primary-color);
  }
}
</style>
