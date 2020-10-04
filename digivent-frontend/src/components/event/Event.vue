<template>
  <div>
    <Searchbar v-model="search" type="text" id="search" />

    <div v-if="isSpeaker === 'yes'">
      <h3>Hi Host, {{ speaker.firstName }} {{ speaker.lastName }}</h3>
      <h4>Check <a href="">your events</a></h4>
      <div class="thumb">
        <img :src="speaker.image" :alt="speaker.firstName" />
      </div>
    </div>

    <h1>Explore</h1>
    <h2>What’s upcoming events</h2>

    <router-link :to="{ name: 'edit' }">New event</router-link>
    <EventThumbList :events="filteredEvents" />
  </div>
</template>

<script>
import EventThumbList from "./EventThumbList";
import Searchbar from "../Searchbar";

export default {
  name: "event",
  components: {
    EventThumbList,
    Searchbar,
  },
  data: function() {
    return {
      isSpeaker: "no",
      search: "",
      events: [],
      speaker: {},
    };
  },
  methods: {
    getEvents: function() {
      this.$http
        .get(`${process.env.VUE_APP_API_URL}events`)
        .then(function(data) {
          this.events = data.body;
        });
    },
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
    }
    this.getEvents();
  },
  computed: {
    filteredEvents: function() {
      return this.events.filter((event) => {
        let byEvent =
          event.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        if (byEvent === true) {
          return byEvent;
        }
        let byFirstName =
          event.speaker.firstName
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1;
        if (byFirstName === true) {
          return byFirstName;
        }
        let byLastName =
          event.speaker.lastName
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1;
        if (byLastName === true) {
          return byLastName;
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/style/_variables.scss";

.flexbox {
  display: flex;
  align-items: center;
  overflow: hidden;
}
.thumb {
  @include thumb-img;
}
</style>
