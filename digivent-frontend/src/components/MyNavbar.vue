<template>
  <div class="navbar">
    <img src="../../public/logo.png" alt />
    <router-link v-bind:to="'/'">Home</router-link>
    <router-link v-if="loggedIn === 'yes'" v-bind:to="'/login'">Login</router-link>
    <a v-if="loggedIn === 'yes'" @click.prevent="setLoggedOut" href>Log Out</a>
    <router-link :to="'/events'">Questions</router-link>
    <router-link :to="'/events'">My Events</router-link>
    <router-link :to="'/profile'">Profile</router-link>
  </div>
</template>

<script>
import EventBus from "../eventBus";
export default {
  name: "MyNavbar",
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
      localStorage.removeItem("speakerName");
      localStorage.removeItem("speakerId");
      EventBus.$emit("$loggedIn");
      // redirect to login page
      this.$router.push({ path: "/login" });
    },
    setLoggedIn: function() {
      console.log("login");
      localStorage.loggedIn = "yes";
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
/* @import "@/style/_variables.scss"; */
.navbar {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #05386b;
  color: white;
}
router-link:visited {
  color: white;
}
img {
  width: 50px;
  height: 50px;
}
</style>
