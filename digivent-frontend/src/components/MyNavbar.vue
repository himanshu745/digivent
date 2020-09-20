<template>
  <div class="nav">
    <router-link :to="'/events'">HOME</router-link>
    <router-link :to="'/events'">QUESTION</router-link>
    <router-link :to="'/events'">MY EVENTS</router-link>
    <router-link :to="'/events'">PROFILE</router-link>
  </div>
</template>

<script>
export default {
  name: "MyNavbar",
};
</script>

<style>
.nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>