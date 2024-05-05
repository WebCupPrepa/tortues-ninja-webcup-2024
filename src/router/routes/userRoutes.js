import userLayout from "@/layouts/userLayout.vue";
import { createMetaFields, createMetaFieldsLayout } from "../metaFieldsRoute";
import { authRoles } from "@/enums/authRoles";

export const userRoutes = {
  path: "/mon-compte",
  component: userLayout,
  meta: createMetaFieldsLayout({ requiresAuth: true, role: authRoles.user }),
  children: [
    {
      path: "/mes-commandes",
      name: "orders",
      component: () => import("@/views/user/orders.vue"),
      meta: createMetaFields({
        title: "Mes commandes",
        icon: "book",
      }),
    },
  ],
};
