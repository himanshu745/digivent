<template>
  <div>
    <h1>Log In</h1>

    <form v-on:submit.prevent="checkForm">
      <div v-if="errors.length">
        <p>
          <b>Please correct the following</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{ error }}</li>
        </ul>
      </div>
      <div>
        <label for="username">User Name</label>
        <input v-model="user.userName" type="text" name="name" id="username" />
      </div>
      <div>
        <label for="pasword">Password</label>
        <input
          v-model="user.password"
          type="text"
          name="password"
          id="password"
        />
      </div>
      <div>
        <input type="submit" value="Log In" />
      </div>
    </form>
  </div>
</template>

<script>
import EventBus from "../../eventBus.js";
export default {
  data: function() {
    return {
      user: {
        userName: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.user.userName) {
        this.errors.push("Username required");
      }
      if (!this.errors.length) {
        this.loginUser(this.user);
      }
    },
    loginUser(user) {
      this.$http.post(`${process.env.VUE_APP_API_URL}users/login`, user).then(
        function(response) {
          if (response.body.userName) {
            localStorage.loggedIn = "yes";
            localStorage.userName = user.userName;
            localStorage.userId = response.body._id;
            EventBus.$emit("$loggedIn");
            this.$router.push({ path: "/" });
          }
        },
        function(response) {
          this.errors.push(response.body);
        }
      );
    },
  },
};
</script>

<style></style>
