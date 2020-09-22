<template>
  <div class="navbar">
    <router-link v-bind:to="'/'">HOME</router-link>
    <router-link v-if="loggedIn === 'yes'" v-bind:to="'/login'">Login</router-link>
    <a v-if="loggedIn === 'yes'" @click.prevent="setLoggedOut" href>Log Out</a>
    <router-link :to="'/events'">QUESTION</router-link>
    <router-link :to="'/events'">MY EVENTS</router-link>
    <router-link :to="'/events'">PROFILE</router-link>
  </div>
</template>

<script>
import EventBus from "../eventBus";
export default {
  name: "navbar",
  data: function() {
    return {
      loggedIn: "no",
      userName: ""
    };
  },
  methods: {
    setLoggedOut: function() {
      localStorage.loggedIn = "no";
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      EventBus.$emit("$loggedIn");
      // redirect to login page
      this.$router.push({ path: "/login" });
    },
    setLoggedIn: function() {
      console.log("login");
      localStorage.loggedIn = "yes";
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      this.loggedIn = localStorage.loggedIn;
      this.userName = localStorage.userName;
    }
  },
  mounted() {
    this.loggedIn = localStorage.getItem("loggedIn");
    this.userName = localStorage.getItem("userName");
    EventBus.$on("$loggedIn", this.setLoggedIn);
  }
};
</script>

<style>
.nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>