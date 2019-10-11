import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bus: [],
    clockHigh: false,
  },
  mutations: {

    // BUS
    FULL_SET_BUS: (state, updatedBus) => {
      Vue.set(state, 'bus', [...updatedBus]);
    },
    FULL_SET_BUS_LINE: (state, line, value) => {
      Vue.set(state, 'bus', [...(state.bus[line] = value)]);
    },
    RESET_BUS: state => {
      Vue.set(state, 'bus', [...[0,0,0,0,0,0,0,0]]);
    },

    // CLOCK
    SET_CLOCK_STATE: (state, pulse) => {
      Vue.set(state, 'clockHigh', pulse);
    },
  },
  getters: {
    getBus(state) {
      return state.bus;
    },
  },
});
