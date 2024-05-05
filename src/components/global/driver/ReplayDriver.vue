<script setup></script>

<template>
  <div class="replay-driver">
    <Icon class="icon-replay" name="question" size="100%" directory="bootstrap"></Icon>
    <div class="content-replay-driver">Revoir le tutoriel</div>
  </div>
</template>

<style lang="scss" scoped>
/*______ REPLAY BTN _______*/
$radius: 0.3rem;

.replay-driver {
  position: fixed;
  bottom: 1rem;
  right: 1.3rem;
  height: 2.3rem;
  width: 2.3rem;
  background-color: var(--surface-200);
  border-radius: 50%;
  transition: var(--transition-duration);
  cursor: pointer;
  color: var(--text-color-secondary);

  @include zIndex("navbar", "behind");
  .icon-replay {
    padding: 0.3rem;
  }
}

.replay-driver:hover {
  background-color: var(--surface-300);
  color: var(--surface-100);
  border-radius: $radius;

  .content-replay-driver {
    width: 140px;
    visibility: visible;
    opacity: 100%;
  }
}

.content-replay-driver {
  //position
  position: absolute;
  top: 0;
  right: 0;
  // flex
  display: flex;
  justify-content: center;
  align-items: center;

  //other
  font-size: 0.9rem;
  width: 0px;
  height: 100%;
  white-space: nowrap;
  opacity: 0;
  overflow: hidden;
  visibility: hidden;
  background-color: inherit;
  transform: translateX(-2.2rem);
  transition: var(--transition-duration);
  //   BORDER
  border-right: solid 1px var(--surface-ground);
  border-radius: $radius;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
