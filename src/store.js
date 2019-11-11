import Vue from 'vue';
import Vuex from 'vuex';
import controlLineModel from '@/data/ControlLineModel.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bus: [false, false, false, false, false, false, false, false],
    registers: {},
    clockHigh: false,
    controlLines: controlLineModel,
    memory: {},
  },
  mutations: {
    // BUS
    FULL_SET_BUS: (state, payload) => {
      Vue.set(state, 'bus', payload.slice());
    },
    UPDATE_BUS: (state, payload) => {
      let updatedBus = [...state.bus];
      updatedBus[payload.index] = parseInt(payload.value);
      Vue.set(state, 'bus', updatedBus.slice());
    },
    RESET_BUS: (state) => {
      Vue.set(state, 'bus', [
        ...[false, false, false, false, false, false, false, false],
      ]);
    },

    // CLOCK
    SET_CLOCK_STATE: (state, payload) => {
      Vue.set(state, 'clockHigh', payload);
    },

    // REGISTERS
    SET_REGISTER: (state, payload) => {
      Vue.set(state.registers, payload.registerName, payload.value);
    },
    RESET_REGISTER: (state, payload) => {
      Vue.set(state.registers, payload, [
        false, false, false, false, false, false, false, false,
      ]);
    },

    // RAM
    // memoryAddress: As base10 location
    SET_MEMORY_LOCATION: (state, payload) => {
      Vue.set(state.memory, payload.memoryAddress, payload.value);
    },

    // CONTROL LINES
    UPDATE_CONTROL_LINES: (state, payload) => {
      Vue.set(state.controlLines, payload.line, payload.value);
    },
    RESET_CONTROL_LINES: (state, payload) => {
      Vue.set(state, 'controlLines', payload);
    },
  },
});
