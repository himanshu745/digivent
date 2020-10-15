<template>
  <v-main>
    <div aspect-ratio="1.4" class="header"></div>
    <v-layout column>
      <v-flex class="title">
        <img
          src="@/assets/chevron-left.svg"
          alt="chevron-left"
          @click.prevent="goBack"
        />
        <h2>Host Details</h2>
      </v-flex>
      <v-flex class="rounded-xl rounded-box">
        <v-flex ma-4 class="thumb-speaker">
          <v-img
            class="rounded-circle thumb-img--large"
            aspect-ratio="1"
            :src="speaker.image"
            :alt="speaker.firstName"
          />
        </v-flex>
        <v-flex class="py-4 column">
          <v-row>
            <h1>{{ speaker.firstName }} {{ speaker.lastName }}</h1>
          </v-row>
          <v-row class="pt-6">
            <h2 class="font-weight-medium pb-2">About</h2>
          </v-row>
          <v-row>
            <p>{{ speaker.description }}</p>
          </v-row>
        </v-flex>
      </v-flex>
      <v-flex class="thumb-speaker-events" ml-10>
        <h2>Up Coming Event</h2>
        <EventThumbList :events="speaker.events" />
      </v-flex>
    </v-layout>
  </v-main>
</template>

<script>
import EventThumbList from "../event/EventThumbList";

export default {
  name: "speaker-detail",
  components: {
    EventThumbList,
  },

  data: function () {
    return {
      speaker: {
        events: [],
      },
    };
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
    getSpeaker: function () {
      const id = this.$route.params.speakerId;
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

.header {
  width: 100%;
  height: 30%;
  background: $primary;
}

.thumb {
  &-speaker {
    @include thumb-speaker;
  }
  &-img--large {
    @include thumb-img--large;
  }
}

.title {
  position: absolute;
  left: 30px;
  top: 50px;
  color: white;
  font-weight: 400;
  @include desktop {
    left: 5%;
  }
}

.rounded-box {
  @include rounded-box;
}

// .overflow {
//   overflow-x: scroll;
// }
</style>
