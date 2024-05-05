<script setup>
import { useThemeStore } from "@/stores/global/theme";
import WrapperBtn from "@/components/guest/home/WrapperBtn.vue";

const theme = useThemeStore();

const darkText =
  "Explorez notre sélection de breuvages ensorcelants et découvrez l'extase des saveurs qui transcendent les âges. Êtes-vous prêts à embrasser le frisson de la nuit ?";

const darkTitre = "Bienvenue dans l'antre des délices nocturnes !";
</script>
<template>
  <section class="section-hero-header" ref="sectionHero">
    <div class="wave-relative">
      <img :src="`/images/vagues/vague-${theme.currentTheme}.png`" alt="" />
    </div>
    <div class="page-padding">
      <div class="container">
        <div class="hero-header-component">
          <div class="b1-hero-header">
            <h1 class="title__hero-header">
              {{
                theme.currentTheme === "dark"
                  ? darkTitre
                  : "Découvrez l'univers frais des smoothies !"
              }}
            </h1>
            <p class="txt__hero-header">
              {{
                theme.currentTheme === "dark"
                  ? darkText
                  : "Explorez notre collection de smoothies frais et succombez à une expérience gustative unique."
              }}
            </p>
            <WrapperBtn></WrapperBtn>
          </div>
          <div class="b2-hero-header">
            <div class="w-img-hero-header">
              <img
                class="img__hero-header"
                :src="`/images/gobelets/gobelet-${theme.currentTheme}.webp`"
                alt=""
                width="100%"
                height="100%"
                style="object-fit: cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-hero-header {
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: var(--primary-200);
  padding: 7rem 0rem;
}

[data-theme="dark"] {
  .section-hero-header {
    background-color: #a62b2984;
  }
}

.wave-relative {
  position: absolute;
  bottom: -1rem;
  height: 100px;
  width: 100%;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
  }
}

.hero-header-component {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 100%;

  @media only screen and (max-width: 992px) {
    & {
      grid-template-columns: 1fr;
    }
  }
}

.b1-hero-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title__hero-header {
  margin-bottom: 2rem;
}
.txt__hero-header {
  margin-bottom: 2rem;
  font-size: var(--text-lg);
}

.wrapper-btn {
  display: flex;
  gap: 1rem;
}

.b2-hero-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.w-img-hero-header {
  max-height: 600px;
  height: 100%;
  width: 100%;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.img__hero-header {
  object-fit: contain !important;
}
</style>
