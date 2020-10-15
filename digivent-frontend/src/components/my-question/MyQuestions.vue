<template>
  <v-main>
    <div aspect-ratio="1.4" class="header"></div>

    <v-layout column v-if="isEmpty == 'no'">
      <v-flex class="title--center">
        <h1>Questions</h1>
      </v-flex>
      <v-card class="rounded-xl message-box">
        <v-list three-line class="mx-auto scrollbar">
          <template v-for="(question, i) in questions">
              <v-list-item class="flex-row" :key="question._id">
                <router-link class="d-flex" :to="{ name: 'user-reply-question', params: { questionId : question._id, eventId: question.event._id}}">
                  <v-list-item-avatar>
                    <v-img :src="question.user.image" :alt="question.user.userName"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="border-box">
                    <v-list-item-title v-text="question.user.userName"></v-list-item-title>
                    <v-list-item-subtitle class="text--primary" v-text="question.event.name"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="question.body" class="text-break"></v-list-item-subtitle>
                  </v-list-item-content>
                </router-link>
              </v-list-item>   
            <v-divider v-if="i < questions.length - 1" :key="i"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-layout>
    <v-layout column v-else>
      <h1>My Questions</h1>
      <h3>You don't have any questions.</h3>
    </v-layout>
  </v-main>
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

<style lang="scss" scoped>
@import "@/style/_variables.scss";
.title--center {
  width: 100%;
  position: absolute;
  top:60px;
  color: white;
  font-weight: 400;
  text-align: center;
  @include desktop {
    left: 5%;
    top:60px;
  }
}
.header {
  width: 100%;
  height: 30%;
  background: $primary;
    @include desktop {
    height: 60%;
  }
}
.message-box {
  background: white;
  position: absolute;
  top: 15%;
  width: 100%;
  margin-top: 5%;
  padding: 50px 10px;
  bottom: 0;
  @include desktop {
    width: 80%;
    max-width: 700px;
    height: 70%;
    top: auto;
    bottom: 0;
    right:0;
    padding: 50px;
    margin: 0 5% 5%;
  }
}
.scrollbar {
  padding: 0 20px;
  max-width:700px;
  max-height: 450px;
  overflow-y:scroll;
  overflow-x:hidden;
}

// .dot {
//   top: 0;
//   right: 0;
//   display: block;
//   position: relative;
//   float: right;
  // &-unread {
  //   position: absolute;
  //   top: 0px;
  //   right: 0px;
  //   padding: 5px 5px;
  //   border-radius: 50%;
  //   background: $secondary;
  // }
// }
// .seen {
//   background: none;
// }
</style>
