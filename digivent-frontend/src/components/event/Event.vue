<template>
  <v-main>
    <Searchbar v-model="search" pa-3 class="search-bar" />
    <v-layout flex-column class="media">
      <v-flex ma-4 class="thumb-top" v-if="isSpeaker === 'yes'">
        <h4 class="text-end text-white">
          Hi Host, {{ speaker.firstName }} {{ speaker.lastName }}
        </h4>
        <h4 class="text-end text-white mb-2">
          Check
          <a href="/my-events" class="hightlight secondary--text"
            >your events</a
          >
        </h4>
        <v-img
          class="rounded-xl thumb-img--right"
          aspect-ratio="1"
          :src="speaker.image"
          :alt="speaker.firstName"
        />
      </v-flex>

      <v-flex class="thumb-events" ml-4>
        <h1 class="text-white">Explore</h1>
        <h3 class="text-white">What’s upcoming events</h3>
        <keep-alive>
          <EventThumbList :events="filteredEvents" />
        </keep-alive>
      </v-flex>
    </v-layout>
  </v-main>
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
    this.getEvents();
    if (localStorage.speakerId) {
      this.isSpeaker = "yes";
      const id = localStorage.speakerId;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}speakers/${id}`)
        .then(function(data) {
          this.speaker = data.body;
        });
    }
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

.thumb {
  &-events {
    margin-top: 20%;
    @include desktop {
      @include position-bottom;
    }
  }
  &-top {
    @include position-top;
  }
  &-img--right {
    float: right;
    @include thumb-img;
  }
}

.search-bar {
  z-index: -1;
  padding: 16px;
  background: $primary;
  @include display-center;
  @include desktop {
    height: 50%;
    padding: 0 30%;
  }
}

.hightlight {
  font-weight: 400;

  &:hover {
    color: $secondary !important;
    font-weight: 600;
  }
}
.media {
  position: relative;
  @include desktop {
    position: static;
  }
}
.text-white {
  @include desktop {
    color: white;
    font-weight: 400;
  }
}
</style>
