<template>
  <div>
    <input v-model="search" type="text" id="search" />
    <router-link :to="{ name: 'edit' }">New event</router-link>

    <!-- <MySearchbar :events="events" /> -->
    <div class="contents">
      <div class="contents__box" v-for="(event, i) in filteredEvents" :key="i">
        <div class="contents__img">
          <img :src="event.image" />
        </div>
        <h4>{{ event.name }}</h4>
        <router-link :to="{ name: 'edit', params: { eventId: event._id} }">edit</router-link>
        <a href v-on:click.prevent="deleteEvent(event._id)">Delete Event</a>

      </div>
    </div>
  </div>
</template>

<script>
// import MySearchbar from "../../components/MySearchbar.vue";

export default {
  name: "event",
  // components: {
  //   MySearchbar,
  // },

  data: function () {
    return {
      events: [],
      search: "",
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
    deleteEvent: function (eventId) {
      this.$http
        .delete(`${process.env.VUE_APP_API_URL}events/${eventId}`)
        .then(function () {
          this.getEvents();
        });
    },
  },
  created() {
    this.getEvents();
  },
  computed: {
    filteredEvents: function () {
      return this.events.filter((event) => {
        let byName =
          event.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        // let bySpeaker =
        //   event.speaker.firstName
        //     .toLowerCase()
        //     .indexOf(this.search.toLowerCase()) > -1;
        if (byName === true) {
          return byName;
        }
        // else if (bySpeaker === true) {
        //   return bySpeaker;
        // }
      });
    },
  },
};
</script>

<style>
.contents {
  display: flex;
}
.contents__box {
  margin: 20px;
}
.contents__img {
  height: 400px;
  width: 300px;
  overflow: hidden;
}
img {
  height: 100%;
  width: auto;
}
</style>
