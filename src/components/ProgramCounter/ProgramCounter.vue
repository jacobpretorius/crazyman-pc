<template>
  <div class="ProgramCounter">
    <h1>Program Counter</h1>

    <div class="led" :class="{ redled : controlLines.pcWriteCounterToBus }">
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
import { boolArrayToBase10, base10ToBoolArray } from '../../utils/BusConversions.js';

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
      if (this.clockHigh) {
        if (this.controlLines.programCounterEnabled) {
          let busAsBase10 = boolArrayToBase10(this.programCounterValue);

          // I know, I know. This is dirty. I'll get round to changing it sometime.
          // These operations being bitwise are less important to me than having the Ben Eater CPU running. MVP.

          // Add 1 to converted bus
          busAsBase10 = busAsBase10 + 1;

          this.programCounterValue = base10ToBoolArray(
            busAsBase10,
            this.programCounterValue.length,
          );
        }

        if (this.controlLines.pcWriteCounterToBus) {
          this.writePCToBus();
        }
      }
    },
  },
  methods: {
    ...mapMutations({
      fullSetBus: 'FULL_SET_BUS',
      setControlLine: 'UPDATE_CONTROL_LINES',
    }),
    handleActiveClick() {
      this.setControlLine({
        line: 'programCounterEnabled',
        value: !this.controlLines.programCounterEnabled,
      });
    },
    writePCToBus() {
      let tempBus = [...this.bus].fill(false);
      for (let i = 0; i < this.programCounterValue.length; i++) {
        tempBus[i] = this.programCounterValue[i]
      }
      this.fullSetBus(tempBus);
    },
  },
};
</script>

<style scoped lang="scss">
.ProgramCounter {
  min-width: 133px;
  width: 15%;
}
</style>
