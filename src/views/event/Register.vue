<template>
  <div class="register-panel" v-if="event">
    <p>Register for the event here</p>
  </div>
</template>

<script>
export default {
  props: ["event"],
}
</script>

<style></style>
