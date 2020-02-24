<template>
  <div class="alu">
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
    <div class="led" 
      :class="{ redled : flagsRegister[0] === true }"
      title="ZERO flag set">
      <span>Z</span>
    </div>
    <div class="led" 
      :class="{ redled : flagsRegister[1] === true }"
      title="OVERFLOW flag set">
      <span>O</span>
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
        return [];
      },
    },
  },
  computed: {
    ...mapState(['bus', 'registers', 'controlLines', 'flagsRegister']),
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
      setFlagsRegister: 'SET_FLAGS_REGISTER',
    }),
    writeResultToBus() {
      let result = this.calculateOperation();
      if (result) {
        this.fullSetBus(result);
      }
    },
    calculateOperation() {
      let result;
      if (this.controlLines.aluSubtractionEnabled) {
        result = boolArraySubtraction(
          this.registers[this.registerNames[0]],
          this.registers[this.registerNames[1]],
        );
      } else {
        result = boolArrayAddition(
          this.registers[this.registerNames[0]],
          this.registers[this.registerNames[1]],
        );
      }

      if (this.controlLines.aluSetFlagsRegisterOnResult) {
        this.setFlagsRegister([result.zero, result.overflow, false, false]);
      }

      return result.value;
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
.alu {
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
