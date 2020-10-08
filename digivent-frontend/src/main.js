import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import vuetify from "./plugins/vuetify";

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  {
    name: "event",
    path: "/",
    component: () => import("./components/event/Event"),
    props: true,
  },
  {
    name: "edit",
    path: "/:eventId?/edit",
    component: () => import("./components/edit-event/EditEvent"),
    props: true,
  },
  {
    name: "detail",
    path: "/:eventId/detail",
    component: () => import("./components/event-detail/EventDetail"),
    props: true,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("userName")) return next("login");
      next();
    },
  },
  {
    name: "book",
    path: "/booking",
    component: () => import("./components/book/BookEvent"),
    props: true,
  },
  {
    name: "profile",
    path: "/profile",
    component: () => import("./components/profile/Profile"),
    props: true,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("userName")) return next("login");
      next();
    },
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
  {
    name: "post-question",
    path: "/post-question",
    component: () => import("./components/post-question/PostQuestion"),
    props: true,
  },
  {
    name: "question",
    path: "/question",
    component: () => import("./components/question/Question"),
    props: true,
  },
  {
    name: "my-questions",
    path: "/my-questions",
    component: () => import("./components/my-question/MyQuestions"),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("userName")) return next("login");
      next();
    },
  },
  {
    name: "speaker-detail",
    path: "/speaker-detail",
    component: () => import("./components/speaker-detail/SpeakerDetail.vue"),
    props: true,
  },
  {
    name: "user-reply-question",
    path: "/user-reply-question",
    component: () => import("./components/question-reply/UserQuestionReply"),
    props: true,
  },
  {
    name: "my-events",
    path: "/my-events",
    component: () => import("./components/my-event/MyEvent.vue"),
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
  vuetify,
  router,
}).$mount("#app");
