<template>
  <div>
    <h1>Log In</h1>
    <div class="login">
      <button class="login_button" @click="show = true">Guest Login</button>

      <button class="login_button" @click="show = false">Admin Login</button>
    </div>

    <form v-if="show" class="user" v-on:submit.prevent="checkUser">
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
        <input type="submit" value="Login" />
      </div>
      <div class="new-account">
        <router-link v-bind:to="{ name: 'register-user' }"
          >or Create Account
        </router-link>
      </div>
    </form>
    <form v-else v-on:submit.prevent="checkSpeaker">
      <div v-if="errors.length">
        <p>
          <b>Please correct the following</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{ error }}</li>
        </ul>
      </div>

      <div>
        <label for="username">Speaker Name</label>
        <input
          v-model="speaker.userName"
          type="text"
          name="name"
          id="username"
        />
      </div>
      <div>
        <label for="pasword">Password</label>
        <input
          v-model="speaker.password"
          type="text"
          name="password"
          id="password"
        />
      </div>
      <div>
        <input type="submit" value="Login" />
      </div>
      <div class="new-account">
        <router-link v-bind:to="{ name: 'register-speaker' }"
          >or Create Account
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import EventBus from "../../eventBus.js";
export default {
  name: "login",

  data: function() {
    return {
      show: true,
      user: {
        userName: "",
        password: "",
      },
      speaker: {
        userName: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    checkUser: function(event) {
      console.log("user");
      event.preventDefault();
      this.errors = [];
      if (!this.user.userName) {
        this.errors.push("Username required");
      }
      if (!this.errors.length) {
        this.loginUser(this.user);
      }
    },
    checkSpeaker: function(event) {
      console.log("speaker");
      event.preventDefault();
      this.errors = [];
      if (!this.speaker.userName) {
        this.errors.push("Username required");
      }
      if (!this.errors.length) {
        this.loginSpeaker(this.speaker);
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

    loginSpeaker(speaker) {
      this.$http
        .post(`${process.env.VUE_APP_API_URL}speakers/login`, speaker)
        .then(
          function(response) {
            if (response.body.userName) {
              localStorage.loggedIn = "yes";
              localStorage.userName = speaker.userName;
              localStorage.speakerId = response.body._id;
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

<style lang="scss" scoped>
@import "@/style/_variables.scss";
h1 {
  padding-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  @include heading-large;
  color: black;
}
.login {
  padding: 2rem;
  display: flex;
  justify-content: center;
  padding: 2rem;
}
.login_button {
  background: rgba(0, 0, 0, 0);
  border: 0;
  padding: 1rem;
  margin: 1rem;
  font-size: 23px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;
  text-decoration-style: solid;
}
form {
  display: inline;
  text-align: center;
}
label {
  color: #bdbdbd;
  font-size: 15px;
}
input {
  display: flex;
  justify-items: center;
  width: 80%;
}
</style>
