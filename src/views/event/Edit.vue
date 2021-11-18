<template>
  <div class="edit-panel" v-if="event">
    <p>Edit the event here</p>
  </div>
</template>

<script>
export default {
  props: ["event"],
}
</script>

<style></style>
