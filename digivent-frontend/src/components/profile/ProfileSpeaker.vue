<template>
  <div>
    <div class="top">
      <h1>Speaker Profile</h1>
      <img
        src="https://drive.google.com/file/d/1tnG6HWvv7d7Pi22-0g9HapTmyb2TtlwW/view?usp=sharing"
        width="250px"
        height="250px"
      />
    </div>
    <div class="info">
      <!-- <div class="row">
        <p>First name:</p>
        <p>{{speaker.firstName}}</p>
      </div>
      <div class="row">
        <p>Last name:</p>
        <p>{{speaker.lastName}}</p>

        <p></p>
      </div>
      <div class="row">
        <p>Username:</p>
        <p>{{speaker.userName}}</p>
      </div>
      <div class="row">
        <p>Email:</p>
        <p>{{speaker.email}}</p>
      </div>
      <div class="row">
        <p>Description:</p>
        <p>{{speaker.description}}</p>
      </div>-->
    </div>
    <a v-if="loggedIn === 'yes'" @click.prevent="setLoggedOut" href>Log Out</a>
  </div>
</template>

<script>
// export default {
//   name: "SpeakerProfile",

//   data: function() {
//     return {
//       event: {},
//     };
//   },
//   created: function() {
//     const id = this.$route.params.speakerId;
//     this.$http
//       .get(`${process.env.VUE_APP_API_URL}speaker/${id}`)
//       .then(function(data) {
//         this.speaker = data.body;
//       });
//   }
// }
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
