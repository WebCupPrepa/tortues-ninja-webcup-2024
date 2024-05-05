<script setup>
import Logo from "@/components/global/Logo.vue";
import { useThemeStore } from "@/stores/global/theme";

const theme = useThemeStore();
const url = "https://tortuesninja.lareunion.webcup.hodi.host/";
const srcDark = "https://bff.ecoindex.fr/badge/?theme=dark&url=" + url;
const srcLight = "https://bff.ecoindex.fr/badge/?theme=light&url=" + url;
const ecoUrl = "https://bff.ecoindex.fr/redirect/?url=" + url;
</script>

<template>
  <section class="section-footer">
    <div class="page-padding">
      <div class="container">
        <div class="footer-component">
          <div class="wrapper-logo">
            <Logo size="5rem"></Logo>
          </div>
          <div class="center-footer">
            <div class="title__footer">
              <i>TORTUES NINJA 2024 /</i>
            </div>
          </div>
          <a :href="ecoUrl" target="_blank">
            <div v-if="theme.currentTheme === 'dark'">
              <img :src="srcDark" alt="ecoindex" />
            </div>
            <div v-else>
              <img :src="srcLight" alt="ecoindex" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-footer {
  border: solid 1px var(--surface-border);
  padding: 0.5rem;
}

.footer-component {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
}

.title__footer {
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  font-size: 0.9rem;

  @include mobileSmall {
    display: none;
  }
}
</style>
