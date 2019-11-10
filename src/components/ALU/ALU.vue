<template>
  <div class="ALU">
    <h1>ALU</h1>

    <div class="led" :class="{ redled : writeAluResultToBusLED }">
      <span>w</span>
    </div>
    <div class="led" :class="{ redled : controlLines.aluEnabled }">
      <span>r</span>
    </div>
    <div class="led" :class="{ blueled : !controlLines.aluSubtractionEnabled}">
      <span>+</span>
    </div>
    <div class="led" :class="{ blueled : controlLines.aluSubtractionEnabled }">
      <span>-</span>
    </div>
    <div class="break"></div>

    <button :class="{ active : controlLines.aluEnabled }" @click="handleEnable">ENABLE</button>
    <button :class="{ active : controlLines.aluWriteResultToBus }" @click="handWriteEnable">WRITE</button>
    <button :class="{ active : controlLines.aluSubtractionEnabled }" @click="handleSubtractEnable">MIN</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { boolArrayAddition, boolArraySubtraction } from '@/utils/BoolArrayOperations.js';

export default {
  name: 'ALU',
  props: {
    registerNames: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data: function() {
    return {
      writeAluResultToBusLED: false,
    };
  },
  computed: {
    ...mapState(['clockHigh', 'registers', 'controlLines']),
    registersValid() {
      return this.registers[this.registerNames[0]].length & this.registers[this.registerNames[1]].length;
    },
  },
  watch: {
    clockHigh: function() {
      if (this.controlLines.aluEnabled) {
        let result = this.calculateOperation();
        if (result && this.controlLines.aluWriteResultToBus) {
          this.fullSetBus(result);
        }
      }
    },
  },
  methods: {
    ...mapMutations({
      fullSetBus: 'FULL_SET_BUS',
      setControlLine: 'UPDATE_CONTROL_LINES',
    }),
    writeResultToBus() {
      this.blinkWriteEnabledLed();
      let result = this.calculateOperation();
      if (result) {
        this.fullSetBus(result);
      }
    },
    blinkWriteEnabledLed() {
      this.writeAluResultToBusLED = true;
      window.setTimeout(() => {
        this.writeAluResultToBusLED = false;
      }, 350);
    },
    calculateOperation() {
      if (this.registersValid) {
        if (this.controlLines.aluSubtractionEnabled) {
          return boolArraySubtraction(
            [...this.registers[this.registerNames[0]]],
            [...this.registers[this.registerNames[1]]],
          );
        } else {
          return boolArrayAddition(
            [...this.registers[this.registerNames[0]]],
            [...this.registers[this.registerNames[1]]],
          );
        }
      } else {
        console.log('This CPU needs some registers.');
        return;
      }
    },
    handleEnable() {
      this.setControlLine({
        line: 'aluEnabled',
        value: !this.controlLines.aluEnabled,
      });
    },
    handWriteEnable() {
      this.setControlLine({
        line: 'aluWriteResultToBus',
        value: !this.controlLines.aluWriteResultToBus,
      });
    },
    handleSubtractEnable() {
      this.setControlLine({
        line: 'aluSubtractionEnabled',
        value: !this.controlLines.aluSubtractionEnabled,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.ALU {
  h1 {
    display: inline-block;
  }

  border: 2px solid $color-eucalyptus;
  padding: 5px;
  margin: 5px;
  min-width: 145px;
}
</style>
