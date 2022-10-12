import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/ShowDistro.vue"),
    },
    {
      path: "/journal",
      name: "journal",
      component: () => import("@/views/JournalPage.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/SettingPage.vue"),
    },
  ],
});

export default router;
