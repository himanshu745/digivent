<template>
  <div>
    <div v-if="isSpeaker === 'yes'">
      <h1>My Events</h1>
      <router-link :to="{ name: 'edit' }">+ Add New event</router-link>

      <div class="contents__box" v-for="(event, i) in events" :key="i">
        <router-link
          v-bind:to="{ name: 'detail', params: { eventId: event._id } }"
        >
          <h6>{{ event.time }} {{ event.date }}</h6>
          <h2>{{ event.name }}</h2>
        </router-link>
      </div>
    </div>
    <div v-else>
      <div class="contents__box" v-for="(event, i) in user.events" :key="i">
        <h1>My Tickets</h1>
        <router-link
          v-bind:to="{
            name: 'book',
            params: { event: event },
          }"
        >
          <h6>{{ event.time }} {{ event.date }}</h6>
          <h2>{{ event.name }}</h2>
        </router-link>
      </div>
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
.events {
  position: relative;
  display: flex;
  flex-direction: column;
}
.event {
  justify-content: center;
  text-align: center;
  width: 80%;
  // height: 30%;
  position: relative;
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc !important;
  border-radius: 16px;
}
</style>
