<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#nav {
  padding: 2rem;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
