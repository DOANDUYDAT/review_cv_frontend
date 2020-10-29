import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: (/* webpackChunkName: "admin" */) =>
      import("../views/Layout/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: Home
      },
      {
        path: "Login",
        name: "Login",
        component: (/* webpackChunkName: "login" */) =>
          import("../views/Login.vue")
      },
      {
        path: "SignUpMember",
        name: "Sign Up Member",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/SignUpMember")
      },
      {
        path: "SignUpSpecialist",
        name: "Sign Up Specialist",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/SignUpSpecialist")
      },
      {
        path: "SignUpVolunteer",
        name: "Sign Up Volunteer",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/SignUpVolunteer")
      }
    ]
  },
  {
    path: "/Admin",
    name: "Admin",
    component: (/* webpackChunkName: "admin" */) =>
      import("../views/Layout/AdminLayout.vue"),
    children: [
      {
        path: "Members",
        name: "Members",
        component: (/* webpackChunkName: "login" */) =>
          import("../views/Admin/members/Members.vue")
      },
      {
        path: "New-members",
        name: "New-members",
        component: (/* webpackChunkName: "login" */) =>
          import("../views/Admin/members/NewMembers.vue")
      },
      {
        path: "Specialists",
        name: "Specialists",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/Admin/specialists/Specialists.vue")
      },
      {
        path: "New-specialists",
        name: "New-specialists",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/Admin/specialists/NewSpecialists.vue")
      },
      {
        path: "Volunteers",
        name: "Volunteers",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/Admin/volunteers/Volunteers.vue")
      },
      {
        path: "New-volunteers",
        name: "New-volunteers",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/Admin/volunteers/NewVolunteers.vue")
      }
    ]
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
