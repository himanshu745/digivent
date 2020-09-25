<template>
  <div class="flexbox">
    <div class="thumb--s" v-if="this.$route.path !== '/events'">
      <img :src="speaker.image" :alt="speaker.firstName" />
    </div>
    <h3>{{ speaker.firstName }} {{ speaker.lastName }}</h3>
  </div>
</template>

<script>
export default {
  name: "SpeakerName",
  props: { eventId: String },
  data: function() {
    return {
      speaker: {}
    };
  },
  methods: {
    getSpeaker: function() {
      const id = this.eventId;
      console.log(id);
      this.$http
        .get(`${process.env.VUE_APP_API_URL}events/${id}/speaker`)
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

<style lang="scss">
@import "@/style/_variables.scss";
.flexbox {
  display: flex;
  align-items: center;
}
.thumb--s {
  margin-right: 10px;
  height: 50px;
  width: 50px;
  border-radius: 20px;
}
</style>
