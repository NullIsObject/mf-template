import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(
    window.$wujie?.props?.pageBaseRoute ??
      `${import.meta.env.VITE_PROJECT_NAME}/${import.meta.env.VITE_MICRO_APP_SERVER}/example-vue3`,
  ),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/example-vue3/hello-world",
      children: [
        {
          path: "example-vue3/hello-world",
          name: "hello-world",
          component: () => import("../pages/hello-world"),
        },
      ],
    },
  ],
})

export default router
