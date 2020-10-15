<template>
  <v-app>
    <Navbar />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
@import "@/style/_variables.scss";

* {
  text-decoration: none;
  font-weight: 300;
  line-height: 1.2;
  box-sizing: border-box !important;
  //   color: black;
}
h1,
h2 {
  font-weight: 600;
}
// #app {
//   width: 100vw;
//   height: 90vh;
// }

// .body {
//   &-main {
//     position: relative;
//     @include desktop {
//       margin-top: 100px;
//     }
//   }
//   &-round {
//     width: 100%;
//     position: absolute;
//     top: 200px;
//     border-radius: 20px;
//     background: white;
//     padding: 28px;
//   }
// &-inner {
//   width: 100%;
//   padding: 0 16px;
//   @include desktop {
//     margin: 0;
//   }
// }
// &--flex {
//   flex-direction: column;
//   display: flex;
//   align-content: flex-end;
// }
// }
</style>
