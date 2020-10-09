<template>
  <div>
    <div class="heading">
      <div class="heading-main">
        <img src="@/assets/chevron-left.svg" alt="chevron-left" @click.prevent="goBack" />
        <h2 class="heading-text">Host Details</h2>
      </div>
    </div>
    <div class="round-box">
      <div class="speaker">
        <div class="speaker-img">
          <img :src="speaker.image" :alt="speaker.firstName" />
        </div>
        <div class="speaker-name">
          <h1 class="speaker-name">{{ speaker.firstName }} {{ speaker.lastName }}</h1>
        </div>
      </div>
      <div class="about">
        <h2>About</h2>
        <p>{{ speaker.description }}</p>
      </div>
      <div class="question">
        <router-link class="btn btn--light" :to="{ name: 'question' }">View Questions</router-link>
      </div>

      <h2 class="event-heading">Up Coming Event</h2>
      <v-flex class="contents">
        <div class="contents__box" v-for="event in speaker.events" :key="event._id">
          <router-link
            v-bind:to="{
          name: 'detail',
          params: { eventId: event._id },
          path: 'book',
        }"
          >
            <v-img class="contents__img" :src="event.image" :alt="event.name" />

            <h2>{{ event.name }}</h2>
          </router-link>
        </div>
      </v-flex>
    </div>
  </div>
</template>

<script>
export default {
  name: "speaker-detail",
  props: ["events"],
  data: function() {
    return {
      speaker: {
        events: []
      }
    };
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
    getSpeaker: function() {
      const id = this.$route.params.speakerId;
      console.log(id);
      this.$http
        .get(`${process.env.VUE_APP_API_URL}speakers/${id}`)
        .then(function(data) {
          this.speaker = data.body;
        });
    }
  },
  created: function() {
    this.getSpeaker();
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";

.heading {
  background: #05386b;
  display: flex;
  @include mobile{
    width: 100%
  }
}
.heading-text {
  margin-top: 1rem;
}

.heading-main {
  color: white;
  margin-top: 6rem;
  margin-bottom: 10rem;
  margin-left: 5rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
}
.round-box {
  background: white;
  position: absolute;
  top: 2%;
  padding: 50px;
  margin: 5%;
  border-radius: 55px 55px 0px 0px;
  @include desktop {
    width: 80%;
    height: 10%;
    top: 35%;
    bottom: 0;
    margin: 0 5% 5%;
  }
  @include mobile {
    top: 52%;
  }
}

.speaker-img {
  display: flex;
  justify-content: flex-end;
  margin-top: -9rem;
  img {
    display: flex;
    border: solid #ffffff 8px;
    border-radius: 53%;
    width: 185px;
    height: 186px;
  }
}

.about {
  margin-top: 2rem;
  position: absolute;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #5f5f5f;
}
.question {
  margin-top: 8rem;
  margin-bottom: 3rem;
}
.event-heading {
  margin-bottom: 1rem;
}
.contents {
  padding-bottom: 24px;
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  &__box {
    margin-right: 20px;
  }
  &__img {
    border-radius: 20px;
    height: 400px;
    width: 300px;
    margin: 8px 0;
    overflow: hidden;
  }
}
</style>
