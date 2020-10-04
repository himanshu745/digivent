<template>
  <div>
    <div>
      <h3>Host Details</h3>
    </div>
    <div class="speaker-img">
      <h3>{{speaker.firstName}} {{speaker.lastName}}</h3>
      <img :src="speaker.image" :alt="speaker.firstName" />
    </div>
    <div class="about">
      <h3>About</h3>
      <p>{{speaker.description}}</p>
    </div>
    <div class="quesiton-button">
      <input type="text" value="Questions" />
    </div>

    <div class="event__box" v-for="(speaker, i) in filteredSpeaker" :key="i">
      <router-link v-bind:to="{ name: 'details', params: { speakerId: speaker._id } }">
        <div class="events__img">
          <img :src="spekaer.events" />
        </div>
        <h2>{{ speaker.event }}</h2>
        <SpeakerName :eventId="event._id" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "speaker-detail",
  data: function() {
    return {
      speaker: {}
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
    }
  },
  created: function() {
    this.getSpeaker();
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";
</style>