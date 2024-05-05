import adminLayout from "@/layouts/adminLayout.vue";
import { createMetaFields, createMetaFieldsLayout } from "../metaFieldsRoute";
import SingleCollection from "@/views/admin/singleCollection.vue";
import { guardDynamicCollection } from "@/router/guards/before-enter/admin/guardDynamicCollection";
import AdminLayout from "@/layouts/adminLayout.vue";
import { authRoles } from "@/enums/authRoles";

export const adminRoutes = {
  path: "/admin",
  component: AdminLayout,
  meta: createMetaFieldsLayout({ requiresAuth: true, role: authRoles.admin }),
  children: [
    {
      path: "",
      name: "admin",
      component: () => import("@/views/admin/dashboard.vue"),
      meta: createMetaFields({
        title: "Dashboard admin",
        icon: "home",
      }),
    },
    // COLLECTIONS
    {
      path: "/admin/collections",
      name: "collections",
      component: () => import("@/views/admin/collections.vue"),
      meta: createMetaFields({
        title: "Collections",
        icon: "newspaper",
      }),
    },
    {
      path: "/admin/collections/:name",
      name: "singleCollection",
      beforeEnter: [guardDynamicCollection],
      component: () => import("@/views/admin/singleCollection.vue"),
      meta: createMetaFields({
        title: "Collection",
        icon: "newspaper",
        allowForMenu: false,
      }),
    },
    {
      path: "/admin/collections/:name/:id",
      name: "singleDoc",
      beforeEnter: [guardDynamicCollection],
      component: () => import("@/views/admin/singleDoc.vue"),
      meta: createMetaFields({
        title: "Collection",
        icon: "home",
        allowForMenu: false,
      }),
    },
    // MEDIAS
    {
      path: "/admin/medias",
      name: "medias",
      component: () => import("@/views/admin/medias.vue"),
      meta: createMetaFields({
        title: "Medias",
        icon: "image",
        allowForMenu: true,
      }),
    },

    //USERS
    {
      path: "/admin/users",
      name: "users",
      component: () => import("@/views/admin/users.vue"),
      meta: createMetaFields({
        title: "Utilisateurs",
        icon: "user",
        allowForMenu: true,
      }),
    },
    // {
    //   path: "/admin/users/:id",
    //   name: "singleUser",
    //   component: () => import("@/views/admin/userProfil.vue"),
    //   meta: createMetaFields({
    //     title: "Utilisateur",
    //     icon: "user",
    //     allowForMenu: false,
    //   }),
    // },
  ],
};
