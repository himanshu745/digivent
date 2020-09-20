<template>
  <div>
    <form>
      <label for="search">Search events</label>
      <input v-model="search" type="text" id="search" />
    </form>
  </div>
</template>

<script>
export default {
  name: "MySearchbar",
  props: ["events"],
  data: function() {
    return {};
  },
  //   computed: {
  //     filteredEvents() {
  //       return this.events.filter((event) => {
  //         return event.name.toLowerCase().includes(this.search.toLowerCase());
  //       });
  //     },
  //   },
};
</script>

<style></style>
