import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import authLayout from "@/layouts/authLayout.vue";
import { userRoutes } from "./routes/userRoutes";
import { guestRoutes } from "./routes/guestRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { guardAuth } from "./guards/before-each/guardAuth";
import { guardIntro } from "./guards/before-each/guardIntro";
import { guard404 } from "./guards/before-each/guard404";
import { createMetaFields } from "./metaFieldsRoute";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    guestRoutes,
    userRoutes,
    adminRoutes,
    {
      path: "/inscription",
      component: authLayout,
      children: [
        {
          path: "",
          name: "signup",
          component: () => import("@/views/auth/signup.vue"),
        },
        {
          path: "/connexion",
          name: "login",
          component: () => import("@/views/auth/login.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(guard404);
router.beforeEach(guardAuth);
// router.beforeEach(guardIntro);

export default router;
