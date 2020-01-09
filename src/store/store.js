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

    // Used ONLY for the info panel / educational purposes.
    infoPanelObject: {
      pcClone: 0, // Computer relies on PC set/read from bus like in a real pc.
    },
  },
  mutations: {
    // BUS
    FULL_SET_BUS: (state, payload) => {
      Vue.set(state, 'bus', payload.slice());
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
    SET_CONTROL_LINE_LOW: (state, line) => {
      Vue.set(state.controlLines, line, false);
    },
    SET_CONTROL_LINE_HIGH: (state, line) => {
      Vue.set(state.controlLines, line, true);
    },
    RESET_CONTROL_LINES: (state, payload) => {
      Vue.set(state, 'controlLines', payload);
    },

    // PC CLONE FOR EDUCATIONAL PURPOSES
    SET_CLONE_PC: (state, payload) => {
      Vue.set(state.infoPanelObject, 'pcClone', payload);
    },
  },
});
