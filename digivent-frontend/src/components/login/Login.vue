<template>
  <div>
    <h1>Log In</h1>
    <div class="login">
      <button @click="userForm === true">User</button>
      <button @click="userForm === false">Speaker</button>

      <!-- <li>
        <a v-on:click="speaker" href="checKSpeaker">SPEAKER</a>
      </li>-->
    </div>

    <form v-if="userForm !== userForm" class="user" v-on:submit.prevent="checkUser">
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
        <input v-model="user.password" type="text" name="password" id="password" />
      </div>
      <div>
        <input type="submit" value="Log In" />
      </div>
    </form>
    <form v-else class="speaker" v-on:submit.prevent="checkSpeaker">
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
        <input v-model="speaker.userName" type="text" name="name" id="username" />
      </div>
      <div>
        <label for="pasword">Password</label>
        <input v-model="speaker.password" type="text" name="password" id="password" />
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
      userForm: false,
      user: {
        userName: "",
        password: ""
      },
      speaker: {
        userName: "",
        password: ""
      },
      errors: []
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
              localStorage.speakerName = speaker.userName;
              localStorage.speakerId = response.body._id;
              EventBus.$emit("$loggedIn");
              this.$router.push({ path: "/" });
            }
          },
          function(response) {
            this.errors.push(response.body);
          }
        );
    }
  }
};
</script>

<style>
</style>
