import { createRouter, createWebHistory } from "vue-router"
import EventDetails from "../views/EventDetails.vue"
import EventList from "../views/EventList.vue"

const routes = [
  {
    path: "/",
    name: "EventList",
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    component: EventList,
  },
  {
    path: "/event/:id",
    name: "EventDetails",
    props: true,
    component: EventDetails,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
