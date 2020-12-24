/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";

import authService from "@/api/authentication";

import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "default" */ "../views/Layout/DefaultLayout.vue"
      ),
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "Login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Login.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "SignUpMember",
        name: "Sign Up Member",
        component: () =>
          import(/* webpackChunkName: "signup" */ "../views/SignUpMember"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "SignUpSpecialist",
        name: "Sign Up Specialist",
        component: () =>
          import(/* webpackChunkName: "signup" */ "../views/SignUpSpecialist"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "SignUpVolunteer",
        name: "Sign Up Volunteer",
        component: () =>
          import(/* webpackChunkName: "signup" */ "../views/SignUpVolunteer"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "About",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/cv",
    component: () =>
      import(/* webpackChunkName: "CV" */ "../views/Layout/CvLayout.vue"),
    meta: {
      requiresAuth: true,
      roles: ["member"]
    },
    children: [
      {
        path: "",
        name: "Quan Ly",
        component: () =>
          import(
            /* webpackChunkName: "CV" */ "../views/Quan_Ly_CV/Quan_Ly.vue"
          ),
        meta: {
          requiresAuth: true,
          roles: ["member"]
        }
      },
      {
        path: "mau-cv",
        name: "MauCV",
        component: () =>
          import(/* webpackChunkName: "CV" */ "../views/Quan_Ly_CV/MauCV.vue"),
        meta: {
          requiresAuth: true,
          roles: ["member"]
        }
      },
      {
        path: "infor",
        name: "InforCV",
        component: () =>
          import(
            /* webpackChunkName: "CV" */ "../views/Quan_Ly_CV/InforCV.vue"
          ),
        meta: {
          requiresAuth: true,
          roles: ["member"]
        }
      },
      {
        path: "edit",
        name: "EditCV",
        component: () =>
          import(/* webpackChunkName: "CV" */ "../views/Quan_Ly_CV/EditCV.vue"),
        meta: {
          requiresAuth: true,
          roles: ["member"]
        }
      },
      {
        path: "content-cv",
        name: "ContentCV",
        component: () =>
          import(
            /* webpackChunkName: "CV" */ "../views/Quan_Ly_CV/CV_content.vue"
          ),
        meta: {
          requiresAuth: true,
          roles: ["member"]
        }
      },
      {
        path: "add-cv",
        name: "AddCV",
        component: () =>
          import(/* webpackChunkName: "CV" */ "../views/Quan_Ly_CV/Add_CV.vue"),
        meta: {
          requiresAuth: true,
          roles: ["member"]
        }
      }
    ]
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Layout/AdminLayout.vue"),
    meta: {
      requiresAuth: true,
      roles: ["admin"]
    },
    children: [
      {
        path: "Members",
        name: "Members",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/Admin/members/Members.vue"
          ),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "Specialists",
        name: "Specialists",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/Admin/specialists/Specialists.vue"
          ),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "New-specialists",
        name: "New-specialists",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/Admin/specialists/NewSpecialists.vue"
          ),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "Volunteers",
        name: "Volunteers",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/Admin/volunteers/Volunteers.vue"
          ),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "New-volunteers",
        name: "New-volunteers",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/Admin/volunteers/NewVolunteers.vue"
          ),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "gifts",
        name: "Gifts",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/Admin/gifts/Gifts.vue"
          ),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "Add-Gift",
        name: "Add-Gift",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/Admin/gifts/AddGift.vue"
          ),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      },
      {
        path: "edit-gift/:giftId",
        name: "Edit-Gift",
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "../views/Admin/gifts/EditGift.vue"
          ),
        meta: {
          requiresAuth: true,
          roles: ["admin"]
        }
      }
    ]
  },
  {
    path: "/memberHome",
    component: () =>
      import(
        /* webpackChunkName: "memberHome" */ "../views/Layout/MemberLayout.vue"
      ),
    meta: {
      requiresAuth: true,
      roles: ["member"]
    },
    children: [
      {
        path: "",
        name: "Upload CV",
        component: () =>
          import(
            /* webpackChunkName: "memberHome" */ "../views/Member/UploadCV.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["member"]
        }
      },
      {
        path: "update-profile",
        name: "Update Profile",
        component: () =>
          import(
            /* webpackChunkName: "memberHome" */ "../views/Member/UpdateProfile.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["member"]
        }
      },
      {
        path: "recent-review-result-list",
        name: "Recent Review Result List",
        component: () =>
          import(
            /* webpackChunkName: "memberHome" */ "../views/Member/RecentReviewResultList.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["member"]
        }
      },
      {
        path: "review-result/:reviewId",
        name: "Review Result",
        component: () =>
          import(
            /* webpackChunkName: "memberHome" */ "../views/Member/ReviewResult.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["member"]
        }
      },
      {
        path: "cv-management",
        name: "CV Management",
        component: () =>
          import(
            /* webpackChunkName: "memberHome" */ "../views/Member/CVManagement.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["member"]
        }
      }
    ]
  },
  {
    path: "/specialistHome",
    component: () =>
      import(
        /* webpackChunkName: "specialistHome" */ "../views/Layout/SpecialistLayout.vue"
      ),
    meta: {
      requiresAuth: true,
      roles: ["specialist"]
    },
    children: [
      {
        path: "",
        name: "Specilist Home",
        component: () =>
          import(
            /* webpackChunkName: "specialistHome" */ "../views/Specialist/Home.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["specialist"]
        }
      },
      {
        path: "update-specialist-profile",
        name: "Update Specialist Profile",
        component: () =>
          import(
            /* webpackChunkName: "specialistHome" */ "../views/Specialist/UpdateSpecialistProfile.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["specialist"]
        }
      },
      {
        path: "received-cv-list",
        name: "Received CV List",
        component: () =>
          import(
            /* webpackChunkName: "specialistHome" */ "../views/Specialist/ReceivedCvList.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["specialist"]
        }
      },
      {
        path: "view-cv/:cvId",
        name: "View Cv",
        component: () =>
          import(
            /* webpackChunkName: "specialistHome" */ "../views/Specialist/ViewCv.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["specialist"]
        }
      },
      {
        path: "reviewed-cv-list",
        name: "Reviewed CV List",
        component: () =>
          import(
            /* webpackChunkName: "specialistHome" */ "../views/Specialist/ReviewedCvList.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["specialist"]
        }
      },
      {
        path: "view-review-result/:cvId",
        name: "View Review Result",
        component: () =>
          import(
            /* webpackChunkName: "specialistHome" */ "../views/Specialist/ViewReviewResult.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["specialist"]
        }
      }
    ]
  },
  {
    path: "/volunteerHome",
    component: () =>
      import(
        /* webpackChunkName: "volunteerHome" */ "../views/Layout/VolunteerLayout.vue"
      ),
    meta: {
      requiresAuth: true,
      roles: ["volunteer"]
    },
    children: [
      {
        path: "",
        name: "Volunteer Home",
        component: () =>
          import(
            /* webpackChunkName: "volunteerHome" */ "../views/Volunteer/Home.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["volunteer"]
        }
      },
      {
        path: "update-volunteer-profile",
        name: "Update Volunteer Profile",
        component: () =>
          import(
            /* webpackChunkName: "volunteerHome" */ "../views/Volunteer/UpdateVolunteerProfile.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["volunteer"]
        }
      },
      {
        path: "convert-point",
        name: "Convert Point",
        component: () =>
          import(
            /* webpackChunkName: "volunteerHome" */ "../views/Volunteer/ConvertPoint.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["volunteer"]
        }
      },
      {
        path: "exchange-gift",
        name: "Exchange Gift",
        component: () =>
          import(
            /* webpackChunkName: "volunteerHome" */ "../views/Volunteer/ExchangeGift.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["volunteer"]
        }
      },
      {
        path: "view-cv/:cvId",
        name: "Volunteer View Cv",
        component: () =>
          import(
            /* webpackChunkName: "volunteerHome" */ "../views/Volunteer/ViewCv.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["volunteer"]
        }
      },
      {
        path: "received-cv-list",
        name: "Volunteer Received CV List",
        component: () =>
          import(
            /* webpackChunkName: "volunteerHome" */ "../views/Volunteer/ReceivedCvList.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["volunteer"]
        }
      },
      {
        path: "reviewed-cv-list",
        name: "Volunteer Reviewed CV List",
        component: () =>
          import(
            /* webpackChunkName: "volunteerHome" */ "../views/Specialist/ReviewedCvList.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["volunteer"]
        }
      },
      {
        path: "view-review-result/:cvId",
        name: "Volunteer View Review Result",
        component: () =>
          import(
            /* webpackChunkName: "volunteerHome" */ "../views/Specialist/ViewReviewResult.vue"
          ),
        meta: {
          requiresAuth: false,
          roles: ["volunteer"]
        }
      }
    ]
  },
  {
    path: "/forums",
    component: () =>
      import(
        /* webpackChunkName: "forums" */ "../views/Layout/ForumsLayout.vue"
      ),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "Forums Home",
        component: () =>
          import(/* webpackChunkName: "forums" */ "../views/Forums/Home.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "questions/:questionId/:questionTitle",
        name: "Question Detail",
        component: () =>
          import(
            /* webpackChunkName: "forums" */ "../views/Forums/Question.vue"
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "questions/ask",
        name: "Question Ask",
        component: () =>
          import(
            /* webpackChunkName: "forums" */ "../views/Forums/QuestionAsk.vue"
          ),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: () =>
      import(/* webpackChunkName: "forbidden" */ "../views/Forbidden.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    name: "Page Not Found",
    component: PageNotFound,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to);
  // authService.getCurrentUserId();
  // if (currentUserId) {

  // } else {

  // }
  authService
    .reAuthenticate()
    .then(user => {
      // TH1: đang đăng nhập mà vaò page không yêu cầu đăng nhập thì redirect tới /About
      if (!to.matched.some(record => record.meta.requiresAuth)) {
        next({
          path: "/forums"
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
