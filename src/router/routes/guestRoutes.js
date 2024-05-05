// import guestLayout from "@/layouts/guestLayout.vue";
import guestLayout from "@/layouts/guestLayout.vue";
import { createMetaFields } from "../metaFieldsRoute";

const groups = {
  blog: "Le blog",
  competences: "Les compétences",
};

export const guestRoutes = {
  path: "/",
  component: guestLayout,
  children: [
    {
      path: "",
      name: "home",
      component: () => import("@/views/guest/home.vue"),
      meta: createMetaFields({
        title: "Accueil",
        allowForMenu: true,
      }),
    },
    {
      path: "/bienvenue",
      name: "welcome",
      component: () => import("@/views/guest/welcome.vue"),
      meta: createMetaFields({
        title: "Intro",
        allowForMenu: false,
      }),
    },
    {
      path: "/smoothies",
      name: "smoothies",
      component: () => import("@/views/guest/smoothies.vue"),
      meta: createMetaFields({
        title: "Smoothies",
        allowForMenu: true,
      }),
    },
    {
      path: "/smoothie-perso",
      name: "smoothiesPerso",
      component: () => import("@/views/guest/customSmoothies.vue"),
      meta: createMetaFields({
        title: "Smoothie perso",
        allowForMenu: true,
      }),
    },
  ],
};
