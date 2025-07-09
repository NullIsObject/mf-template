import { createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from "vue-router"

const router = createRouter({
  history: createWebHistory(`${import.meta.env.BASE_URL}/page`),
  routes: [
    {
      path: "/",
      name: "root",
      children: [
        {
          path: ":childPath*",
          name: "MicroApp",
          component: () => import("../pages/wujie-app"),
        },
      ],
    },
  ],
})


export default router