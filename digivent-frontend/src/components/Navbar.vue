<template>
  <div class="navbar">
    <img src="@/assets/logo-icon.svg/" class="logo" alt="logo" />

    <router-link class="text" v-bind:to="'/'">Home</router-link>
    <router-link class="text" :to="'/my-questions'">Questions</router-link>
    <router-link class="text" :to="'/my-events'">My Events</router-link>
    <router-link class="text" :to="'/profile'">Profile</router-link>
    <a class="text" v-if="loggedIn === 'yes'" @click.prevent="setLoggedOut" href>Log Out</a>

    <router-link class="text" v-else v-bind:to="'/login'">Login</router-link>
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
      console.log("logout");
      localStorage.loggedIn = "no";
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("speakerId");
      EventBus.$emit("$loggedIn");
      this.$router.push({ path: "/login" });
    },
    setLoggedIn: function() {
      console.log("login");
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

<style lang="scss">
@import "@/style/_variables.scss";

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: $primary;
  a {
    color: $natural-light;
  }
}
.router-link-active {
  color: red;
}
.text {
  color: white;
}

.logo {
  width: 50px;
}
</style>