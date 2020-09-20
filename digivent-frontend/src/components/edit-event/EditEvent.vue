<template>
  <div>
    <h3>Host details</h3>
    <img src alt />
    <div>
      <p>Host name</p>
      <h4>speaker.firstName</h4>
    </div>
    <form v-on:submit.prevent="checkForm">
      <div>
        <label for="name">Event Name</label>
        <input v-model="event.name" id="name" name="name" type="text" placeholder="Enter the name" />
      </div>
      <div>
        <label for="date">Date</label>
        <input v-model="event.date" id="date" name="date" type="date" />
      </div>
      <div>
        <label for="time">Time</label>
        <input v-model="event.time" id="time" name="time" type="time" />
      </div>
      <div>
        <label for="address">address</label>
        <input v-model="event.address" id="address" name="address" type="address" />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea
          v-model="event.description"
          id="description"
          name="description"
          placeholder="Enter the Description"
        />
      </div>
      <div>
        <label for="image">Main Image</label>
        <input
          v-model="event.image"
          id="image"
          name="image"
          type="text"
          placeholder="Enter the image"
        />
      </div>
      <div>

        <input type="submit" :value="mode" />

      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "edit",
  data: function () {
    return {
      mode: "Add Event",
      editing: false,
      event: {
        name: null,
        description: null,
        date: null,
        time: null,
        address: null,
        image: null,
      },
    };
  },
  methods: {
    checkForm: function () {
      if (
        this.event.name &&
        this.event.description &&
        this.event.date &&
        this.event.time &&
        this.event.address &&
        this.event.image
      ) {
        if (this.editing) {
          this.editEvent(this.event);

        } else {
          this.createEvent(this.event);
        }
      }
    },

    createEvent: function (event) {
      console.log(event);
      this.$http
        .post(`${process.env.VUE_APP_API_URL}events`, event)
        .then(function () {
          this.$router.push({ path: "/events" });
        });
    },


    editEvent: function (event) {
      this.$http
        .put(`${process.env.VUE_APP_API_URL}events/${event._id}`, event)
        .then(function () {
          this.$router.push({ path: "/events" });
        });
    },
  },
  created: function () {
    const eventId = this.$route.params.eventId;
    if (eventId) {
      this.editing = true;
      this.mode = "Edit Event";
      this.$http
        .get(`${process.env.VUE_APP_API_URL}events/${eventId}`)
        .then(function (data) {
          this.event = data.body;
        });
    }
  },
};
</script>

<style></style>
