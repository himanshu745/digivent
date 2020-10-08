<template>
  <div class="body-inner">
    <div v-if="isEmpty == 'no'">
      <h1>Questions</h1>
      <div class="flexbox" v-for="(question, i) in questions" :key="i">
        <router-link :to="{ name: 'user-reply-question', params: { questionId : question._id, eventId: question.event._id}}">
          <div class="thumb">
            <img :src="question.user.image" :alt="question.user.userName" />
          </div>
          <div class="border-box" @click="isSeen($event, i)">
            <h3>{{ question.user.userName }}</h3>
            <h5>{{ question.event.name }}</h5>
            <h6>{{ question.body }}</h6>
          </div>
          <div class="dot">
            <div
              class="dot-unread"
              v-if="seen[i]"
              :class="{ seen: seen[i] }"
            ></div>
            <div class="dot-unread" v-else></div>
          </div>
        </router-link>
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
      seen: {},
      isEmpty: "no",
      questions: [],
    };
  },
  mounted: function() {
    if (localStorage.speakerId) {
      const speakerId = localStorage.speakerId;
      this.getQuestions(speakerId, "speakers");
    }
    if (localStorage.userId) {
      const userId = localStorage.userId;
      this.getQuestions(userId, "users");
    }
  },
  methods: {
    isSeen: function(event, i) {
      if (this.seen[i]) {
        this.seen[i] = false;
      } else if (!this.seen[i]) {
        this.$set(this.seen, i, true);
      }
    },
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

// .flexbox {
//   @include message-box;
// }
// .thumb {
//   @include thumb-img;
//   &--b {
//     @include thumb-img--b;
//   }
// }
// .border-box {
//   width: 100%;
//   padding: 5px 0;
//   overflow: hidden;
//   border-bottom: 1px solid rgb(218, 218, 218);
//   h3,
//   h5,
//   h6 {
//     width: 90%;
//   }
// }
// .dot {
//   top: 0;
//   right: 0;
//   display: block;
//   position: relative;
//   float: right;
//   &-unread {
//     position: absolute;
//     top: 0px;
//     right: 0px;
//     padding: 5px 5px;
//     border-radius: 50%;
//     background: $secondary;
//   }
// }
// .seen {
//   background: none;
// }
</style>
