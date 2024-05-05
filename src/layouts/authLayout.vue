<script setup>
import { useThemeStore } from "@/stores/global/theme";
import { onMounted, ref, watch, watchEffect } from "vue";
import { RouterView, onBeforeRouteUpdate, useRoute } from "vue-router";

const theme = useThemeStore();
</script>

<template>
  <div>
    <div class="wrapper-logo-auth">
      <Logo size="100%"></Logo>
    </div>
    <div :class="`layout-auth ${flexReverse}`">
      <div class="b1-content-auth">
        <div class="page-padding">
          <div class="content-auth">
            <router-view v-slot="{ Component }">
              <transition name="opacity" mode="out-in">
                <component :is="Component"></component>
              </transition>
            </router-view>
          </div>
        </div>
      </div>
      <div class="b2-img-auth" ref="b2">
        <img class="img__b2" :src="`/images/auth/${theme.currentTheme}.webp`" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$heightLogo: 5rem;
.wrapper-logo-auth {
  width: 5rem;
  height: $heightLogo;
  position: absolute;
  top: 1rem;
  left: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.layout-auth {
  display: flex;
  height: 100vh;
  width: 100%;

  @include tablet {
    flex-direction: column;
  }
}

.b1-content-auth {
  padding-top: $heightLogo + 5rem;
  padding-bottom: $heightLogo;
  flex: 1;
}

.b2-img-auth {
  position: relative;
  flex: 1;
  @include tablet {
    display: none;
  }
}

.img__b2 {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
