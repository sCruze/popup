import Vue from "vue";
import Vuex from "vuex";
import salary from "./modules/salary"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    salary
  },
});
