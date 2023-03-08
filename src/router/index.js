import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("@/views/Create.vue"),
  },
  {
    path: "/history",
    name: "History",
    component: () => import("@/views/History.vue"),
  },
  {
    path: "/badge",
    name: "BadgeWall",
    component: () => import("@/views/BadgeWall.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/forget-password",
    name: "ForgetPassword",
    component: () => import("@/views/ForgetPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("@/views/ResetPassword.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  }
];
const Router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default Router;