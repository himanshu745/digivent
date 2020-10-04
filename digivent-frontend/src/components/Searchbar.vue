<template>
  <div>
    <form>
      <label for="search">Search Event</label>
      <input @input="searchEvent" :search="search" type="text" id="search" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Searchbar",
  props: {
    search: null,
  },
  methods: {
    searchEvent($event) {
      this.$emit("input", $event.target.value);
    },
  },
};
</script>

<style></style>
