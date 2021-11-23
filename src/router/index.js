import { createRouter, createWebHistory } from "vue-router"
import EventLayout from "../views/event/Layout.vue"
import EventDetails from "../views/event/Details.vue"
import EventRegister from "../views/event/Register.vue"
import EventEdit from "../views/event/Edit.vue"
import EventList from "../views/EventList.vue"
import NotFound from "../views/NotFound.vue"
import NetworkError from "../views/NetworkError.vue"
import NProgress from "nprogress"
import EventService from "@/services/EventService.js"
import store from "../store"

function beforeEnterEventLayout(routeTo) {
  return EventService.getEvent(routeTo.params.id)
    .then((response) => {
      store.dispatch("setEvent", response.data)
    })
    .catch((error) => {
      if (error.response && error.response.status == 404) {
        console.log(error)
        return {
          replace: true,
          name: "404Resource",
          params: { resource: "event" },
        }
      } else {
        return {
          name: "NetworkError",
        }
      }
    })
}

const routes = [
  {
    path: "/",
    name: "EventList",
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    component: EventList,
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    beforeEnter: (to) => beforeEnterEventLayout(to),
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
    path: "/event/:afterEvent(.*)",
    redirect: (to) => {
      return { path: "/events/" + to.params.afterEvent }
    },
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
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
