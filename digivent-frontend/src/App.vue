<template>
  <div id="app">
    <MyNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import MyNavbar from "./components/MyNavbar.vue";

export default {
  name: "App",
  components: {
    MyNavbar,
  },
};
</script>

<style lang="scss">
@import "@/style/_variables.scss";

* {
  font-family: "Roboto", sans-serif;
  text-decoration: none;
  font-weight: 300;
  margin: 0;
  box-sizing: border-box;
}
</style>
