<template>
  <div id="nav">
    <div id="flashMessage" v-if="GStore.flashMessage">
      {{ GStore.flashMessage }}
    </div>
    <router-link :to="{ name: 'EventList' }">Events</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  inject: ["GStore"],
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h4 {
  font-size: 20px;
}

@keyframes yellowfade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}

@keyframes bluefade {
  from {
    background-color: #2c3e50;
  }
  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 4s;
  padding: 1em;
}
</style>
