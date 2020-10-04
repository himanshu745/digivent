<template>
  <div>
    <div v-if="isSpeaker === 'yes'" class="speaker">
      <div class="top">
        <h1>Speaker Profile</h1>
        <img :src="speaker.image" />
      </div>
      <div class="info">
        <div class="row">
          <p>First name:</p>
          <p>{{ speaker.firstName }}</p>
        </div>
        <div class="row">
          <p>Last name:</p>
          <p>{{ speaker.lastName }}</p>
        </div>
        <div class="row">
          <p>Username:</p>
          <p>{{ speaker.userName }}</p>
        </div>
        <div class="row">
          <p>Email:</p>
          <p>{{ speaker.email }}</p>
        </div>
        <div class="row">
          <p>Description:</p>
          <p>{{ speaker.description }}</p>
        </div>
      </div>
    </div>

    <div v-else class="user">
      <div class="top">
        <h1>User Profile</h1>
        <img :src="user.image" />
      </div>
      <div class="info">
        <div class="row">
          <p>Username:</p>
          <p>{{ user.userName }}</p>
        </div>
        <div class="row">
          <p>Email:</p>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>

    <a v-if="loggedIn === 'yes'" @click.prevent="setLoggedOut" href>Log Out</a>
  </div>
</template>

<script>
export default {
  name: "profile",

  data: function() {
    return {
      event: {},
      loggedIn: "no",
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
      console.log(id);
      this.$http
        .get(`${process.env.VUE_APP_API_URL}users/${id}`)
        .then(function(data) {
          this.user = data.body;
        });
    }
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
}
</style>
