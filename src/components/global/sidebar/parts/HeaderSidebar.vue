<script setup>
import { defineProps, defineEmits, computed } from "vue";
import OptionsNavbar from "../../navbar/desktop/parts/OptionsNavbar.vue";
import EndMobile from "../../navbar/mobile/parts/EndMobile.vue";

const props = defineProps({
  responsiveActive: Boolean,
  extendClass: String,
});

const emits = defineEmits(["toggleResponsive"]);

const paddingClass = computed(() => {
  return props.responsiveActive ? "page-padding" : "padding-sidebar";
});
</script>
<template>
  <div class="header-sidebar">
    <div :class="paddingClass">
      <div class="content-header-sidebar">
        <Logo size="2.5rem"></Logo>
        <div class="options-desktop" :class="extendClass" v-if="!responsiveActive">
          <OptionsNavbar />
        </div>
        <EndMobile @toggle-menu="emits('toggleResponsive')" v-if="responsiveActive"></EndMobile>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// HEADER

.header-sidebar {
  border-bottom: solid 1px var(--surface-border);
  position: relative;
  //   z-index: 999;
}

.content-header-sidebar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  position: relative;
}

.options-desktop {
  position: absolute;
  opacity: 0;
  right: 0;
  transition: opacity 0.3s ease-out;
  pointer-events: none;

  &.extend {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
