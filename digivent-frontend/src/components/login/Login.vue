<template>
  <div>
    <h1>Log In</h1>
    <div class="login">
      <button class="login_button" @click="show = true">Guest Login</button>

      <button class="login_button" @click="show = false">Admin Login</button>
    </div>
    <v-form v-if="show" class="user" v-on:submit.prevent="checkUser">
      <div v-if="errors.length">
        <p>
          <b>Please correct the following</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{ error }}</li>
        </ul>
      </div>
      <v-text-field v-model="user.userName" :counter="10" label="User Name" id="username" required></v-text-field>
      <!-- <div>
        <label for="username">User Name</label>
        <input v-model="user.userName" type="text" name="name" id="username" />
      </div>-->
      <v-text-field v-model="user.password" :type="'password'" name="password" label="Password"></v-text-field>

      <!-- <div>
        <label for="pasword">Password</label>
        <input
          v-model="user.password"
          type="text"
          name="password"
          id="password"
        />
      </div>-->
      <!-- <input class="login-button" type="submit" value="Login" /> -->
      <v-row justify="center">
        <v-btn
          class="`d-flex align-center flex-column mb-6` login-button"
          type="submit"
          color="#5cdb95"
          elevation="18"
          align="center"
          justify="space-around"
          width="290px"
          dark
        >Login</v-btn>
      </v-row>

      <div class="new-account">
        <router-link v-bind:to="{ name: 'register-user' }">
          or
          <span class="create">Create Account</span>
        </router-link>
      </div>
    </v-form>
    <form v-else v-on:submit.prevent="checkSpeaker">
      <div v-if="errors.length">
        <p>
          <b>Please correct the following</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{ error }}</li>
        </ul>
      </div>

      <v-text-field
        v-model="speaker.password"
        :counter="10"
        label="User Name"
        id="username"
        required
      ></v-text-field>
      <!-- <div>
        <label for="username">User Name</label>
        <input
          v-model="speaker.userName"
          type="text"
          name="name"
          id="username"
        />
      </div>-->

      <v-text-field v-model="speaker.password" :type="'password'" name="password" label="Password"></v-text-field>

      <!-- <div>
        <label for="pasword">Password</label>
        <input
          v-model="speaker.password"
          type="text"
          name="password"
          id="password"
        />
      </div>-->
      <v-row justify="center">
        <v-btn
          class="`d-flex align-center flex-column mb-6`login-button"
          type="submit"
          color="#5cdb95"
          text="white"
        >Login</v-btn>
      </v-row>

      <!-- <input class="login-button" type="submit" value="Login" /> -->
      <div class="new-account">
        <router-link v-bind:to="{ name: 'register-speaker' }">
          or
          <span class="create">Create Account</span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import EventBus from "../../eventBus.js";
export default {
  name: "login",

  data: function () {
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
    checkUser: function (event) {
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
    checkSpeaker: function (event) {
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
        function (response) {
          if (response.body.userName) {
            localStorage.loggedIn = "yes";
            localStorage.userName = user.userName;
            localStorage.userId = response.body._id;
            EventBus.$emit("$loggedIn");
            this.$router.push({ path: "/" });
          }
        },
        function (response) {
          this.errors.push(response.body);
        }
      );
    },

    loginSpeaker(speaker) {
      this.$http
        .post(`${process.env.VUE_APP_API_URL}speakers/login`, speaker)
        .then(
          function (response) {
            if (response.body.userName) {
              localStorage.loggedIn = "yes";
              localStorage.userName = speaker.userName;
              localStorage.speakerId = response.body._id;
              EventBus.$emit("$loggedIn");
              this.$router.push({ path: "/" });
            }
          },
          function (response) {
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
  width: 9rem;
  border-bottom: solid 4px #bdbdbd;
  text-decoration-style: solid;
}
.login_button:hover {
  border-bottom: solid 4px #5cdb95;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.19);
  font-weight: 500;
}
form {
  display: inline;
  text-align: center;
}
label {
  color: #bdbdbd;
  font-size: 15px;
  padding-left: 2rem;
  width: 80%;
  display: flex;
}
input {
  display: flex;
  width: 80%;
  width: 80%;
  margin-left: 2rem;
  margin-top: 0.5rem;
  padding: 15px;
  border: 0;
  border-bottom: solid 2px #bdbdbd;
  margin-bottom: 0.3rem;
}

.login-button {
  display: flex;
  justify-content: center;
}

.new-account {
  margin-top: 5rem;
}
.create {
  color: #5cdb95;
}
.input-box {
  margin: 0 100px;
}
</style>
