<template>
  <v-main>
    <div aspect-ratio="1.4" class="header"></div>
    <v-layout column v-if="isSpeaker === 'yes'">
      <v-flex class="title">
        <h2>Speaker Profile</h2>
      </v-flex>
      <v-flex class="rounded-xl rounded-box">
        <v-flex ma-4 class="thumb-speaker">
          <v-img
            class="rounded-circle thumb-img--large"
            aspect-ratio="1"
            :src="speaker.image"
            :alt="speaker.firstName"
          />
        </v-flex>
        <v-list three-line class="mt-10">
          <v-list-item class="flex-row">
            <v-list-item-content class="border-box">
              <v-list-item-subtitle class="text-break"
                >First Name</v-list-item-subtitle
              >
              <v-list-item-title v-text="speaker.firstName"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="flex-row">
            <v-list-item-content class="border-box">
              <v-list-item-subtitle class="text-break"
                >Last Name</v-list-item-subtitle
              >
              <v-list-item-title v-text="speaker.lastName"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="flex-row">
            <v-list-item-content class="border-box">
              <v-list-item-subtitle class="text-break"
                >Username</v-list-item-subtitle
              >
              <v-list-item-title v-text="speaker.userName"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="flex-row">
            <v-list-item-content class="border-box">
              <v-list-item-subtitle class="text-break"
                >Email</v-list-item-subtitle
              >
              <v-list-item-title v-text="speaker.email"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="flex-row">
            <v-list-item-content class="border-box">
              <v-list-item-subtitle class="text-break"
                >Description</v-list-item-subtitle
              >
              <v-list-item-title
                v-text="speaker.description"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
        <a
          class="btn white--text"
          v-if="loggedIn === 'yes'"
          @click.prevent="setLoggedOut"
          >Log Out</a
        >
      </v-flex>
    </v-layout>
    <v-layout column v-else>
      <v-flex class="title">
        <h2>User Profile</h2>
      </v-flex>
      <v-flex class="rounded-xl rounded-box">
        <v-flex ma-4 class="thumb-speaker">
          <v-img
            class="rounded-circle thumb-img--large"
            aspect-ratio="1"
            :src="user.image"
            :alt="user.firstName"
          />
        </v-flex>
        <v-list three-line class="mt-10">
          <v-list-item class="flex-row">
            <v-list-item-content class="border-box">
              <v-list-item-subtitle class="text-break"
                >Username</v-list-item-subtitle
              >
              <v-list-item-title v-text="user.userName"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="flex-row">
            <v-list-item-content class="border-box">
              <v-list-item-subtitle class="text-break"
                >Email</v-list-item-subtitle
              >
              <v-list-item-title v-text="user.email"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
        <a
          class="btn white--text"
          v-if="loggedIn === 'yes'"
          @click.prevent="setLoggedOut"
          >Log Out</a
        >
      </v-flex>
    </v-layout>
  </v-main>
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
      speaker: {},
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
.header {
  width: 100%;
  height: 30%;
  background: $primary;
}
.thumb {
  &-speaker {
    @include thumb-speaker;
  }
  &-img--large {
    @include thumb-img--large;
  }
}

.title {
  position: absolute;
  left: 30px;
  top: 50px;
  color: white;
  font-weight: 400;
  @include desktop {
    left: 5%;
  }
}
.rounded-box {
  @include rounded-box;
}

.scrollbar {
  padding: 0 20px;
  max-width: 700px;
  max-height: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
  &-speaker {
    @include desktop {
      max-height: 400px;
      position: absolute;
      left: 40%;
    }
  }
}

.btn {
  @include buttonprimary;
  &--light {
    @include buttonlight;
  }
  &-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
