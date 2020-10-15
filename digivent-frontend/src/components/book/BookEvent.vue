<template>
  <v-main>
    <div aspect-ratio="1.4" class="header"></div>
    <v-flex class="title">
      <img
        src="@/assets/Frame 12.svg"
        alt="Frame"
        @click.prevent="closePage()"
      />
      <h2>Confirmed</h2>
    </v-flex>
    <v-flex class="rounded-xl rounded-box">
      <v-layout class="flex-column textbox">
        <v-row class="py-2 align-center hightlight">
          <router-link
            v-bind:to="{ name: 'detail', params: { eventId: event._id } }"
          >
            <h1 class="hightlight grey--text">{{ event.name }} ></h1>
          </router-link>
        </v-row>
        <v-row class="pb-4 align-center">
          <router-link
            v-bind:to="{
              name: 'speaker-detail',
              params: { speakerId: event.speaker._id },
            }"
          >
            <h2 class="hightlight grey--text">
              {{ event.speaker.firstName }} {{ event.speaker.lastName }} >
            </h2>
          </router-link>
        </v-row>
        <v-row class="py-1 align-center">
          <img class="pr-2" src="@/assets/pin.svg" alt="pin" />
          <h4 class="hightlight" @click.prevent="googleMap(event.address)">
            {{ event.address }}
          </h4>
        </v-row>
        <v-row class="py-1 align-center">
          <img class="pr-2" src="@/assets/dates.svg" alt="dates" />
          <h4>{{ event.date }}</h4>
        </v-row>
        <v-row class="py-1 align-center">
          <img class="pr-2" src="@/assets/time.svg" alt="time" />
          <h4>{{ event.time }}</h4>
        </v-row>
      </v-layout>
      <v-flex>
        <v-row class="justify-center">
          <img src="@/assets/qr-code.svg" alt="qrcode" />
        </v-row>
        <v-row>
          <router-link
            class="btn white--text"
            :to="{ name: 'post-question', params: { eventId: event._id } }"
            >Ask question
          </router-link>
        </v-row>
      </v-flex>
    </v-flex>
  </v-main>
</template>

<script>
export default {
  name: "book",
  data: function() {
    return {
      event: {
        speaker: {},
      },
    };
  },
  created: function() {
    const eventId = this.$route.params.eventId;
    const userId = this.$route.params.userId;
    this.$http
      .get(`${process.env.VUE_APP_API_URL}users/${userId}/events`)
      .then(function(data) {
        const userEvent = data.body.events;
        this.event = userEvent.filter(function(events) {
          return events._id === eventId;
        })[0];
      });
  },
  methods: {
    closePage: function() {
      this.$router.push("/my-events");
    },
    googleMap: function(address) {
      const place = address.replace(" ", "+");
      window.open(
        `https://www.google.com/maps/place/${place},christchurch`,
        "_blank"
      );
    },
  },
};
</script>

<style lang="scss">
@import "@/style/_variables.scss";

.header {
  width: 100%;
  height: 30%;
  background: $primary;
}

.title {
  @include title;
}
.rounded-box {
  @include rounded-box;
}

.hightlight {
  &:hover {
    color: $secondary !important;
    font-weight: 600;
  }
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
