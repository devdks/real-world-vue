<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :class="{ hidden: page == 1 }"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        >&#60; Previous</router-link
      >
      <router-link
        v-for="pageNumber of getTotalPages"
        :key="pageNumber"
        :class="{ active: page == pageNumber }"
        :to="{ name: 'EventList', query: { page: pageNumber } }"
        >{{ pageNumber }}</router-link
      >
      <router-link
        id="page-next"
        :class="{ hidden: !hasNextPage }"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
import EventCard from "../components/EventCard.vue"
import { mapGetters } from "vuex"
import store from "../store"
// @ is an alias to /src
//import { watchEffect } from "vue"

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch("fetchEvents", parseInt(routeTo.query.page) || 1)
      .then(() => {
        next()
      })
      .catch((error) => {
        console.log(error)
        next({
          name: "NetworkError",
        })
      })
  },
  beforeRouteUpdate(routeTo) {
    return store
      .dispatch("fetchEvents", parseInt(routeTo.query.page) || 1)
      .catch((error) => {
        console.log(error)
        return {
          name: "NetworkError",
        }
      })
  },
  /* created() {
    watchEffect(() => {
      this.events = null
      EventService.getEvents(2, this.page)
        .then((response) => {
          this.events = response.data
          if (this.totalEvents == 0) {
            this.totalEvents = response.headers["x-total-count"]
          }
        })
        .catch((error) => {
          console.log(error)
          this.$router.push({
            name: "NetworkError",
          })
        })
    })
  }, */
  computed: {
    ...mapGetters({
      totalEvents: "totalEventsCount",
      events: "getEvents",
      getTotalPages: "getTotalPages",
    }),
    /* getTotalPages() {
      return Math.ceil(this.totalEvents / 2)
    }, */
    hasNextPage() {
      return this.page < this.getTotalPages
    },
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
  justify-content: space-between;
}

.pagination a {
  text-decoration: none;
  color: #2c3e50;
}

.hidden {
  visibility: hidden;
}

.active {
  border-bottom: 5px solid #2c3e50;
  padding-bottom: 0.1em;
  border-radius: 10px;
}
</style>
