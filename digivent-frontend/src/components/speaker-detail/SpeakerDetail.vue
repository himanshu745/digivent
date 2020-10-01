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
      <h3>About:</h3>
      <p>{{speaker.description}}</p>
    </div>
    <div class="quesiton-button">
      <input type="text" value="Questions" />
    </div>

    <div class="events">
      <img :src="speaker.event" :alt="speaker.events" />
      <!-- <h2>{{speaker.event.name}}</h2> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "speaker-detail",
  data: function () {
    return {
      speaker: {},
    };
  },
  methods: {
    getSpeaker: function () {
      const id = this.$route.params.speakerId;
      console.log(id);
      this.$http
        .get(`${process.env.VUE_APP_API_URL}speakers/${id}`)
        .then(function (data) {
          this.speaker = data.body;
        });
    },
  },
  created: function () {
    this.getSpeaker();
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";
</style>