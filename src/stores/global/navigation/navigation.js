import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { routesToNavLinks } from "./routesToNavLinks";
import { guestRoutes } from "@/router/routes/guestRoutes";
import { userRoutes } from "@/router/routes/userRoutes";
import { adminRoutes } from "@/router/routes/adminRoutes";
import { authRoles } from "@/enums/authRoles";
import { useAuthStore } from "../auth";

export const useNavigationStore = defineStore("navigation", () => {
  const linksGuest = ref(routesToNavLinks(guestRoutes));
  const linksUser = ref(routesToNavLinks(userRoutes));
  const linksAdmin = ref(routesToNavLinks(adminRoutes));

  const linksUserIfAdmin = computed(() => {
    const authStore = useAuthStore();
    if (authStore.currentUser.role === authRoles.admin) {
      const adminLink = { url: "/admin", text: "ADMIN 🔐", icon: "shield-check" };
      return [...linksUser.value, adminLink];
    }
  });

  return { linksGuest, linksUser, linksAdmin, linksUserIfAdmin };
});
