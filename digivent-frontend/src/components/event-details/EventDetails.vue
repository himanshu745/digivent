<template>
  <div>
    <h3>Event details</h3>
    <img :src="event.image" alt />
    <h1>{{ event.name }}</h1>
    <h4>{{ event.address }}</h4>
    <h4>{{ event.date }}</h4>
    <h4>{{ event.time }}</h4>
    <SpeakerName :eventId="event._id" />
    <input type="button" value="Ask question" />
    <router-link :to="{ name: 'edit', params: { eventId: event._id } }">
      Edit event
    </router-link>
    <a href v-on:click.prevent="deleteEvent(event._id)"> Delete Event </a>

    <h4>Description</h4>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import SpeakerName from "../event/EventPageSpeaker";

export default {
  name: "EventDetails",

  components: {
    SpeakerName,
  },
  data: function() {
    return {
      event: {},
    };
  },
  created: function() {
    const id = this.$route.params.eventId;
    this.$http
      .get(`${process.env.VUE_APP_API_URL}events/${id}`)
      .then(function(data) {
        this.event = data.body;
      });
  },
  methods: {
    deleteEvent: function(eventId) {
      this.$http
        .delete(`${process.env.VUE_APP_API_URL}events/${eventId}`)
        .then(function() {
          this.getEvents();
        });
    },
  },
};
</script>

<style></style>
