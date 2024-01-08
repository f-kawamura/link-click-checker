<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <!-- <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header> -->
  <main>
    <RouterView />
  </main>
</template>

<style>
#app {
  min-width: 500px;
  min-height: 500px;
  background: #445760;
}

body {
  margin: 0;
}

header {
  height: 20px;
  padding: 5px;
}

nav > * {
  padding-right: 5px;
}

main {
  padding: 5px;
}
</style>
