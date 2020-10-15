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
        <h2>Speaker’s Q&A</h2>
        <p>Talk with our Host</p>
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
        <v-flex>
          <v-col cols="12" sm="6" class="pt-0">
            <h5 class="text--secondary mb-1">Host name</h5>
            <h2 class="font-weight-medium">
              {{ event.speaker.firstName }} {{ event.speaker.lastName }}
            </h2>
            <h4>{{ event.name }}</h4>
          </v-col>
        </v-flex>
      </v-flex>
      <v-list three-line class="mt-10 scrollbar scrollbar-speaker">
        <template v-for="(question, i) in questions">
          <v-list-item class="flex-row" :key="question._id">
            <router-link
              class="d-flex"
              :to="{
                name: 'user-reply-question',
                params: {
                  questionId: question._id,
                  eventId: question.event._id,
                },
              }"
            >
              <v-list-item-avatar>
                <v-img
                  :src="question.user.image"
                  :alt="question.user.userName"
                />
              </v-list-item-avatar>
              <v-list-item-content class="border-box">
                <v-list-item-title
                  v-text="question.user.userName"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-text="question.body"
                  class="text-break"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </router-link>
          </v-list-item>
          <v-divider v-if="i < questions.length - 1" :key="i"></v-divider>
        </template>
        <v-col>
          <router-link
            class="btn btn--light"
            :to="{ name: 'post-question', params: { eventId: event._id } }"
            >Ask question
          </router-link>
        </v-col>
      </v-list>
    </v-layout>
  </v-main>
</template>

<script>
export default {
  name: "question",
  data: function() {
    return {
      questions: [],
      event: {
        speaker: {},
      },
    };
  },
  mounted: function() {
    const eventId = this.$route.params.eventId;
    this.$http
      .get(`${process.env.VUE_APP_API_URL}events/${eventId}`)
      .then(function(data) {
        this.event = data.body;
      });
    this.getQuestions(eventId);
  },
  methods: {
    closePage: function(eventId) {
      this.$router.push({ name: "detail", params: { eventId: eventId } });
    },
    getQuestions: function(eventId) {
      this.$http
        .get(`${process.env.VUE_APP_API_URL}events/${eventId}/questions`)
        .then(function(data) {
          this.questions = data.body;
        });
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

.scrollbar {
  padding: 0 20px;
  max-width: 700px;
  max-height: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
  &-speaker {
    @include desktop {
      max-height: 400px;
      position: absolute;
      // top: 40%;
      left: 40%;
    }
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
