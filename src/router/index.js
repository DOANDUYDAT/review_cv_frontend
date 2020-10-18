import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/About",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/Login",
    name: "Login",
    component: (/* webpackChunkName: "login" */) => import("../views/Login.vue")
  },
  {
    path: "/SignUpMember",
    name: "Sign Up Member",
    component: (/* webpackChunkName: "signup" */) =>
      import("../views/SignUpMember")
  },
  {
    path: "/SignUpSpecialist",
    name: "Sign Up Specialist",
    component: (/* webpackChunkName: "signup" */) =>
      import("../views/SignUpSpecialist")
  },
  {
    path: "/SignUpVolunteer",
    name: "Sign Up Volunteer",
    component: (/* webpackChunkName: "signup" */) =>
      import("../views/SignUpVolunteer")
  },
  {
    path: "*",
    name: "Page Not Found",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
