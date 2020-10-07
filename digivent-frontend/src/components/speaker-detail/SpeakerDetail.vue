<template>
  <div>
    <div class="heading">
      <h3>Host Details</h3>
    </div>
    <div class="speaker-img">
      <h3>{{ speaker.firstName }} {{ speaker.lastName }}</h3>
      <img :src="speaker.image" :alt="speaker.firstName" />
    </div>
    <div class="about">
      <h3>About</h3>
      <p>{{ speaker.description }}</p>
    </div>
    <div class="quesiton-button">
      <input type="text" value="Questions" />
    </div>

    <div class="events" v-for="event in speaker.events" :key="event._id">
      <router-link
        v-bind:to="{
          name: 'detail',
          params: { eventId: event._id },
          path: 'book',
        }"
      >
        <div class="events-img">
          <img :src="event.image" :alt="event.name" />
        </div>
        <h2>{{ event.name }}</h2>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "speaker-detail",
  props: ["events"],
  data: function() {
    return {
      speaker: {
        events: [],
      },
    };
  },
  methods: {
    getSpeaker: function() {
      const id = this.$route.params.speakerId;
      console.log(id);
      this.$http
        .get(`${process.env.VUE_APP_API_URL}speakers/${id}`)
        .then(function(data) {
          this.speaker = data.body;
        });
    },
  },
  created: function() {
    this.getSpeaker();
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

.heading {
  background: #05386b;
  display: flex;
  // width: 80%;
  margin-top: 6rem;
  margin-left: 5rem;
}
</style>
