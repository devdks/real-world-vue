import { createRouter, createWebHistory } from "vue-router"
import EventDetails from "../views/event/Details.vue"
import EventRegister from "../views/event/Register.vue"
import EventEdit from "../views/event/Edit.vue"
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
    path: "/event/:id/register",
    name: "EventRegister",
    props: true,
    component: EventRegister,
  },
  {
    path: "/event/:id/edit",
    name: "EventEdit",
    props: true,
    component: EventEdit,
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
