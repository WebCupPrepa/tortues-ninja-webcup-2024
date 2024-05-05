<script setup>
import { ref, onMounted } from "vue";
import { useThemeStore } from "@/stores/global/theme";

const theme = useThemeStore();
const checkFrame = ref(false);

function checkFramePing() {
  try {
    fetch(
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=Saint+Denis,Reunion+RE",
      {
        method: "GET",
      }
    ).then((response) => {
      if (response.status === 200) {
        checkFrame.value = false;
      } else {
        checkFrame.value = true;
      }
    });
  } catch (error) {
    checkFrame.value = true;
  }
}

onMounted(() => {
  checkFramePing();
});

const texts = [
  {
    darkText: "Une chauve-souris vous répondra dès que la lune se lèvera ! hello@relume.io",
    lightText:
      "Un pigeon voyageur peut-être plus rapide, mais notre boite de réception est plus fiable. tortuesninja@d-app.fr.",
  },
  {
    darkText:
      "Pour toute demande urgente ou simplement pour chuchoter dans l'obscurité, appelez-nous au :",
    lightText:
      "Pour toute demande urgente ou simplement pour papoter, vous pouvez nous appeler au :",
  },
  {
    darkText:
      "Vous pouvez également nous rendre visite à notre repaire secret : 123 Sample St, Sydney NSW 2000 AU",
    lightText:
      "Vennez nous voir, mais attention, vous risquez de ne jamais repartir ! 1 rue de la liberté, 75000 Paris",
  },
];
</script>
<template>
  <section class="section-contact">
    <div class="page-padding">
      <div class="container">
        <div class="contact-component">
          <h1 class="h1__contact">Nous contacter</h1>
          <p class="txt__contact">Besoin d'une réponse rapide ? Envoyez-nous un message !</p>
        </div>
        <div class="layout-contact">
          <div class="b1-contact">
            <div class="wrapper-items">
              <div class="item">
                <div class="icon__item">
                  <Icon size="100%" name="mail"></Icon>
                </div>
                <p class="title__item">Mail</p>
                <p class="txt__item">
                  {{ theme.currentTheme === "dark" ? texts[0].darkText : texts[0].lightText }}
                </p>
              </div>
              <div class="item">
                <div class="icon__item">
                  <Icon size="100%" name="phone"></Icon>
                </div>
                <p class="title__item">Téléphone</p>
                <p class="txt__item">
                  {{ theme.currentTheme === "dark" ? texts[1].darkText : texts[1].lightText }}
                  <br />
                  <a href="#"> 01 02 03 04 05 </a>
                </p>
              </div>
              <div class="item">
                <div class="icon__item">
                  <Icon size="100%" name="map-pinned"></Icon>
                </div>
                <p class="title__item">Adresse</p>
                <p class="txt__item">
                  {{ theme.currentTheme === "dark" ? texts[2].darkText : texts[2].lightText }}
                </p>
              </div>
            </div>
          </div>
          <div class="b2-contact">
            <div class="wrapper-map">
              <div class="item-map">
                <img :src="`images/map/${theme.currentTheme}.webp`" />
              </div>
              <iframe
                v-if="!checkFrame"
                width="100%"
                height="100%"
                style="border: 0"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                :src="
                  theme.currentTheme === 'light'
                    ? 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=Paris,France+FR'
                    : 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=Sydney,Australia+AUS'
                "
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-contact {
  padding: 5rem 0rem;
  background-color: var(--surface-section);
}
.layout-contact {
  display: flex;
  flex-direction: row-reverse;
  gap: 4rem;

  @include mobileLarge() {
    flex-direction: column-reverse;
  }
}

.txt__contact {
  margin-bottom: 2rem;
  max-width: 1000px;
}

.b1-contact {
  width: 50%;

  @include mobileLarge() {
    width: 100%;
  }
}

.b2-contact {
  width: 50%;

  @include mobileLarge() {
    width: 100%;
  }
}
.wrapper-map {
  height: 100%;
  width: 100%;
  border-radius: var(--border-radius-secondary);
  position: relative;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @include mobileLarge() {
    height: 50vh;
  }
}

.item-map {
  position: absolute;
  top: -1rem;
  right: -1.5rem;
  width: 100px;
  transform: rotate(15deg);

  img {
    width: 100%;
  }
}

.wrapper-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @include mobileLarge() {
    flex-direction: column-reverse;
  }
}

.item {
  .title__item {
    margin-bottom: 0.5rem;
    color: var(--text-color);
    font-weight: 700;
  }

  .icon__item {
    height: 30px;
    aspect-ratio: 1/1;
    background-color: var(--secondary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    padding: 0.4rem;
    margin-bottom: 1rem;
    color: var(--secondary-color-text);
  }
}
</style>
