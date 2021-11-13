<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/shared/Navbar";

export default {
  components: {
    NavBar,
  },
};
</script>
