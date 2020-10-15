<template>
  <v-flex class="contents">
    <div class="contents__box" v-for="(event, i) in events" :key="i">
      <router-link
        v-bind:to="{
          name: 'detail',
          params: { eventId: event._id },
        }"
      >
          <div class="contents__img">
            <img :src="event.image" :alt="event.name" />
          </div>
          <h2>{{ event.name }}</h2>
        <h4>{{ event.speaker.firstName }} {{ event.speaker.lastName }}</h4>
      </router-link>
    </div>
  </v-flex>
</template>

<script>
export default {
  name: "EventThumbList",
  props: ["events"],
};
</script>

<style lang="scss">
@import "@/style/_variables.scss";
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
    img {
      height: 100%;
      width: auto;
    }
  }
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background-color: white;
}
::-webkit-scrollbar-thumb {
  background-color: $secondary;
  border-radius: 20px;
}
</style>
