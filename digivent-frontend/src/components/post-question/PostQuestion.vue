<template>
  <v-main>
    <div aspect-ratio="1.4" class="header"></div>
    <v-layout column>
      <v-flex class="title">
        <img src="@/assets/Frame 12.svg" alt="Frame" @click.prevent="goBack" />
        <h2>Ask Question</h2>
      </v-flex>
      <v-flex class="rounded-xl rounded-box">
        <v-flex ma-4 class="thumb-speaker">
          <v-img
            class="rounded-circle thumb-img--large"
            aspect-ratio="1"
            :src="question.speaker.image"
            :alt="question.speaker.firstName"
          />
        </v-flex>
        <v-layout>
          <v-form @submit.prevent="checkForm">
            <v-col class="pt-0">
              <h5 class="text--secondary mb-1">Host name</h5>
              <h2 class="font-weight-medium">
                {{ question.speaker.firstName }} {{ question.speaker.lastName }}
              </h2>
            </v-col>
            <v-col class="pt-0">
              <h5 class="text--secondary mb-1">Event name</h5>
              <h2 class="font-weight-medium">
                {{ question.event.name }}
              </h2>
            </v-col>
            <v-col class="py-0">
              <v-textarea
                v-model="question.body"
                label="Type question here.."
                clearable
              ></v-textarea>
            </v-col>
            <v-col class="py-0">
              <input
                class="primary--text btn btn--light"
                type="submit"
                value="Send"
              />
            </v-col>
          </v-form>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-main>
</template>
<script>
export default {
  name: "post-question",

  data: function() {
    return {
      userName: String,
      question: {
        speaker: {},
        event: {},
        body: null,
      },
    };
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
    checkForm: function() {
      if (this.question.body) {
        this.createQuestion(this.question);
      }
    },
    createQuestion: function(question) {
      const userId = localStorage.userId;
      console.log(question);
      this.$http
        .post(
          `${process.env.VUE_APP_API_URL}users/${userId}/question`,
          question
        )
        .then(function() {
          this.$router.push({
            name: "question",
            params: { eventId: this.question.event._id },
          });
        });
    },
  },
  mounted: function() {
    this.userName = localStorage.userName;
    const eventId = this.$route.params.eventId;
    this.$http
      .get(`${process.env.VUE_APP_API_URL}events/${eventId}`)
      .then(function(data) {
        this.question.event = data.body;
        this.question.speaker = data.body.speaker;
      });
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
