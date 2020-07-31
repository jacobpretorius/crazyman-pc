<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <a class="nav-link" href="https://github.com/jacobpretorius/crazyman-pc" target="_blank">Github</a>
    </div>
    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#nav {
  padding: 1rem;

  a {
    font-weight: bold;
    color: #86bcf3;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .nav-link{
    margin-left: 1rem;
  }
}
</style>
