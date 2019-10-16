import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bus: [false, false, false, false, false, false, false, false],
    registers: {},
    clockHigh: false,
  },
  mutations: {
    // BUS
    FULL_SET_BUS: (state, updatedBus) => {
      Vue.set(state, 'bus', updatedBus.slice());
    },
    UPDATE_BUS: (state, payload) => {
      var updatedBus = [...state.bus];
      updatedBus[payload.index] = parseInt(payload.value);
      Vue.set(state, 'bus', updatedBus.slice());
    },
    RESET_BUS: (state) => {
      Vue.set(state, 'bus', [
        ...[false, false, false, false, false, false, false, false],
      ]);
    },

    // CLOCK
    SET_CLOCK_STATE: (state, pulse) => {
      Vue.set(state, 'clockHigh', pulse);
    },

    // REGISTERS
    SET_REGISTER: (state, payload) => {
      Vue.set(state.registers, payload.registerName, payload.updatedRegister);
    },
    RESET_REGISTER: (state, registerName) => {
      Vue.set(state.registers, registerName, [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]);
    },
  },
});
