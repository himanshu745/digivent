<template>
  <div class="wrap">
    <div class="profile">
    <v-layout column v-if="isSpeaker === 'yes'" class="speaker">
      <div class="top">
        <h1>Speaker Profile</h1>
        <img :src="speaker.image" />
      </div>
      <v-flex class="profile-box">
        <v-row>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>First Name</v-list-item-subtitle>
              <v-list-item-title>{{ speaker.firstName }}</v-list-item-title>
              <hr />
            </v-list-item-content>
          </v-list-item>
        </v-row>
        <v-row>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Last Name</v-list-item-subtitle>
              <v-list-item-title>{{ speaker.lastName }}</v-list-item-title>
              <hr />
            </v-list-item-content>
          </v-list-item>
        </v-row>
        <v-row>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Username</v-list-item-subtitle>
              <v-list-item-title>{{ speaker.userName }}</v-list-item-title>
              <hr />
            </v-list-item-content>
          </v-list-item>
        </v-row>
        <v-row>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Email</v-list-item-subtitle>
              <v-list-item-title>{{ speaker.email }}</v-list-item-title>
              <hr />
            </v-list-item-content>
          </v-list-item>
        </v-row>
        <v-row>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Description</v-list-item-subtitle>
              <v-list-item-title>{{ speaker.description }}</v-list-item-title>
              <hr />
            </v-list-item-content>
          </v-list-item>
        </v-row>
      </v-flex>
      <a v-if="loggedIn === 'yes'" @click.prevent="setLoggedOut">Log Out</a>
    </v-layout>

    <v-layout v-else class="user">
      <div class="top">
        <h1>User Profile</h1>
        <img :src="user.image" />
      </div>
      <v-flex class="profile-box">
        <v-row>
          <v-list-item-content>
            <v-list-item-subtitle>Username</v-list-item-subtitle>
            <v-list-item-title>{{ user.userName }}</v-list-item-title>
            <hr />
          </v-list-item-content>
        </v-row>
        <v-row>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Email</v-list-item-subtitle>
              <v-list-item-title>{{ user.email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-row>
      </v-flex>
      <a v-if="loggedIn === 'yes'" @click.prevent="setLoggedOut">Log Out</a>
    </v-layout>
    </div>
  </div>
</template>

<script>
import EventBus from "../../eventBus.js";

export default {
  name: "profile",

  data: function() {
    return {
      event: {},
      loggedIn: localStorage.loggedIn,
      user: {},
      isSpeaker: "no",
      speaker: {}
    };
  },
  created: function() {
    if (localStorage.speakerId) {
      this.isSpeaker = "yes";
      const id = localStorage.speakerId;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}speakers/${id}`)
        .then(function(data) {
          this.speaker = data.body;
        });
    } else {
      const id = localStorage.userId;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}users/${id}`)
        .then(function(data) {
          this.user = data.body;
        });
    }
  },
  methods: {
    setLoggedOut: function() {
      localStorage.loggedIn = "no";
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("speakerId");
      EventBus.$emit("$loggedIn");
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

h1 {
  @include heading-large;
}

.info {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0;
  align-items: center;
}
.row {
  display: flex;
  flex-direction: row;
  p {
    text-align: left;
    margin: 10px;
  }
}
.top {
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  
}
.profile-box {
  position: absolute;
  top:50%;
left: 50%;
transform: translate(-50%, -50%); 
margin: auto;
  width: 60%;
  background-color: white;
  padding: 50px;
  border-radius: 20px;
}
.divider {
  width: 100%;
}
v-row {
  width: 100%;
}
img {
  border-radius: 50%;
}

.wrap {
  background-color: $secondary;
}
// .profile {
//   background-color: white;
// }
</style>
