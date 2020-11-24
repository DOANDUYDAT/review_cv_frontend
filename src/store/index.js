import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user.js";
import Cv from "./modules/cv";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  // modules: {}
  modules: {
    User,
    Cv
  },
  strict: debug
});
