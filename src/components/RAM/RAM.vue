<template>
  <div class="RAM">
    <h1>RAM</h1>
    <div class="led" 
      :class="{ redled : controlLines.writeMemoryContentsToBus }"
      title="Write memory contents to BUS">
      <span>w</span>
    </div>
    <div class="led" 
      :class="{ redled : controlLines.readMemoryContentsFromBus }"
      title="Read memory contents from BUS">
      <span>r</span>
    </div>
    <div class="led led--w" 
      :class="{ blueled : controlLines.ramMemoryAddressRegisterReadFromBus }"
      title="Read MAR location from BUS">
      <span>mr</span>
    </div>
    <div class="led led--w" 
      :class="{ blueled : controlLines.ramMemoryAddressRegisterIncrement }"
      title="MAR increment on clock pulse">
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

    <button @click="incrementMemoryAddressRegister">+</button>
    <button @click="decrementMemoryAddressRegister">-</button>
    <button @click="incrementMemoryAddressRegister">PULSE</button>

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

    <button @click="readMemoryContentsFromBus">READ</button>
    <button @click="writeMemoryContentsToBus">WRITE</button>

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
    usableMemoryAddresses() {
      return boolArrayToBase10([...this.memoryAddressRegister].fill(true)) + 1;
    },
    displayMemoryAddressRegister() {
      // Remember, reverse for output as we work with 0 (base10) as our first bit
      return [...this.memoryAddressRegister].reverse();
    },
    displayMemoryAddressContents() {
      let activeAddress = boolArrayToBase10(this.memoryAddressRegister);
      // Remember, reverse for output as we work with 0 (base10) as our first bit
      return [...this.memory[activeAddress]].reverse();
    },
  },
  watch: {
    clockHigh: function() {
      // We may move some of this to clock low...
      if (this.clockHigh) {
        if (this.controlLines.ramMemoryAddressRegisterReadFromBus) {
          this.memoryAddressRegisterReadFromBus();
          return;
        }

        if (this.controlLines.ramMemoryAddressRegisterIncrement) {
          this.incrementMemoryAddressRegister();
          return;
        }

        if (this.controlLines.ramReadMemoryContentsFromBus) {
          this.readMemoryContentsFromBus();
          return;
        }

        if (this.controlLines.ramWriteMemoryContentsToBus) {
          this.writeMemoryContentsToBus();
          return;
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
      fullSetBus: 'FULL_SET_BUS',
    }),
    initializeMemory() {
      let nullState = [false, false, false, false, false, false, false, false];

      for (let i = 0; i < this.usableMemoryAddresses; i++) {
        this.setMemoryLocation({ memoryAddress: i, value: nullState});
      }
    },
    memoryAddressRegisterReadFromBus() {
      this.memoryAddressRegister = this.bus.slice(0, this.memoryAddressRegister.length);
    },
    incrementMemoryAddressRegister() {
      let incremented = boolArrayToBase10(this.memoryAddressRegister) + 1;
      this.memoryAddressRegister = base10ToBoolArray(incremented, this.memoryAddressRegister.length);
    },
    decrementMemoryAddressRegister() {
      let dec = boolArrayToBase10(this.memoryAddressRegister) - 1;
      if (dec < 0) {
        // Loop around for display/debugging ease of use
        dec = this.usableMemoryAddresses - 1;
      }
      this.memoryAddressRegister = base10ToBoolArray(dec, this.memoryAddressRegister.length);
    },
    readMemoryContentsFromBus() {
      let currentMemoryLocation = boolArrayToBase10(this.memoryAddressRegister);
      this.setMemoryLocation({
        memoryAddress: currentMemoryLocation,
        value: [...this.bus],
      });
       return;
    },
    writeMemoryContentsToBus() {
      let currentMemoryLocation = boolArrayToBase10(this.memoryAddressRegister);
      this.fullSetBus([...this.memory[currentMemoryLocation]]);
       return;
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
