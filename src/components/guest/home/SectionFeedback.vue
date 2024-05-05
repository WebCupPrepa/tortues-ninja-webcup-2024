<script setup>
import Avatar from "@/components/global/Avatar.vue";
import Icon from "@/components/global/Icon.vue";
import { useThemeStore } from "@/stores/global/theme";

const theme = useThemeStore();

const texts = [
  {
    darkName: "Vladimir Dracul",
    lightName: "Sophie Martin",
    darkText:
      "Ces smoothies vampiriques sont une véritable bénédiction pour mes nuits interminables.",
    lightText:
      "Les smoothies de ce site sont incroyables ! J'adore leur fraîcheur et leurs saveurs uniques.",
  },
  {
    darkName: "Carmilla Nocturne",
    lightName: "Julie Leroy",
    darkText:
      "Je suis tombée sous le charme de ces délices sombres dès la première gorgée. Leur puissance est incomparable et leur goût exquis me transporte dans une extase éternelle.",
    lightText:
      "Les smoothies locaux sont une belle découverte pour moi. J'apprécie vraiment le côté frais et naturel de ces boissons. Je recommande vivement !",
  },
];
</script>

<template>
  <section class="section-feedback">
    <div class="page-padding">
      <div class="container">
        <div class="feedback-component">
          <h1 class="title__feedback">Avis clients</h1>
          <div class="wrapper-cards-feedback">
            <div class="card-feedback">
              <!-- header -->
              <div class="header-card">
                <div class="start">
                  <Avatar size="2" url="/demo/galleria1.jpg" name="Nicolas venerosy"></Avatar>
                </div>
                <div class="end">
                  <p class="name">
                    {{ theme.currentTheme === "dark" ? texts[0].darkName : texts[0].lightName }}
                  </p>
                  <p class="stars">
                    <Icon size="1rem" directory="bootstrap" name="star-fill"></Icon>
                    <Icon size="1rem" directory="bootstrap" name="star-fill"></Icon>
                    <Icon size="1rem" directory="bootstrap" name="star-fill"></Icon>
                    <Icon size="1rem" directory="bootstrap" name="star-fill"></Icon>
                    <Icon size="1rem" directory="bootstrap" name="star"></Icon>
                  </p>
                </div>
              </div>
              <!-- content -->
              <div class="content-card">
                <p v-if="theme.currentTheme === 'dark'">
                  {{ texts[0].darkText }}
                </p>
                <p v-else>{{ texts[0].lightText }}</p>
              </div>
            </div>
            <div class="card-feedback">
              <!-- header -->
              <div class="header-card">
                <div class="start">
                  <Avatar size="2" name="Nicolas venerosy"></Avatar>
                </div>
                <div class="end">
                  <p class="name">
                    {{ theme.currentTheme === "dark" ? texts[1].darkName : texts[1].lightName }}
                  </p>
                  <p class="stars">
                    <Icon size="1rem" directory="bootstrap" name="star-fill"></Icon>
                    <Icon size="1rem" directory="bootstrap" name="star-fill"></Icon>
                    <Icon size="1rem" directory="bootstrap" name="star-fill"></Icon>
                    <Icon size="1rem" directory="bootstrap" name="star-fill"></Icon>
                    <Icon size="1rem" directory="bootstrap" name="star"></Icon>
                  </p>
                </div>
              </div>
              <!-- content -->
              <div class="content-card">
                <p v-if="theme.currentTheme === 'dark'">
                  {{ texts[1].darkText }}
                </p>
                <p v-else>{{ texts[1].lightText }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-feedback {
  padding: 6rem 0rem;
  background-color: var(--surface-section);
}

.title__feedback {
  text-align: center;
  margin-bottom: 3rem;
}

.wrapper-cards-feedback {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.card-feedback {
  background-color: var(--surface-50);
  border-radius: var(--border-radius-secondary);
  padding: 1.5rem;
  flex: 1;
}

[data-theme="dark"] {
  .card-feedback {
    background-color: var(--surface-200);
  }
}

.header-card {
  display: flex;
  gap: 1rem;
  text-align: start;
  margin-bottom: 1rem;
  align-items: center;

  .end {
    display: flex;
    flex-direction: column;

    .name {
      font-weight: 600;
    }

    .stars {
      display: flex;
      gap: 0.5rem;
    }
  }
}
</style>
