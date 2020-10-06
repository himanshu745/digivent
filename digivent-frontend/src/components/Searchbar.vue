<template>
  <div>
    <form>
      <label for="search"></label>
      <input
        @input="searchEvent"
        :search="search"
        placeholder="Search Event or Speaker"
        type="text"
        id="search"
      />
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

<style lang="scss">
@import "@/style/_variables.scss";
#search {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 65px;
  border-radius: 20px;
  border: none;
}
</style>