<template>
  <div class="ALU">
    <h1>ALU</h1>

    <div class="led" 
      :class="{ redled : controlLines.aluWriteResultToBus }"
      title="Write results to BUS">
      <span>w</span>
    </div>
    <div class="led" 
      :class="{ blueled : !controlLines.aluSubtractionEnabled}"
      title="Addition mode">
      <span>+</span>
    </div>
    <div class="led" 
      :class="{ blueled : controlLines.aluSubtractionEnabled }"
      title="Subtraction mode">
      <span>-</span>
    </div>
    <div class="break"></div>

    <button @click="writeResultToBus">WRITE</button>
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
  computed: {
    ...mapState(['bus', 'registers', 'controlLines']),
    registersValid() {
      return this.registers[this.registerNames[0]].length & this.registers[this.registerNames[1]].length;
    },
  },
  watch: {
    controlLines: function() { 
      if (this.controlLines.aluWriteResultToBus) {
        this.fullSetBus(this.calculateOperation());
      }
    },
  },
  methods: {
    ...mapMutations({
      fullSetBus: 'FULL_SET_BUS',
      setControlLine: 'UPDATE_CONTROL_LINES',
    }),
    writeResultToBus() {
      let result = this.calculateOperation();
      if (result) {
        this.fullSetBus(result);
      }
    },
    calculateOperation() {
      if (this.registersValid) {
        if (this.controlLines.aluSubtractionEnabled) {
          return boolArraySubtraction(
            this.registers[this.registerNames[0]],
            this.registers[this.registerNames[1]],
          );
        } else {
          return boolArrayAddition(
            this.registers[this.registerNames[0]],
            this.registers[this.registerNames[1]],
          );
        }
      } else {
        console.log('This CPU needs some registers.');
        return;
      }
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
  width: $block-width;
  min-width: $min-block-width;

  @media screen and (max-width: 727px) {
    width: $block-width-mobile;
  }

  h1 {
    display: inline-block;
  }
}
</style>
