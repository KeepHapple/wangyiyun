import Vue from "vue";
import Vuex from "vuex";
import login from "./login";
import bar from "./bar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    bar,
  },
});
