<template>
  <div class="ram">
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
        disabled
      />
    </div>

    <button @click="incrementMemoryAddressRegister">+</button>
    <button @click="decrementMemoryAddressRegister">-</button>
    <button @click="incrementMemoryAddressRegister">PULSE</button>
    <button @click="memoryAddressRegisterReadFromBus">READ</button>

    <h2>Address Contents</h2>
    <div class="input-area">
      <input
        v-for="(busLine, index) in displayMemoryAddressContents"
        :key="`bus-${index}`"
        type="text"
        :value="busLine === true ? 1 : 0"
        class="bus-line"
        :class="{ lineHigh : busLine === true }"
        disabled
      />
    </div>

    <button @click="readMemoryContentsFromBus">READ</button>
    <button @click="writeMemoryContentsToBus">WRITE</button>
    <button class="sample-prog" @click="handleLoadSampleProgram">LOAD SAMPLE PROG</button>
    <button class="sample-prog" @click="handleLoadSampleProgram2">LOAD SAMPLE PROG 2</button>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { boolArrayToBase10, base10ToBoolArray } from '@/utils/BusConversions.js';
import SAMPLE_RAM_PROGRAM from '@/data/SAMPLE_RAM_PROGRAM.js';
import SAMPLE_RAM_PROGRAM_2 from '@/data/SAMPLE_RAM_PROGRAM_2.js';

export default {
  name: 'RAM',
  data() {
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
    // If the bus is updated we need to keep reading if set to true
    bus: function() {
      if (this.controlLines.ramMemoryAddressRegisterReadFromBus) {
        this.memoryAddressRegisterReadFromBus();
      }

      if (this.controlLines.ramReadMemoryContentsFromBus) {
        this.readMemoryContentsFromBus();
      }
    },
    // Similar to the above, if we missed an update force update on cl change
    controlLines: function() {
      if (this.controlLines.ramMemoryAddressRegisterReadFromBus) {
        this.memoryAddressRegisterReadFromBus();
      }

      if (this.controlLines.ramWriteMemoryContentsToBus) {
        this.writeMemoryContentsToBus();
      }

      if (this.controlLines.ramReadMemoryContentsFromBus) {
        this.readMemoryContentsFromBus();
      }
    },
  },
  created() {
    this.initializeMemory();
  },
  methods: {
    ...mapMutations({
      setMemoryLocation: 'SET_MEMORY_LOCATION',
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
    },
    writeMemoryContentsToBus() {
      let currentMemoryLocation = boolArrayToBase10(this.memoryAddressRegister);
      this.fullSetBus([...this.memory[currentMemoryLocation]]);
    },
    handleLoadSampleProgram() {
      for (let i = 0; i < this.usableMemoryAddresses; i++) {
        this.setMemoryLocation({ memoryAddress: i, value: [...SAMPLE_RAM_PROGRAM[i]].reverse()});
      }
      console.log('Loaded sample program to RAM');
    },
    handleLoadSampleProgram2() {
      for (let i = 0; i < this.usableMemoryAddresses; i++) {
        this.setMemoryLocation({ memoryAddress: i, value: [...SAMPLE_RAM_PROGRAM_2[i]].reverse()});
      }
      console.log('Loaded sample program 2 to RAM');
    },
  },
}
</script>

<style scoped lang="scss">
.ram {
  width: $block-width;
  min-width: $min-block-width;

  @media screen and (max-width: 727px) {
    width: $block-width-mobile;
  }

  .sample-prog {
    color: $color-red;
  }
}
</style>
