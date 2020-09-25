<template>
  <div>
    <h1>Log In</h1>
    <div>
      <h2>USER</h2>
      <h2>SPEAKER</h2>
    </div>

    <form class="user" v-on:submit.prevent="checkForm">
      <div v-if="errors.length">
        <p>
          <b>Please correct the following</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{ error }}</li>
        </ul>
      </div>
      <div class="id">
        <div class="user">
          <ul>
            <a href>USER</a>
          </ul>
        </div>
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
    <form class="speaker" v-on:submit.prevent="checkForm">
      <div v-if="errors.length">
        <p>
          <b>Please correct the following</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{ error }}</li>
        </ul>
      </div>
      <div class="id">
        <div class="speaker">
          <ul>
            <a href>SPEAKER</a>
          </ul>
        </div>
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
    checkForm: function(event) {
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
        .post(`${process.env.VUE_APP_API_URL}speaker/login`, speaker)
        .then(
          function(response) {
            if (response.body.speakerName) {
              localStorage.loggedIn = "yes";
              localStorage.speakerName = speaker.speakerName;
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

<style></style>
