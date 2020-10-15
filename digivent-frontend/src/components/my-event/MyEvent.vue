<template>
  <div class="wrap">
    <div class="contents" v-if="isSpeaker === 'yes'">
      <v-flex class="title">
        <h1>My Events</h1>
      </v-flex>
      <v-flex>
        <router-link class="btn white--text" :to="{ name: 'edit' }"
          >+ Add New event</router-link
        >
        <v-card class="contents__box" v-for="(event, i) in events" :key="i">
          <router-link
            v-bind:to="{ name: 'detail', params: { eventId: event._id } }"
          >
            <h6 class="pb-2">{{ event.time }}| {{ event.date }}</h6>
            <h2>{{ event.name }}</h2>
            <h4>{{ event.speaker.firstName }} {{ event.speaker.lastName }}</h4>
          </router-link>
        </v-card>
      </v-flex>
    </div>
    <div v-else class="contents">
      <h1>My Tickets</h1>
      <v-card class="contents__box" v-for="(event, i) in user.events" :key="i">
        <router-link
          class="button"
          v-bind:to="{
            name: 'book',
            params: { userId: user._id, eventId: event._id },
          }"
        >
          <h6 class="pb-1">{{ event.time }}| {{ event.date }}</h6>
          <h2>{{ event.name }}</h2>
          <h4>{{ event.speaker.firstName }} {{ event.speaker.lastName }}</h4>
        </router-link>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "my-events",

  data: function() {
    return {
      user: {},
      events: [],
      isSpeaker: "no",
    };
  },
  created: function() {
    if (localStorage.speakerId) {
      this.isSpeaker = "yes";
      const id = localStorage.speakerId;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}speakers/${id}/events`)
        .then(function(data) {
          this.events = data.body;
        });
    }
    if (localStorage.userId) {
      const id = localStorage.userId;
      this.isSpeaker = "no";
      this.$http
        .get(`${process.env.VUE_APP_API_URL}users/${id}/events`)
        .then(function(data) {
          this.user = data.body;
        });
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/_variables.scss";

.contents {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-items: center;
  margin: 100px 0;
  text-align: center;
  width: 100%;
  @include desktop {
    justify-content: left;
    text-align: left;
  }
}
.contents__box {
  text-transform: capitalize;
  justify-content: center;
  padding: 20px;
  width: 300px;
  display: flex;
  margin: auto;
  border-radius: 20px;
  margin-top: 20px;
  height: 130px;
  background-color: white;
  color: black;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  text-align: left;
  @include desktop {
    justify-content: left;
    text-align: left;
    height: 150px;
  }
}
.wrap {
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: $primary;
  // height: 100vh;
  @include desktop {
    justify-content: left;
    padding-left: 10rem;
  }
}
h2 {
  text-transform: uppercase;
  font-weight: 600;
}

h6 {
  text-transform: uppercase;
}
h1 {
  color: white;
  font-weight: 600;
  margin-bottom: 1rem;
}
.button {
  width: 100%;
  align-content: space-around;
  filter: drop-shadow(0px 4px 4px $secondary-dark 0.25);
  padding: 10px;
  border-radius: 10px;
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
