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
    component: () => import("./components/event/EventPage"),
    props: true,
  },
  {
    name: "edit",
    path: "/events/:eventId?/edit",
    component: () => import("./components/edit-event/EditEvent"),
    props: true,
  }, 
  {
    name: "details",
    path: "/events/:eventId/details",
    component: () => import("./components/event-details/EventDetails.vue"),
    props: true,
  },

  {
    name: "profilespeaker",
    path: "/profilespeaker",
    component: () => import("./components/profile/ProfileSpeaker.vue"),
    props: true,
  },
    {
      name: "profileuser",
      path: "/profileuser",
      component: () => import("./components/profile/ProfileUser.vue"),
      props: true,
      },
      {
    name: "login",
    path: "/login",
    component: () => import("./components/login/Login"),
  },
  {
    name: "register-user",
    path: "/register-user",
    component: () => import("./components/register/RegisterUser"),
    props: true,
  },
  {
    name: "register-speaker",
    path: "/register-speaker",
    component: () => import("./components/register/RegisterSpeaker"),
    props: true,
  },
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
