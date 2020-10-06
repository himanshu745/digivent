<template>
  <div>
    <h3>Ask Question</h3>

    <div class="thumb thumb--b">
      <img :src="question.speaker.image" :alt="question.speaker.firstName" />
    </div>
    <p>Host name</p>
    <h3>{{ question.speaker.firstName }} {{ question.speaker.lastName }}</h3>
    <p>Event name</p>

    <h3>{{ question.event.name }}</h3>
    <router-link
      :to="{ name: 'question', params: { eventId: question.event._id } }"
      >View Questions
    </router-link>
    <p>User name</p>
    <h3>{{ userName }}</h3>

    <form v-on:submit.prevent="checkForm">
      <div>
        <label for="body">Question</label>
        <input
          v-model="question.body"
          id="question"
          name="question"
          type="text"
          placeholder="Type here.."
        />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "post-question",

  data: function () {
    return {
      userName: String,
      question: {
        speaker: {
          firstName: String,
          lastName: String,
          image: String,
        },
        event: {
          name: String,
        },
        body: null,
      },
    };
  },
  methods: {
    checkForm: function () {
      if (this.question.body) {
        this.createQuestion(this.question);
      }
    },
    createQuestion: function (question) {
      const userId = localStorage.userId;
      console.log(question);
      this.$http
        .post(
          `${process.env.VUE_APP_API_URL}users/${userId}/question`,
          question
        )
        .then(function () {
          this.$router.push({
            name: "question",
            params: { eventId: this.question.event._id },
          });
        });
    },
  },
  mounted: function () {
    this.userName = localStorage.userName;
    const eventId = this.$route.params.eventId;
    this.$http
      .get(`${process.env.VUE_APP_API_URL}events/${eventId}`)
      .then(function (data) {
        this.question.event = data.body;
        this.question.speaker = data.body.speaker;
      });
  },
};
</script>

<style lang="scss">
@import "@/style/_variables.scss";
// .flexbox {
//   display: flex;
//   align-items: center;
//   overflow: hidden;
// }
// .thumb {
//   @include thumb-img;
//   &--b {
//     @include thumb-img--b;
//   }
// }
</style>
