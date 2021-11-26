import axios from "axios"

/* const apiClient = axios.create({
  baseURL: "https://my-json-server.typicode.com/devdks/real-world-vue",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}) */

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

export default {
  getEvents(perPage, page) {
    return apiClient.get("/events?_limit=" + perPage + "&_page=" + page)
  },
  getEvent(id) {
    return apiClient.get("/events/" + id)
  },
  postEvent(event) {
    return apiClient.post("/events", event)
  },
}
