<template>
  <div>
    <!-- <div class="contents">
      <div class="contents__box" v-for="(event, i) in events" :key="i">
        <div class="contents__img">
          <img :src="event.image" />
        </div>
        <h4>{{ event.name }}</h4>
        <router-link :to="{ name: 'edit', params: { eventId: event._id} }">edit</router-link>
        <a href v-on:click.prevent="deleteEvent(event._id)">Delete Event</a>
      </div>
    </div> -->
  </div>
</template>

<script>
// import eventBus from "../../eventBus";

export default {
  name: "EventPageItem",
  //   props: ["events"],
};
</script>

<style></style>
