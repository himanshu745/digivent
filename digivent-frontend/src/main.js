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
  },
  {
    name: "edit",
    path: "/:eventId?/edit",
    component: () => import("./components/edit-event/EditEvent"),
  },
  {
    name: "detail",
    path: "/:eventId?/detail",
    component: () => import("./components/event-detail/EventDetail"),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("userName")) return next("login");
      next();
    },
  },
  {
    name: "book",
    path: "/:userId?/:eventId?/booking",
    component: () => import("./components/book/BookEvent"),
  },
  {
    name: "profile",
    path: "/profile",
    component: () => import("./components/profile/Profile"),
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
  },
  {
    name: "register-speaker",
    path: "/register-speaker",
    component: () => import("./components/register/RegisterSpeaker"),
  },
  {
    name: "post-question",
    path: "/:eventId?/post-question",
    component: () => import("./components/post-question/PostQuestion"),
  },
  {
    name: "question",
    path: "/:eventId?/question",
    component: () => import("./components/question/Question"),
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
    path: "/:speakerId?/speaker-detail",
    component: () => import("./components/speaker-detail/SpeakerDetail.vue"),
  },
  {
    name: "user-reply-question",
    path: "/:questionId/user-reply-question",
    component: () => import("./components/question-reply/UserQuestionReply"),
  },
  {
    name: "my-events",
    path: "/my-events",
    component: () => import("./components/my-event/MyEvent.vue"),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("userName")) return next("login");
      next();
    },
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
