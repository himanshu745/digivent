<template>
  <div>
    <div class="flexbox">
      <!-- <img src="@/assets/chevron-left.svg" alt="chevron-left" /> -->
    </div>

    <h2>Event details</h2>
    <div class="flexbox">
      <img class="flexbox__main" :src="event.image" :alt="event.name" />
    </div>

    <h1>{{ event.name }}</h1>
    <div class="flexbox">
      <!-- <img src="@/assets/pin.svg" alt="pin" /> -->
      <h4>{{ event.address }}</h4>
    </div>
    <div class="flexbox">
      <!-- <img src="@/assets/dates.svg" alt="dates" /> -->
      <h4>{{ event.date }}</h4>
    </div>
    <div class="flexbox">
      <!-- <img src="@/assets/time.svg" alt="time" /> -->
      <h4>{{ event.time }}</h4>
    </div>

    <div class="flexbox">
      <div>
        <h3>Host</h3>
        <div class="flexbox__thumb">
          <img :src="event.speaker.image" :alt="event.speaker.firstName" />
        </div>
        <h3>{{ event.speaker.firstName }} {{ event.speaker.lastName }}</h3>
      </div>
    </div>

    <div v-if="isSpeaker === 'yes'" class="flexbox">
      <router-link :to="{ name: 'edit', params: { eventId: event._id } }">
        Edit event
      </router-link>
      <a href @click.prevent="deleteEvent(event._id)"> Delete Event </a>
      <h4>Event description</h4>
      <p>{{ event.description }}</p>
    </div>

    <div v-else>
      <div class="flexbox">
        <router-link :to="{name: 'speaker-detail', params: { speakerId: event.speaker} }">
        <h6>About host</h6>
        </router-link>
        <input type="button" value="Ask question" />
      </div>
      <h4>Event description</h4>
      <p>{{ event.description }}</p>
      <!-- <div @click.prevent="bookEvent()">
        <router-link
          class="btn"
          :to="{ name: 'book', params: { event: event } }"
          >Book
        </router-link>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "EventDetails",
  data: function() {
    return {
      event: {
        speaker: {
          firstName: String,
          lastName: String,
          image: String,
        },
      },
      isSpeaker: "no",
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
      console.log(this.event.speaker);
      this.event.speaker._id = localStorage.speakerId;
      this.isSpeaker = "yes";
    }
  },
  methods: {
    deleteEvent: function(eventId) {
      this.$http
        .delete(`${process.env.VUE_APP_API_URL}events/${eventId}`)
        .then(function() {
          this.$router.push({ path: "/events" });
        });
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
  },
};
</script>

<style lang="scss">
// @import "@/style/_variables.scss";
// .flexbox {
//   display: flex;
//   align-items: center;
//   overflow: hidden;
//   &__thumb {
//     @include thumb-img;
//   }
//   &__main {
//     width: 100%;
//     min-width: 600px;
//     height: auto;
//   }
// }
// .btn {
//   @include buttonprimary;
// }
// path {
//   fill: red;
// }
</style>