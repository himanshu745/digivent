<template>
  <div>
    <h1>Register Speaker</h1>

    <form v-on:submit.prevent="checkForm">
      <div v-if="errors.length">
        <p>
          <b>Please correct the following this.errors:</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{ error }}</li>
        </ul>
      </div>
      <div>
        <label for="firstname">First Name</label>
        <input
          v-model="speaker.firstName"
          type="text"
          name="firstname"
          id="firstname"
        />
      </div>
      <div>
        <label for="lastname">Last Name</label>
        <input
          v-model="speaker.lastName"
          type="text"
          name="lastname"
          id="lastname"
        />
      </div>
      <div>
        <label for="username">username</label>
        <input
          v-model="speaker.userName"
          type="text"
          name="username"
          id="username"
        />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="speaker.email" type="text" name="email" id="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          v-model="speaker.password"
          type="text"
          name="password"
          id="password"
        />
      </div>
      <div>
        <label for="desc">Description</label>
        <input
          v-model="speaker.description"
          type="text"
          name="desc"
          id="desc"
        />
      </div>
      <div>
        <label for="image">Image</label>
        <input v-model="speaker.image" type="img" name="image" id="image" />
      </div>
      <div>
        <input type="submit" value="Register" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "register-speaker",
  data: function() {
    return {
      speaker: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        description: "",
        image: "",
      },
      errors: [],
    };
  },
  methods: {
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.speaker.firstName) {
        this.errors.push("First name required!");
      }
      if (!this.speaker.lastName) {
        this.errors.push("Last name required");
      }
      if (!this.speaker.userName) {
        this.errors.push("Username required");
      }
      if (!this.speaker.email) {
        this.errors.push("Email required");
      }
      if (!this.speaker.password) {
        this.errors.push("Password required");
      }
      if (!this.speaker.description) {
        this.errors.push("Description required");
      }
      if (!this.errors.length) {
        this.registerUser(this.speaker);
      }
    },
    registerUser: function(speaker) {
      this.$http
        .post(`${process.env.VUE_APP_API_URL}speakers/register`, speaker)
        .then(
          (response) => {
            if (response.body) {
              localStorage.loggedIn = true;
              localStorage.speaker = speaker.email;
              this.$emit("$loggedIn", true);
              this.$router.push({ path: "/" });
            }
          },
          (response) => {
            this.errors.push(response.body.message);
          }
        );
    },
  },
};
</script>

<style></style>
