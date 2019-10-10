import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bus: [],
  },
  mutations: {
    FULL_SET_BUS: (state, updatedBus) => {
      Vue.set(state, 'bus', [...updatedBus]);
    },
    FULL_SET_BUS_LINE: (state, line, value) => {
      state.bus[line] = value;
    },
    RESET_BUS: (state) => {
      Vue.set(state, 'bus', [...[0,0,0,0,0,0,0,0]]);
    },
  },
  getters: {
    getBus(state) {
      return state.bus;
    },
  },
});
