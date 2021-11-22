<template>
  <div class="img-area">
    <img src="../assets/404.jpg" alt="Not found image" />
    <div
      style="background-color: #181a1b !important"
      class="image-blocker"
    ></div>
  </div>
  <h1>Oops!</h1>
  <h3>The {{ resource }} you're looking for is not here.</h3>
  <button class="go-home" @click="home">Back to the home page</button>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
  },
  methods: {
    home() {
      this.$router.replace("/")
    },
  },
}
</script>

<style>
.go-home {
  color: #2c3e50;
  padding: 0.5em;
}

.img-area {
  position: relative;
  padding: 1em;
  margin-bottom: 2em;
}

img {
  display: block;
  max-width: 300px;
  max-height: 200px;
  width: auto;
  height: auto;
  margin: 2em auto -20px auto;
}

.image-blocker {
  height: 50px;
  width: 500px;
  position: absolute;
  bottom: -35px;
}
</style>
