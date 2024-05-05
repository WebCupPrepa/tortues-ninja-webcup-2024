<script setup>
import { computed, ref, defineExpose } from "vue";
import Accordion from "../../../accordion/Accordion.vue";
import Panel from "../../../accordion/Panel.vue";
import Avatar from "@/components/global/Avatar.vue";
import { useNavigationStore } from "@/stores/global/navigation/navigation";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/global/auth";
import Link from "@/components/global/navigation/Link.vue";
import { useRouter } from "vue-router";

const router = useRouter();

/* LINKS */
const navigationStore = useNavigationStore();
const { linksGuest, linksUser, linksUserIfAdmin } = storeToRefs(navigationStore);

const firstLink = computed(() => {
  return linksGuest.value[linksGuest.value[0]];
});

const lastLink = computed(() => {
  return linksGuest.value[linksGuest.value.length - 1];
});

function isFirstlink(link) {
  if (link === firstLink.value) {
    return "first-link";
  }
}

function isLastLink(link) {
  if (link === lastLink.value) {
    return "last-link";
  }
}

//expose menumobile
const dom = ref(null);
defineExpose({ dom });

/* AUTH */
const authStore = useAuthStore();
</script>
<template>
  <div class="menu-mobile" ref="dom">
    <!-- MAIN MENU -->
    <div class="main-menu-mobile">
      <template v-for="(linkGuest, index) of linksGuest">
        <!-- LINK -->
        <Link
          v-if="linkGuest.type === 'link'"
          :class="`link__menu-mobile  ${isFirstlink(linkGuest)} ${isLastLink(linkGuest)} `"
          :url="linkGuest.url"
          :text="linkGuest.text"
        />
        <!-- MEGA LINK -->
        <Accordion
          v-else-if="linkGuest.type === 'group'"
          :class="`accordion-menu-mobile ${isFirstlink(linkGuest)} ${isLastLink(linkGuest)}`"
        >
          <Panel :header="linkGuest.name" class="panel-menu-mobile">
            <Link
              v-for="linkChild of linkGuest.links"
              class="link__panel-menu-mobile"
              :url="linkChild.url"
              :text="linkChild.text"
            />
          </Panel>
        </Accordion>
      </template>
    </div>
    <!-- footer MENU -->
    <div class="footer-menu-mobile">
      <div class="wrapper-btn-menu-mobile" v-if="!authStore.currentUser">
        <button class="btn btn--secondary" @click="router.push('/connexion')">Connexion</button>
        <button text="Inscription" class="btn btn--primary" @click="router.push('/inscription')">
          Inscription
        </button>
      </div>
      <div class="wrapper-user-menu-mobile" v-else>
        <Accordion :class="`accordion-menu-mobile`">
          <Panel header="texte" class="panel-menu-mobile user-links">
            <template #header> <Avatar name="Nicolas VENEROSY" />mon compte</template>
            <Link
              v-for="(linkUser, index) of linksUserIfAdmin || linksUser"
              class="link__panel-menu-mobile"
              :text="linkUser.text"
              :url="linkUser.url"
              :icon="linkUser.icon"
              :key="index"
            />
          </Panel>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-mobile {
  position: absolute;
  top: $navbar-height-mobile;
  left: 0;
  background-color: var(--surface-ground);
  height: calc(100svh - #{$navbar-height-mobile});
  width: 100%;
  overflow: auto;
  flex-direction: column;
  gap: 2rem;
  display: flex;
}

.main-menu-mobile {
  flex: 1;
  background-color: var(--surface-a);
}

.link__menu-mobile {
  display: flex;
  padding: 1rem 2rem;
  border-top: 1px solid var(--surface-border);
  border-bottom: none;
  font-size: 0.9rem;

  &:hover {
    background-color: var(--surface-hover);
  }
}

.accordion-menu-mobile {
  border: none;
  border-radius: 0rem;
}

.panel-menu-mobile {
  padding: 0;
  font-size: 0.9rem;
  border-bottom: none;

  :deep(.header-panel) {
    padding: 1rem 2rem;
    background-color: var(--surface-ground);
    border-top: solid 1px var(--surface-border);
  }

  :deep(.padding-content-panel) {
    padding: 0 !important;
  }
}

.link__panel-menu-mobile {
  display: flex;
  padding: 0.7rem 2rem;
  font-size: 0.8rem;
}

.first-link {
  border-top: none;
}

.last-link {
  border-bottom: 1px solid var(--surface-border);
}

/* FOOTER MENU MOBILE*/

.wrapper-btn-menu-mobile {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;

  .btn {
    flex: 1;
  }
}

.panel-menu-mobile.user-links {
  :deep(.header-panel) {
    background-color: var(--secondary-color);
    color: var(--secondary-color-text);
  }
}
</style>
@/stores/global/navigation/navigation
