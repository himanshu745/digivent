<template>
  <div>
    <!-- Nav bar for web -->
    <div class="d-none d-sm-flex navbar">
      <img src="@/assets/logo-icon.svg/" class="logo mr-auto" alt="logo" />
      <router-link class="link" v-bind:to="'/'">Home</router-link>
      <router-link class="link" :to="'/my-questions'">Questions</router-link>
      <router-link class="link" :to="'/my-events'">My Events</router-link>
      <router-link class="link" :to="'/profile'">Profile</router-link>
      <a class="link" v-if="loggedIn === 'yes'" @click.prevent="setLoggedOut">Log Out</a>
      <router-link class="link" v-else v-bind:to="'/login'">Login</router-link>
    </div>

    <!-- Nav bar for mobile -->
    <div class="d-flex d-sm-none navbar" absolute color="primary">
      <router-link class="link" v-bind:to="'/'">
        <svg width="36" viewBox="0 0 36 35">
          <path
            fill-rule="evenodd"
            d="M8.75945 14.5837L17.6864 5.83172L26.6134 14.5837H26.6114V29.167H8.76145V14.5837H8.75945ZM5.78645 17.4984L3.58968 19.6521L1.48755 17.5911L15.5846 3.77054C16.7454 2.63248 18.6275 2.63248 19.7883 3.77054L33.8853 17.5911L31.7832 19.6521L29.5864 17.4984V29.167C29.5864 30.7778 28.2545 32.0837 26.6114 32.0837H8.76145C7.1184 32.0837 5.78645 30.7778 5.78645 29.167V17.4984Z"
          />
        </svg>
        <span>Home</span>
      </router-link>
      <router-link class="link" :to="'/my-questions'">
        <svg width="35" viewBox="0 0 35 35">
          <path
            d="M8.57494 31.7982L17.274 26.2503H28.5833C30.1619 26.2503 31.4416 24.9445 31.4416 23.3337V5.83366C31.4416 4.22283 30.1619 2.91699 28.5833 2.91699H5.71661C4.138 2.91699 2.85828 4.22283 2.85828 5.83366V23.3337C2.85828 24.9445 4.138 26.2503 5.71661 26.2503H8.57494V31.7982ZM16.4542 23.3337L11.4333 26.5358V23.3337H5.71661V5.83366H28.5833V23.3337H16.4542ZM10.0041 18.9587V16.042H20.0083V18.9587H10.0041ZM10.0041 10.2087V13.1253H22.8666V10.2087H10.0041Z"
          />
        </svg>
        <span>Questions</span>
      </router-link>
      <router-link class="link" :to="'/my-events'">
        <svg width="35" viewBox="0 0 35 35">
          <path
            fill-rule="evenodd"
            d="M11.4333 8.75033H8.57494V7.29199H5.71661V11.667H28.5833V7.29199H25.7249V8.75033H22.8666V7.29199H11.4333V8.75033ZM5.71661 29.167V14.5837H28.5833V29.167H5.71661ZM22.8666 4.37533H11.4333V2.91699H8.57494V4.37533H5.71661C4.138 4.37533 2.85828 5.68116 2.85828 7.29199V29.167C2.85828 30.7778 4.138 32.0837 5.71661 32.0837H28.5833C30.1619 32.0837 31.4416 30.7778 31.4416 29.167V7.29199C31.4416 5.68116 30.1619 4.37533 28.5833 4.37533H25.7249V2.91699H22.8666V4.37533ZM17.4111 16.6397C17.3104 16.4091 16.9897 16.4091 16.8889 16.6397L15.6379 19.5036C15.5963 19.5987 15.5082 19.664 15.4068 19.675L12.3508 20.0041C12.1048 20.0306 12.0057 20.3418 12.1895 20.5108L14.4722 22.61C14.548 22.6797 14.5816 22.7853 14.5605 22.8871L13.9229 25.9545C13.8716 26.2015 14.131 26.3938 14.3453 26.2677L17.0072 24.7011C17.0956 24.6491 17.2044 24.6491 17.2928 24.7011L19.9547 26.2677C20.169 26.3938 20.4285 26.2015 20.3771 25.9545L19.7395 22.8871C19.7184 22.7853 19.752 22.6797 19.8278 22.61L22.1105 20.5108C22.2943 20.3418 22.1952 20.0306 21.9492 20.0041L18.8932 19.675C18.7918 19.664 18.7037 19.5987 18.6622 19.5036L17.4111 16.6397Z"
          />
        </svg>
        <span>My Events</span>
      </router-link>
      <router-link class="link" :to="'/profile'">
        <svg width="35" viewBox="0 0 35 35">
          <path
            fill-rule="evenodd"
            d="M17.4999 33.5413C8.64035 33.5413 1.45825 26.3592 1.45825 17.4997C1.45825 8.64011 8.64035 1.45801 17.4999 1.45801C26.3595 1.45801 33.5416 8.64011 33.5416 17.4997C33.5416 26.3592 26.3595 33.5413 17.4999 33.5413ZM28.2909 24.9732C29.7625 22.8523 30.625 20.2767 30.625 17.4997C30.625 10.251 24.7487 4.37472 17.5 4.37472C10.2512 4.37472 4.37497 10.251 4.37497 17.4997C4.37497 20.2767 5.2374 22.8523 6.70903 24.9732C8.35031 22.8052 12.2071 21.8747 17.4999 21.8747C22.7928 21.8747 26.6496 22.8052 28.2909 24.9732ZM26.1984 27.3286C25.7716 25.7938 22.7053 24.7914 17.4999 24.7914C12.2946 24.7914 9.2283 25.7938 8.80146 27.3285C11.1173 29.3796 14.1632 30.6247 17.5 30.6247C20.8367 30.6247 23.8826 29.3796 26.1984 27.3286ZM17.4999 8.74972C13.9694 8.74972 11.6665 11.3102 11.6665 14.5831C11.6665 19.5813 14.2345 21.8747 17.4999 21.8747C20.7346 21.8747 23.3332 19.6575 23.3332 14.8747C23.3332 11.552 21.0206 8.74972 17.4999 8.74972ZM14.5832 14.583C14.5832 17.8923 15.7765 18.958 17.4999 18.958C19.2174 18.958 20.4166 17.9348 20.4166 14.8746C20.4166 13.0523 19.2728 11.6663 17.4999 11.6663C15.6533 11.6663 14.5832 12.856 14.5832 14.583Z"
          />
        </svg>
        <span>Profile</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import EventBus from "../eventBus";
export default {
  name: "navbar",
  data: function() {
    return {
      loggedIn: "no",
      userName: ""
    };
  },
  methods: {
    setLoggedOut: function() {
      console.log("logout");
      localStorage.loggedIn = "no";
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("speakerId");
      EventBus.$emit("$loggedIn");
      this.$router.push({ path: "/login" });
    },
    setLoggedIn: function() {
      console.log("login");
      this.loggedIn = localStorage.loggedIn;
      this.userName = localStorage.userName;
    }
  },
  mounted() {
    this.loggedIn = localStorage.getItem("loggedIn");
    this.userName = localStorage.getItem("userName");
    EventBus.$on("$loggedIn", this.setLoggedIn);
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/_variables.scss";
.logo {
  width: 50px;
  margin-left: 50px;
}
.navbar {
  display: flex;
  justify-content: flex-end;
  z-index: 1;
  background-color: $primary;
  .link {
    color: $secondary-light;
    padding: 20px;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    &:hover {
      color: $secondary;
    }
  }
  .router-link-exact-active {
    color: $secondary;
  }
  @include mobile {
    padding: 0;
    position: fixed;
    bottom: 0;
    justify-content: space-around;
    background-color: white;
    border-top: 1px solid rgb(218, 218, 218);
    width: 100%;

    .link {
      display: flex;
      flex-direction: column;
      height: auto;
      align-items: center;
      color: $natural-light;
      font-size: 0.6rem;
      color: $natural-light;
    }
    path {
      fill: $natural-light;
    }
    .router-link-exact-active {
      color: $primary;
      path {
        fill: $primary;
      }
    }
  }
}
</style>

