<template>
  <div>
    <h1>Register User</h1>

    <form v-on:submit.prevent="checkForm">
      <div v-if="errors.length">
        <p>
          <b>Please correct the following this.errors:</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{error}}</li>
        </ul>
      </div>
      <div>
        <label for="username">username</label>
        <input v-model="user.userName" type="text" name="username" id="username" />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="user.email" type="text" name="email" id="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="user.password" type="text" name="password" id="password" />
      </div>
      <div>
        <label for="image">Image</label>
        <input v-model="user.image" type="img" name="image" id="image" />
      </div>
      <div>
        <input type="submit" value="Register" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "register-user",

  data: function() {
    return {
      user: {
        userName: "",
        email: "",
        password: "",
        image: ""
      },
      errors: []
    };
  },
  methods: {
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.user.userName) {
        this.errors.push("Username required");
      }
      if (!this.user.email) {
        this.errors.push("Email required");
      }
      if (!this.user.password) {
        this.errors.push("Password required");
      }
      if (!this.errors.length) {
        this.registerUser(this.user);
      }
    },
    registerUser: function(user) {
      this.$http
        .post(`${process.env.VUE_APP_API_URL}users/register`, user)
        .then(
          response => {
            if (response.body) {
              localStorage.loggedIn = true;
              localStorage.user = user.email;
              this.$emit("$loggedIn", true);
              this.$router.push({ path: "/" });
            }
          },
          response => {
            this.errors.push(response.body.message);
          }
        );
    }
  }
};
</script>

<style>
</style>