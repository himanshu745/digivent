<template>
  <div>
    <div v-if="isEmpty == 'no'">
      <h1>My Questions</h1>
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
      <!-- <router-link
        :to="{ name: 'post-question', params: { eventId: event._id } }"
        >Ask question
      </router-link> -->
    </div>
    <div v-else>
      <h1>My Questions</h1>
      <h3>You don't have any questions.</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-questions",
  data: function() {
    return {
      isEmpty: "no",
      questions: [],
    };
  },
  mounted: function() {
    if (localStorage.speakerId) {
      const speakerId = localStorage.speakerId;
      this.getQuestions(speakerId, "speakers");
    } else if (localStorage.userId) {
      const userId = localStorage.userId;
      this.getQuestions(userId, "users");
    } else {
      this.$router.push({ path: "/login" });
      alert("Need to login");
    }
  },
  //   created: function() {
  //     this.getQuestions();
  //   },
  methods: {
    getQuestions: function(id, person) {
      this.$http
        .get(`${process.env.VUE_APP_API_URL}${person}/${id}/questions`)
        .then(function(data) {
          this.questions = data.body;
        });
      if (this.questions.length > 0) {
        this.isEmpty = "yes";
      } else {
        this.isEmpty = "no";
      }
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
