<template>
  <div class="register-panel" v-if="event">
    <p>Register for the event here</p>
    <button @click="register">Register Me!</button>
  </div>
</template>

<script>
export default {
  props: ["event"],
  inject: ["GStore"],
  methods: {
    register() {
      // Call to API
      this.GStore.flashMessage =
        "You're succesfully registered for " + this.event.title

      setTimeout(() => {
        this.GStore.flashMessage = ""
      }, 3000)
      // If registered then redirect to event details
      this.$router.push({
        name: "EventDetails",
        // params: { id: this.event.id }, <-- no need because we're inside the register page
      })
    },
  },
}
</script>

<style></style>
