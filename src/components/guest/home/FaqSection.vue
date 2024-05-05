<script setup>
import Accordion from "@/components/global/accordion/Accordion.vue";
import Panel from "@/components/global/accordion/Panel.vue";
import WrapperBtn from "@/components/guest/home/WrapperBtn.vue";

import { useThemeStore } from "@/stores/global/theme";

const theme = useThemeStore();

const texts = [
  {
    darkHeader: "Quels sont les ingrédients utilisés dans vos smoothies vampiriques ?",
    lightHeader: "Quels sont les ingrédients utilisés dans vos smoothies ?",
    darkText:
      "Nos smoothies vampiriques contiennent du sang synthétique, des extraits d'ail, des baies noires et d'autres ingrédients spéciaux pour répondre aux besoins des vampires.",
    lightText:
      "Nos smoothies contiennent des fruits frais, des légumes, des jus naturels et des suppléments énergétiques.",
  },
  {
    darkHeader: "Proposez-vous des options sans lumière du jour ?",
    lightHeader: "Proposez-vous des options végétaliennes ou sans gluten ?",
    darkText:
      "Oui, nous proposons des options sans lumière du jour pour nos smoothies vampiriques.",
    lightText: "Oui, nous proposons des options végétaliennes et sans gluten pour nos smoothies.",
  },
  {
    darkHeader:
      "Comment puis-je conserver mes smoothies pour qu'ils gardent leur puissance nocturne ?",
    lightHeader:
      "Comment puis-je conserver mes smoothies pour qu'ils restent frais le plus longtemps possible ?",
    darkText:
      "Pour préserver leur puissance nocturne, conservez vos smoothies vampiriques dans un endroit frais et sombre, à l'abri de la lumière directe du soleil.",
    lightText:
      "Pour une fraîcheur maximale, conservez vos smoothies au réfrigérateur et consommez-les dans les 2-3 jours suivant la livraison.",
  },
  {
    darkHeader: "Quelle est la durée de vie de vos smoothies dans l'obscurité ?",
    lightHeader: "Quelle est la durée de livraison de mes smoothies ?",
    darkText:
      "Nos smoothies vampiriques peuvent conserver leur qualité dans l'obscurité pendant environ 5-7 jours.",
    lightText: "La durée de livraison est de 2-3 jours ouvrables après la commande.",
  },
  {
    darkHeader: "Offrez-vous des abonnements pour les noctambules ?",
    lightHeader: "Offrez-vous des abonnements ou des packs spéciaux pour les clients réguliers ?",
    darkText:
      "Oui, nous offrons des abonnements spéciaux pour les noctambules afin qu'ils puissent profiter de nos smoothies vampiriques à tout moment de la nuit.",
    lightText:
      "Oui, nous offrons des abonnements mensuels et des packs spéciaux pour nos clients réguliers.",
  },
];
const introText =
  "Découvrez les réponses aux questions les plus courantes sur nos smoothies et notre service !";
</script>

<template>
  <section class="section-faq">
    <div class="page-padding">
      <div class="container">
        <div class="layout-2b-faq">
          <div class="b1-faq">
            <h2 class="h2__b1-faq">Questions posées</h2>
            <p class="txt__b1-faq">
              {{ introText }}
            </p>
            <WrapperBtn></WrapperBtn>
          </div>
          <div class="b2-faq">
            <Accordion mode="sticky">
              <Panel
                v-for="(text, index) in texts"
                :key="index"
                :header="theme.currentTheme === 'dark' ? text.darkHeader : text.lightHeader"
                mode="sticky"
              >
                {{ theme.currentTheme === "dark" ? text.darkText : text.lightText }}
              </Panel>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-faq {
  padding: 5rem 0rem;
}

.layout-2b-faq {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media only screen and (max-width: 769px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

/* B1*/

.h2__b1-faq {
  margin-bottom: 1.5rem;
}

.txt__b1-faq {
  margin-bottom: 1.5rem;
}

.wrapper-btn-b1-faq {
  display: flex;
  gap: 1rem;
}

/* B2*/
</style>
