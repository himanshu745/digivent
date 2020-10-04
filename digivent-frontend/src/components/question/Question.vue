<template>
  <div>
    <div>
      <h1>Questions</h1>
      <div class="thumb thumb--b">
        <img :src="event.speaker.image" :alt="event.speaker.firstName" />
      </div>
      <p>Host name</p>
      <h3>{{ event.speaker.firstName }} {{ event.speaker.lastName }}</h3>
      <h3>{{ event.name }}</h3>
      <div v-for="(question, i) in questions" :key="i">
        <div class="thumb">
          <img :src="question.user.image" :alt="question.user.userName" />
        </div>
        <div>
          <h3>{{ question.user.userName }}</h3>
          <h4>{{ question.event.name }}</h4>
          <p>{{ question.body }}</p>
        </div>
      </div>
      <router-link
        :to="{ name: 'post-question', params: { eventId: event._id } }"
        >Ask question
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "question",
  data: function() {
    return {
      questions: [],
      event: {
        speaker: {
          firstName: String,
          lastName: String,
          image: String,
        },
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
    getQuestions: function(eventId) {
      this.$http
        .get(`${process.env.VUE_APP_API_URL}events/${eventId}/questions`)
        .then(function(data) {
          console.log(this.questions);
          this.questions = data.body;
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/style/_variables.scss";
.flexbox {
  display: flex;
  align-items: center;
  overflow: hidden;
}
.thumb {
  @include thumb-img;
  &--b {
    @include thumb-img--b;
  }
}
</style>
