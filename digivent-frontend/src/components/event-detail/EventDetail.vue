<template>
  <v-main>
    <v-img aspect-ratio="1.4" :src="event.image" :alt="event.name"></v-img>
    <v-layout column>
      <v-flex class="title">
        <img src="@/assets/chevron-left.svg" alt="chevron-left" @click.prevent="goBack" />
        <h2>Event Details</h2>
      </v-flex>
      <v-flex class="rounded-xl rounded-box--ma">
        <v-layout class="flex-column textbox">
          <v-row class="py-4 align-center">
            <h1>{{ event.name }}</h1>
          </v-row>
          <v-row class="py-1 align-center">
            <img class="pr-2" src="@/assets/pin.svg" alt="pin" />
            <h4 class="hightlight" @click.prevent="googleMap(event.address)">{{ event.address }}</h4>
          </v-row>
          <v-row class="py-1 align-center">
            <img class="pr-2" src="@/assets/dates.svg" alt="dates" />
            <h4>{{ event.date }}</h4>
          </v-row>
          <v-row class="py-1 align-center">
            <img class="pr-2" src="@/assets/time.svg" alt="time" />
            <h4>{{ event.time }}</h4>
          </v-row>
          <v-row class="pt-4 align-center">
            <h3 class="font-weight-medium pb-2">Host</h3>
          </v-row>
          <v-flex class="btn-group">
            <router-link
              class="pr-6"
              :to="{
                name: 'speaker-detail',
                params: { speakerId: event.speaker._id },
              }"
            >
              <v-img
                class="rounded-xl thumb-img"
                aspect-ratio="1"
                :src="event.speaker.image"
                :alt="event.speaker.firstName"
              />
              <h6
                class="grey--text hightlight"
              >{{ event.speaker.firstName }} {{ event.speaker.lastName }} ></h6>
            </router-link>
            <!-- speaker's button -->
            <a
              v-if="isSpeaker === 'yes'"
              class="btn white--text"
              @click.prevent="checkSpeaker(event.speaker._id)"
            >Edit event</a>
            <!-- user's button -->
            <router-link
              v-else
              class="btn btn--light"
              :to="{ name: 'question', params: { eventId: event._id } }"
            >View Questions</router-link>
          </v-flex>
          <v-row class="py-4">
            <h3 class="font-weight-medium pb-2">Event Description</h3>
            <p>{{ event.description }}</p>
          </v-row>
        </v-layout>
        <v-layout class="py-4 imagebox column">
          <v-flex class="d-none d-sm-flex mb-12">
            <v-img aspect-ratio="1" :src="event.image" :alt="event.name" />
          </v-flex>
          <!-- speaker's button -->
          <div v-if="isSpeaker === 'yes'">
            <a
              class="btn btn--light"
              @click.prevent="deleteEvent(event._id, event.speaker._id)"
            >Delete Event</a>
          </div>
          <!-- user's button -->
          <div class="btn-group" v-else @click.prevent="bookEvent()">
            <router-link
              class="btn white--text"
              :to="{ name: 'book', params: { event: event } }"
            >Book</router-link>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-main>
</template>

<script>
export default {
  name: "detail",
  data: function() {
    return {
      event: {
        speaker: {}
      },
      isSpeaker: "no"
    };
  },
  mounted: function() {
    const id = this.$route.params.eventId;
    this.$http
      .get(`${process.env.VUE_APP_API_URL}events/${id}`)
      .then(function(data) {
        this.event = data.body;
      });
  },
  created: function() {
    if (localStorage.speakerId) {
      this.isSpeaker = "yes";
    }
  },
  methods: {
    goBack() {
      return this.$router.push({ path: "/" });
    },
    deleteEvent: function(eventId, speakerId) {
      if (localStorage.speakerId !== speakerId) {
        alert("You don't have permission to do.");
      } else {
        const choice = confirm("Want to delete?");
        if (choice) {
          this.$http
            .delete(`${process.env.VUE_APP_API_URL}events/${eventId}`)
            .then(function() {
              this.$router.push({ path: "/my-events" });
            });
        }
      }
    },
    bookEvent: function() {
      const event = this.event;
      const id = localStorage.userId;
      this.$http
        .put(`${process.env.VUE_APP_API_URL}users/${id}/event`, event)
        .then(function() {
          alert("Booking confirmed!");
        });
    },

    checkSpeaker: function(speakerId) {
      if (localStorage.speakerId !== speakerId) {
        alert("You don't have permission to do.");
      } else {
        this.$router.push({
          name: "edit",
          params: { eventId: this.event._id }
        });
      }
    },
    googleMap: function(address) {
      const place = address.replace(" ", "+");
      window.open(
        `https://www.google.com/maps/place/${place},christchurch`,
        "_blank"
      );
    }
  }
};
</script>

<style lang="scss">
@import "@/style/_variables.scss";
.thumb-img {
  @include thumb-img;
}

.rounded-box {
  &--ma {
    background: white;
    position: absolute;
    top: 15%;
    padding: 50px;
    margin: 5%;
    @include desktop {
      width: 80%;
      height: 70%;
      top: auto;
      bottom: 0;
      margin: 0 5% 5%;
    }
  }
}

.imagebox {
  @include desktop {
    position: absolute;
    width: 40%;
    left: 6%;
  }
}
.textbox {
  @include desktop {
    position: absolute;
    width: 40%;
    right: 6%;
  }
}

.hightlight {
  &:hover {
    color: $secondary !important;
    font-weight: 600;
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

.btn {
  @include buttonprimary;
  width: 100%;
  &--light {
    background: $secondary-light;
    justify-items: stretch;
  }
  &-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
