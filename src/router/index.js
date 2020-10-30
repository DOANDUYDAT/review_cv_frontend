/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";

import authService from "@/api/authentication";

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
        component: Home,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "Login",
        name: "Login",
        component: (/* webpackChunkName: "login" */) =>
          import("../views/Login.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "SignUpMember",
        name: "Sign Up Member",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/SignUpMember"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "SignUpSpecialist",
        name: "Sign Up Specialist",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/SignUpSpecialist"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "SignUpVolunteer",
        name: "Sign Up Volunteer",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/SignUpVolunteer"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "About",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/Admin",
    name: "Admin",
    component: (/* webpackChunkName: "admin" */) =>
      import("../views/Layout/AdminLayout.vue"),
    meta: {
      requiresAuth: true,
      roles: ["admin"]
    },
    children: [
      {
        path: "Members",
        name: "Members",
        component: (/* webpackChunkName: "login" */) =>
          import("../views/Admin/members/Members.vue"),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "New-members",
        name: "New-members",
        component: (/* webpackChunkName: "login" */) =>
          import("../views/Admin/members/NewMembers.vue"),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "Specialists",
        name: "Specialists",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/Admin/specialists/Specialists.vue"),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "New-specialists",
        name: "New-specialists",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/Admin/specialists/NewSpecialists.vue"),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "Volunteers",
        name: "Volunteers",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/Admin/volunteers/Volunteers.vue"),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "New-volunteers",
        name: "New-volunteers",
        component: (/* webpackChunkName: "signup" */) =>
          import("../views/Admin/volunteers/NewVolunteers.vue"),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      }
    ]
  },
  {
    path: "/Forbidden",
    name: "Forbidden",
    component: (/* webpackChunkName: "signup" */) =>
      import("../views/Forbidden.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    name: "Page Not Found",
    component: PageNotFound,
    meta: {
      requiresAuth: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  authService
    .reAuthenticate()
    .then(user => {
      // TH1: đang đăng nhập mà vaò page không yêu cầu đăng nhập thì redirect tới /About
      if (!to.matched.some(record => record.meta.requiresAuth)) {
        next({
          path: "/About"
        });
      }
      // TH2: page yêu cầu đăng nhập, nhưng không yêu cầu quyền
      if (!to.meta.roles) {
        next();
      } else {
        // TH3: page yêu cầu quyền
        if (to.meta.roles.includes(user.role)) {
          next();
        } else {
          // TH4: không có quyền
          next({
            path: "/Forbidden",
            query: { redirect: to.fullPath }
          });
        }
      }
    })
    .catch(err => {
      // TH5: chưa đăng nhập mà vào page yêu đăng nhập thì redirect tới /Login
      if (to.matched.some(record => record.meta.requiresAuth)) {
        next({
          path: "/Login",
          query: { redirect: to.fullPath }
        });
      } else {
        // TH6: page không yêu cầu đăng nhập
        next();
      }
    });
});

export default router;
