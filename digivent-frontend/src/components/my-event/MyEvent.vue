<template>
<div class="wrap">
  <div class="contents">
    
    <div v-if="isSpeaker === 'yes'">
      
      <h1>My Events</h1>
      <router-link class="button" :to="{ name: 'edit' }">+ Add New event</router-link>
      <div class="contents__box" v-for="(event, i) in events" :key="i">
        <router-link
          v-bind:to="{ name: 'detail', params: { eventId: event._id } }"
        >
          <h6>{{ event.time }} {{ event.date }}</h6>
          <h2>{{ event.name }}</h2>
        </router-link>
      </div>
    </div>
    

    <div v-else>
              <h1>My Tickets</h1>
      <div class="contents__box" v-for="(event, i) in user.events" :key="i">
        <router-link class="button"
          v-bind:to="{
            name: 'book',
            params: { event: event },
          }"
        >
          <h6>{{ event.time }}  {{ event.date }}</h6>
          <h2>{{ event.name }}</h2>
        </router-link>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: "my-events",

  data: function () {
    return {
      user: {},
      events: [],
      isSpeaker: "no",
    };
  },
  created: function () {
    if (localStorage.speakerId) {
      this.isSpeaker = "yes";
      const id = localStorage.speakerId;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}speakers/${id}/events`)
        .then(function (data) {
          this.events = data.body;
        });
    }
    if (localStorage.userId) {
      const id = localStorage.userId;
            this.isSpeaker = "no";
      this.$http
        .get(`${process.env.VUE_APP_API_URL}users/${id}/events`)
        .then(function(data) {
          this.user = data.body;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/_variables.scss";

.contents {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin-top: 10rem;
  text-align: center;
  width: 60%;

}
.contents__box {
  text-transform: capitalize;
  justify-content: center;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  margin-top: 20px;
  background-color: white;
  color: black;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  text-align: left;
}
.wrap {
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: $primary;
  height: 100vh;
}
h2 {
 text-transform: uppercase;
 font-weight: 600;
}

h6 {
 text-transform: uppercase;
}
h1 {
  color: white;
  font-weight: 600;
  margin-bottom: 1rem;
}
.button {
  background-color: $secondary;
  color: white ;
  filter: drop-shadow(0px 4px 4px $secondary-dark 0.25);
  padding: 10px;
  border-radius: 10px;
}
@media only screen and (min-width: 600px) {
  .wrap {
  justify-content: left;
  padding-left: 10rem;
}
.contents {
  justify-content: left;
  text-align: left;
}
.contents__box {
  justify-content: left;
  text-align: left;
  width: 70%;
}
}
</style>
