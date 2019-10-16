<template>
  <div class="ProgramCounter">
    <h1>Program Counter</h1>

    <div class="led" :class="{ redled : controlLines.programCounterOut }">
      <span>w</span>
    </div>
    <div class="break"></div> 

    <div class="input-area">
      <input
        type="text"
        v-for="(counterLine, index) in displayProgramCounter"
        :key="index"
        :value="counterLine === true ? 1 : 0"
        class="bus-line"
        :class="{ lineHigh : counterLine === true }"
        disabled
      />
    </div>

    <button
      @click="handleActiveClick"
      :class="{ active : controlLines.programCounterEnabled }"
    >ENABLE</button>
    <button @click="writePCToBus">WRITE</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import {
  boolArrayToBase10,
  base10ToBoolArray,
} from '../../utils/BusConversions.js';

export default {
  name: 'ProgramCounter',
  data: function() {
    return {
      programCounterValue: [false, false, false, false], // 4 bit PC
    };
  },
  computed: {
    ...mapState(['bus', 'clockHigh', 'controlLines']),
    displayProgramCounter() {
      return [...this.programCounterValue].reverse();
    },
  },
  methods: {
    ...mapMutations({
      fullSetBus: 'FULL_SET_BUS',
      updateControlLine: 'UPDATE_CONTROL_LINES',
    }),
    handleActiveClick() {
      this.updateControlLine({
        line: 'programCounterEnabled',
        value: !this.controlLines.programCounterEnabled,
      });
    },
    writePCToBus() {
      var _bus = [...this.bus]
      var _flipped = [...this.programCounterValue]
      for (let i = 0; i < _bus.length; i++) {
        if (_flipped[i]) {
          _bus[i] = _flipped[i];
        }
      }
      this.fullSetBus(
        _bus
      );
    },
  },
  watch: {
    clockHigh: function() {
      if (this.controlLines.programCounterEnabled) {
        if (this.clockHigh) {
          var busAsBase10 = boolArrayToBase10(this.programCounterValue);

          // Add 1 to converted bus
          busAsBase10 = busAsBase10 + 1;

          this.programCounterValue = base10ToBoolArray(
            busAsBase10,
            this.programCounterValue.length,
          );

          if (this.controlLines.programCounterOut) {
            this.writePCToBus();
          }
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.ProgramCounter {
  border: 2px solid $color-eucalyptus;
  padding: 5px;
  margin: 5px;
  min-width: 163px;
}
</style>
