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
<<<<<<< HEAD
    component: () => import("./components/edit-event/EditEvent"),
=======
    component: () => import("./components/edit-event/EditEvent.vue"),
    props: true,
  },
  {
    name: "Register",
    path: "/register",
    // component: () => import("./components/")
>>>>>>> origin/userlogin
    props: true,
  },
  {
    name: "login",
    path: "/login",
    component: () => import("./components/login/Login"),
  },
<<<<<<< HEAD
  {
    name: "register-user",
    path: "/register-user",
    component: () => import("./components/register/RegisterUser"),
    props: true,
=======
 {
  name: "registeruser",
  path: "/registeruser",
  component: () => import("./components/register/RegisterUser.vue"),
  props: true,
>>>>>>> origin/userlogin
  },
  {
    name: "register-speaker",
    path: "/register-speaker",
    component: () => import("./components/register/RegisterSpeaker"),
    props: true,
<<<<<<< HEAD
  },
=======
    }
>>>>>>> origin/userlogin
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
