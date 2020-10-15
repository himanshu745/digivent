<template>
  <div class="body-main aligin-bottom">
    <Searchbar v-model="search" class="search-bar" />
    <div v-if="isSpeaker === 'yes'" class="container container--right">
      <h4>Hi Host, {{ speaker.firstName }} {{ speaker.lastName }}</h4>
      <h4>Check <a href="/my-events" class="color">your events</a></h4>
      <div class="thumb">
        <img :src="speaker.image" :alt="speaker.firstName" />
      </div>
    </div>
    <div class="container">
      <h1>Explore</h1>
      <h3>What’s upcoming events</h3>
      <EventThumbList :events="filteredEvents" />
    </div>
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
  data: function () {
    return {
      isSpeaker: "no",
      search: "",
      events: [],
      speaker: {},
    };
  },
  methods: {
    getEvents: function () {
      this.$http
        .get(`${process.env.VUE_APP_API_URL}events`)
        .then(function (data) {
          this.events = data.body;
        });
    },
  },
  created: function () {
    this.getEvents();
    if (localStorage.speakerId) {
      this.isSpeaker = "yes";
      const id = localStorage.speakerId;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}speakers/${id}`)
        .then(function (data) {
          this.speaker = data.body;
        });
    }
  },
  computed: {
    filteredEvents: function () {
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
  border: 3px solid white;
  height: 60px;
  width: 60px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  margin: 5px 0;
  img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.search-bar {
  z-index: -1;
  top: 0;
  left: 0;
  padding: 20px;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background: $primary;
  @include desktop {
    height: 60%;
    margin: 0;
    padding: 0 30%;
  }
}
.color {
  color: $secondary;
}
.container {
  margin-left: 16px;
  h1,
  h3,
  h4 {
    color: $natural-dark;
    @include desktop {
      color: white;
    }
  }

  &--right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 16px;
    position: absolute;
    right: 0;
    top: 100px;
  }
}

.aligin-bottom {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
}
</style>
