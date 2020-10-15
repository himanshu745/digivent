<template>
  <v-main>
    <div aspect-ratio="1.4" class="header"></div>
    <v-layout column>
      <v-flex class="title">
        <img
          src="@/assets/Frame 12.svg"
          alt="Frame"
          @click.prevent="closePage()"
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
    closePage: function() {
      this.$router.push("/my-events");
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

.title {
  @include title;
}

.thumb {
  &-speaker {
    @include thumb-speaker;
  }
  &-img--large {
    @include thumb-img--large;
  }
}

.rounded-box {
  @include rounded-box;
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
