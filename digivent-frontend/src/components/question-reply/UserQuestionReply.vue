<template>
  <div>
    <div>
      <div class="thumb thumb--b">
        <img :src="question.speaker.image" :alt="question.speaker.firstName" />
      </div>
      <p>Host name</p>
      <h3>{{ question.speaker.firstName }} {{ question.speaker.lastName }}</h3>

      <div>
        <div>
          <h4>User Name</h4>
          <h3>{{ question.user.userName }}</h3>
          <!-- <h4>{{ question.event.name }}</h4> -->
          <h4>Question</h4>
          <p>{{ question.body }}</p>
          <hr />
          <h4>Response</h4>
          <p>{{question.response}}</p>
          <hr />
          <div v-if="isSpeaker === 'yes'" class="response response--yes">
            <form v-on:submit.prevent="checkForm">
              <div>
                <input
                  v-model="question.response"
                  id="response"
                  name="response"
                  type="text"
                  placeholder="Type response here.."
                />
              </div>
              <div>
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-reply-question",
  data: function() {
    return {
      // userName: String,
      question: {
        speaker: {
          firstName: String,
          lastName: String,
          image: String
        },
        event: {
          name: String
        },
        body: null,
        response: null,
        user: {}
      },
      isEmpty: "no",
      isSpeaker: "no"
    };
  },

  // mounted: function() {
  //   if (localStorage.speakerId) {
  //     const speakerId = localStorage.speakerId;
  //     this.getQuestions(speakerId, "speakers");
  //   } else if (localStorage.userId) {
  //     const userId = localStorage.userId;
  //     // const questionId = "5f7cd17e806e9c0978c5b9c7";
  //     this.getQuestions(userId, "users");
  //   } else {
  //     this.$router.push({ path: "/login" });
  //     alert("Need to login");
  //   }

  // },

  mounted: function() {
    if (localStorage.speakerId) {
      this.isSpeaker = "yes";
    }
  },

  methods: {
    getQuestion: function() {
      const id = this.$route.params.questionId;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}questions/${id}`)

        .then(function(data) {
          this.question = data.body;
        });
    },

    checkForm: function() {
      if (this.question.response) {
        this.responseQuestion(this.question);
      }
    },

    responseQuestion: function(question) {
      const questionId = question._id;
      console.log(questionId);
      this.$http
        .put(
          `${process.env.VUE_APP_API_URL}questions/${questionId}/response`,
          question
        )
        .then(function() {
          this.$router.push({
            name: "question",
            params: { eventId: this.question.event._id }
          });
        });
    }
  },

  created: function() {
    this.getQuestion();
  }
};
</script>

<style lang="scss">
@import "@/style/_variables.scss";

.response {
  visibility: hidden;

  &--yes {
    visibility: visible;
  }
}

// .thumb {
//   @include thumb-img;
//   &--b {
//     @include thumb-img--b;
//   }
// }
</style>