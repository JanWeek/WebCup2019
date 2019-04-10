import Vue from "vue"
import Router from "vue-router"

import Home from "../components/Home.vue"
import Auth from "../components/utils/Auth.vue"

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: "/ABSOLUTE_PATH_ONLY",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/auth",
      name: "Auth",
      component: Auth,
      props: (route) => ({ code: route.query.code })
    }
  ],
  mode: "history",
  base: "",
})

export default router