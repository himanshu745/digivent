<template>
  <v-main>
    <div aspect-ratio="1.4" class="header"></div>
    <v-layout column>
      <v-flex class="title">
        <img
          src="@/assets/Frame 12.svg"
          alt="Frame"
          @click.prevent="closePage(event._id)"
        />
        <h2>Host Details</h2>
      </v-flex>

      <v-flex class="rounded-xl rounded-box">
        <v-flex ma-4 class="thumb-speaker">
          <v-img
            class="rounded-circle thumb-img--large"
            aspect-ratio="1"
            :src="event.speaker.image"
            :alt="event.speaker.firstName"
          />
        </v-flex>
        <v-layout>
          <v-form @submit.prevent="checkForm">
            <v-col cols="12" sm="6" class="pt-0">
              <h5 class="text--secondary mb-1">Host name</h5>
              <h2 class="font-weight-medium">
                {{ event.speaker.firstName }} {{ event.speaker.lastName }}
              </h2>
            </v-col>
            <v-row>
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="event.name"
                  label="Event Name"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-menu
                  v-model="dateInput"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="event.date"
                      label="Event Date"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="event.date"
                    @input="dateInput = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="event.time"
                  label="Time"
                  clearable
                  type="time"
                  suffix="PST"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="event.address"
                  label="Event Address"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-textarea
                  v-model="event.description"
                  label="Event Description"
                  clearable
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="event.image"
                  label="Event image"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <input
                  class="primary--text btn btn--light"
                  type="submit"
                  :value="mode"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-main>
</template>
<script>
export default {
  name: "edit",

  data: function() {
    return {
      dateInput: false,
      mode: "Add Event",
      editing: false,
      event: {
        name: null,
        description: null,
        date: null,
        time: null,
        address: null,
        image: null,
        speaker: {},
      },
    };
  },
  methods: {
    closePage: function(eventId) {
      this.$router.push({ name: "detail", params: { eventId: eventId } });
    },
    checkForm: function() {
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
      } else {
        alert("All fields are required");
      }
    },

    createEvent: function(event) {
      const speakerId = localStorage.speakerId;
      console.log(event);
      this.$http
        .post(
          `${process.env.VUE_APP_API_URL}speakers/${speakerId}/events`,
          event
        )
        .then(function() {
          this.$router.push({ path: "/" });
        });
    },

    editEvent: function(event) {
      this.$http
        .put(`${process.env.VUE_APP_API_URL}events/${event._id}`, event)
        .then(function() {
          this.$router.push({ path: "/" });
        });
    },
  },
  created: function() {
    const speakerId = localStorage.speakerId;
    this.$http
      .get(`${process.env.VUE_APP_API_URL}speakers/${speakerId}`)
      .then(function(data) {
        this.event.speaker = data.body;
      });
    const eventId = this.$route.params.eventId;
    if (eventId) {
      this.editing = true;
      this.mode = "Edit Event";
      this.$http
        .get(`${process.env.VUE_APP_API_URL}events/${eventId}`)
        .then(function(data) {
          this.event = data.body;
        });
    }
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
    z-index: 1;
    position: absolute;
    top: -80px;
    right: 30px;
    @include desktop {
      right: 5%;
    }
  }
  &-img--large {
    @include thumb-img--large;
  }
}

.rounded-box {
  background: white;
  position: absolute;
  top: 15%;
  width: 100%;
  margin-top: 5%;
  padding: 50px;
  @include desktop {
    width: 80%;
    height: 70%;
    top: auto;
    bottom: 0;
    margin: 0 5% 5%;
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
