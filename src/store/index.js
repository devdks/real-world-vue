import { createStore } from "vuex"

export default createStore({
  state: {
    event: null,
    user: "Dav",
  },
  mutations: {
    SET_EVENT(state, event) {
      state.event = event
    },
  },
  actions: {
    setEvent({ commit }, event) {
      commit("SET_EVENT", event)
    },
  },
  modules: {},
})
