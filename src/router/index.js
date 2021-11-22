import { createRouter, createWebHistory } from "vue-router"
import EventLayout from "../views/event/Layout.vue"
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
    name: "EventLayout",
    props: true,
    component: EventLayout,
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        props: true,
        component: EventEdit,
      },
    ],
  },
  {
    path: "/about-us",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    /** Alias */
    //alias: "/about",
  },
  /** Redirect */ // <-- Best for SEO
  {
    path: "/about",
    redirect: { name: "About" },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
