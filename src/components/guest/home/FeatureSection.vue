<script setup>
import { nextTick, onMounted, onUnmounted, ref, watchEffect } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useThemeStore } from "@/stores/global/theme";

const theme = useThemeStore();

const texts = [
  {
    darkText:
      "Nous utilisons uniquement du sang frais et pur, récolté avec soin pour garantir une expérience sensorielle inoubliable.",
    lightText:
      "Nous privilégions les fruits et les ingrédients locaux pour garantir fraicheur et qualité dans chaque gorgée. Nous travaillons avec des producteurs locaux pour vous offrir le meilleur de la nature.",
  },
  {
    darkText:
      "Chaque smoothie est préparé selon des recettes ancestrales, transmises de génération en génération, pour vous offrir un plaisir immortel à chaque gorgée.",
    lightText:
      "Chaque smoothie est préparé avec une attention particulière aux détails, selon des recettes artisanales qui mettent en valeur le meilleur de chaque ingrédient.",
  },
  {
    darkText:
      "Nos smoothies sont chargés d'énergie vampirique, vous offrant la force et la vitalité nécessaires pour dominer la nuit éternelle.",
    lightText:
      "Nos smoothies sont non seulement délicieux, mais aussi bons pour vous. Ils sont riches en nutriments essentiels et parfaitement équilibrés pour vous aider à rester en forme et énergisé tout au long de la journée.",
  },
];

const items = ref([
  {
    title: theme.currentTheme === "dark" ? "Sang frais et pur" : "Fruits 100% locaux",
    text: theme.currentTheme === "dark" ? texts[0].darkText : texts[0].lightText,
  },
  {
    title: theme.currentTheme === "dark" ? "Recettes ancestrales" : "Recettes artisanales",
    text: theme.currentTheme === "dark" ? texts[1].darkText : texts[1].lightText,
  },
  {
    title: theme.currentTheme === "dark" ? "Énergie éternelle :" : "Options saines et délicieuses",
    text: theme.currentTheme === "dark" ? texts[2].darkText : texts[2].lightText,
  },
]);

const main = ref(null);
let ctx = null;

watchEffect(() => {
  items.value = items.value.map((item, index) => {
    return {
      ...item,
      text: theme.currentTheme === "dark" ? texts[index].darkText : texts[index].lightText,
    };
  });
});

onMounted(() => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  ctx = gsap.context(() => {
    const barsSelector = document.querySelectorAll(".left-bar__item-b1-feature");
    const items = gsap.utils.toArray(".item-b1-feature");

    gsap.from(barsSelector, {
      scrollTrigger: {
        start: "top 50%",
        trigger: ".item-b1-feature",
      },
      width: "100%",
      background: "var(--surface-ground)",
      duration: 0.5,
      stagger: 0.25,
    });
  }, main.value);
});

onUnmounted(() => {
  ScrollTrigger.killAll();
  ctx.revert();
});
</script>

<template>
  <section class="section-feature" ref="main">
    <div class="page-padding">
      <div class="container">
        <div class="layout-2b-feature">
          <div class="b1-feature">
            <div class="wrapper-items-b1-feature">
              <!-- start ITEMS -->
              <div v-for="(item, index) of items" :key="index" class="item-b1-feature">
                <h3 class="subtitle title__item-b1-feature">{{ item.title }}</h3>
                <p class="txt__item-b1-feature">
                  {{ item.text }}
                </p>
                <div class="left-bar__item-b1-feature"></div>
              </div>
              <!-- end ITEMS -->
            </div>
          </div>
          <div class="b2-feature">
            <div class="wrapper-img-b2-feature">
              <img :src="`/images/features-home/${theme.currentTheme}.webp`" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-feature {
  padding: 5rem 0rem;
}

.layout-2b-feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;

  @include tablet {
    grid-template-columns: 1fr;
  }
}

.wrapper-items-b1-feature {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-b1-feature {
  padding: 1rem;
  position: relative;
}

.left-bar__item-b1-feature {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--surface-ground);
  border-right: solid 5px var(--surface-border);
}

.wrapper-btn-b1-feature {
  display: flex;
  gap: 1rem;
}

.b2-feature {
  display: flex;
  justify-content: end;
  align-items: center;

  @include tablet {
    justify-content: center;
  }
}
.wrapper-img-b2-feature {
  overflow: hidden;
  border-radius: var(--border-radius-secondary);
}
</style>
