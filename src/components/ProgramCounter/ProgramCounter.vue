<template>
  <div class="ProgramCounter">
    <h1>Program Counter</h1>

    <div class="led" :class="{ redled : controlLines.programCounterOut }">
      <span>w</span>
    </div>
    <div class="break"></div>

    <div class="input-area">
      <input
        v-for="(counterLine, index) in displayProgramCounter"
        :key="index"
        type="text"
        :value="counterLine === true ? 1 : 0"
        class="bus-line"
        :class="{ lineHigh : counterLine === true }"
        disabled
      />
    </div>

    <button
      :class="{ active : controlLines.programCounterEnabled }"
      @click="handleActiveClick"
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
  watch: {
    clockHigh: function() {
      if (this.controlLines.programCounterEnabled) {
        if (this.clockHigh) {
          let busAsBase10 = boolArrayToBase10(this.programCounterValue);

          // I know, I know. This is dirty. I'll get round to changing it sometime.
          // These operations being bitwise are less important to me than having the Ben Eater CPU running. MVP.

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
      let tempBus = [...this.bus];
      for (let i = 0; i < tempBus.length; i++) {
        if (this.programCounterValue[i]) {
          tempBus[i] = this.programCounterValue[i];
        }
      }
      this.fullSetBus(tempBus);
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
