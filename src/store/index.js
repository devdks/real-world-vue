import { createStore } from "vuex"
import EventService from "@/services/EventService"

export default createStore({
  state: {
    event: null,
    user: "Dav",
    events: [],
    totalEvents: 0,
  },
  mutations: {
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_TOTAL_EVENTS_COUNT(state, tEC) {
      state.totalEvents = tEC
    },
  },
  actions: {
    fetchEvent({ commit, getters }, id) {
      const existingEvent = getters.getEvents.find(
        (event) => event.id.toString() === id.toString()
      )
      if (existingEvent) {
        commit("SET_EVENT", existingEvent)
        return
      } else {
        return EventService.getEvent(id)
          .then((response) => {
            commit("SET_EVENT", response.data)
          })
          .catch((error) => {
            throw error
          })
      }
    },
    fetchEvents({ commit, getters }, page) {
      return EventService.getEvents(2, page)
        .then((response) => {
          commit("SET_EVENTS", response.data)
          if (getters.totalEventsCount !== response.headers["x-total-count"]) {
            commit("SET_TOTAL_EVENTS_COUNT", response.headers["x-total-count"])
          }
        })
        .catch((error) => {
          console.log(error)
          throw error
        })
    },
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit("ADD_EVENT", event)
        })
        .catch((error) => {
          console.log(error)
          throw error
        })
    },
  },
  getters: {
    totalEventsCount: (state) => {
      return state.totalEvents
    },
    getTotalPages: (state) => {
      return Math.ceil(state.totalEvents / 2)
    },
    getEvent: (state) => {
      return state.event
    },
    getEvents: (state) => {
      return state.events
    },
  },
  modules: {},
})
