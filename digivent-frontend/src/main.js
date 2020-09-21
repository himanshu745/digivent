import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  {
    name: "event",
    path: "/events",
    component: () => import("./components/event/EventPage.vue"),
    props: true,
  },
  {
    name: "edit",
    path: "/events/:eventId?/edit",
    component: () => import("./components/edit-event/EditEvent.vue"),
    props: true,
  },
  {
    name: "Register",
    path: "/register",
    // component: () => import("./components/")
    props: true,
  },
  {
    name: "login",
    path: "/user-login",
    component: () => import("./components/user-login/UserLogIn"),
  },
 {
  name: "registeruser",
  path: "/registeruser",
  component: () => import("./components/register/RegisterUser.vue"),
  props: true,
  },
  {
    name: "registerspeaker",
    path: "/registerspeaker",
    component: () => import("./components/register/RegisterSpeaker.vue"),
    props: true,
    }
];

const router = new VueRouter({
  routes: routes,
  mode: "history",
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
