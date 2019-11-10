<template>
  <div class="RAM">
    <h1>RAM</h1>
    <div class="led" :class="{ redled : controlLines.writeMemoryContentsToBus }">
      <span>w</span>
    </div>
    <div class="led" :class="{ redled : controlLines.readMemoryContentsFromBus }">
      <span>r</span>
    </div>
    <div class="led led--w" :class="{ blueled : controlLines.ramMemoryAddressRegisterReadFromBus }">
      <span>mr</span>
    </div>
    <div class="led led--w" :class="{ blueled : controlLines.ramMemoryAddressRegisterIncrement }">
      <span>m+</span>
    </div>
    <div class="break"></div>

    <h2>Memory Address Register</h2>
    <div class="input-area">
      <input
        v-for="(marBusLine, index) in displayMemoryAddressRegister"
        :key="`mar-${index}`"
        type="text"
        :value="marBusLine === true ? 1 : 0"
        class="bus-line"
        :class="{ lineHigh : marBusLine === true }"
      />
    </div>

    <h2>Address Contents</h2>
    <div class="input-area">
      <input
        v-for="(busLine, index) in displayMemoryAddressContents"
        :key="`bus-${index}`"
        type="text"
        :value="busLine === true ? 1 : 0"
        class="bus-line"
        :class="{ lineHigh : busLine === true }"
      />
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { boolArrayToBase10, base10ToBoolArray } from '@/utils/BusConversions.js';

export default {
  name: 'RAM',
  data: function() {
    return {
      memoryAddressRegister: [false, false, false, false],
    };
  },
  computed: {
    ...mapState(['bus', 'memory' ,'clockHigh', 'controlLines']),
    displayMemoryAddressRegister() {
      return [...this.memoryAddressRegister].reverse();
    },
    displayMemoryAddressContents() {
      let normalAddress = boolArrayToBase10(this.memoryAddressRegister);
      return [...this.memory[normalAddress]].reverse();
    },
  },
  watch: {
    clockHigh: function() {
      // We may move some of this to clock low...
      if (this.clockHigh) {
        if (this.controlLines.ramMemoryAddressRegisterReadFromBus) {
          this.memoryAddressRegister = this.bus.slice(0, this.memoryAddressRegister.length);
          this.setControlLine({
            line: 'ramMemoryAddressRegisterReadFromBus',
            value: false,
          });
        } else {
          // In the else so we don't do both on one clock pulse
          if (this.controlLines.ramMemoryAddressRegisterIncrement) {
            this.incrementMemoryAddressRegister();
            this.setControlLine({
              line: 'ramMemoryAddressRegisterIncrement',
              value: false,
            });
          }
        }
      }
    },
  },
  created() {
    this.initializeMemory();
  },
  methods: {
    ...mapMutations({
      setMemoryLocation: 'SET_MEMORY_LOCATION',
      setControlLine: 'UPDATE_CONTROL_LINES',
    }),
    incrementMemoryAddressRegister() {
      let incremented = boolArrayToBase10(this.memoryAddressRegister) + 1;
      this.memoryAddressRegister = base10ToBoolArray(incremented, this.memoryAddressRegister.length);
    },
    initializeMemory() {
      let usableMemoryAddresses = this.bus.length * 2;
      let nullState = [false, false, false, false, false, false, false, false];

      for (let i = 0; i < usableMemoryAddresses; i++) {
        this.setMemoryLocation({ memoryAddress: i, value: nullState});
      }
    },
  },
}
</script>

<style scoped lang="scss">
.RAM {
  border: 2px solid $color-eucalyptus;
  padding: 5px;
  margin: 5px;
  min-width: 163px;
}
</style>
