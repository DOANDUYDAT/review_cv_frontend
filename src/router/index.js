import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import AddCV from "../views/Add_CV.vue";
import EditCV from "../views/EditCV.vue";
import ContentCV from "../views/CV_content";
import InforCV from "../views/Quan_Ly_CV/InforCV.vue"
import MauCV from "../views/Quan_Ly_CV/MauCV.vue"
import QuanLy from "../views/Quan_Ly_CV/Quan_Ly.vue"
import Home from "../views/Home";
import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "QuanLy",
    component: QuanLy
  },
  {
    path: "/mau-cv",
    name: "MauCV",
    component: MauCV
  },
  {
    path: "/infor",
    name: "InforCV",
    component: InforCV
  },
  {
    path: "/edit",
    name: "EditCV",
    component: EditCV
  },
  // {
  //   path: "/content",
  //   name: "Editor",
  //   component: () => import("../views/Editor.vue")
  // },
  {
    path: '/content-cv',
    name: "ContentCV",
    component: ContentCV
  },
  {
    path: '/add-cv',
    name: "AddCV",
    component: AddCV
  },

  {
    path: "/about",
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
