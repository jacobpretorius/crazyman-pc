import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bus: [],
  },
  mutations: {
    FULL_SET_BUS: (state, updateBus) => {
      state.bus = updateBus;
    },
    FULL_SET_BUS_LINE: (state, line, value) => {
      state.bus[line] = value;
    },
  },
  getters: {
    getBus(state) {
      return state.bus;
    },
  },
});
