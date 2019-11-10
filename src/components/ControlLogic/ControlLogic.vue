<template>
  <div class="ControlLogic">
    <h1>Control Logic</h1>

    <h2>Instruction / <span class="red">Step</span></h2>
    <div class="input-area">
      <input
        v-for="(instructionLine, index) in 4"
        :key="`instructionLine-${index}`"
        type="text"
        :value="instructionLine === true ? 1 : 0"
        class="bus-line"
        :class="{ lineHigh : instructionLine === true }"
        disabled
      />

      <input
        v-for="(stepLine, index) in 4"
        :key="`stepLine-${index}`"
        type="text"
        :value="stepLine === true ? 1 : 0"
        class="bus-line step-line"
        :class="{ lineHigh : stepLine === true }"
        disabled
      />
    </div>

    <div class="lines">
      <h2>Control Lines</h2>

      <div class="led led--w" 
        :class="{ redled : controlLines.halt }"
        title="Clock HALT">
        <span>hlt</span>
      </div>

      <div class="led led--w" 
        :class="{ redled : controlLines.programCounterEnabled }"
        title="PC Enabled">
        <span>pce</span>
      </div>
      <div class="led led--w" 
        :class="{ redled : controlLines.pcWriteCounterToBus }"
        title="PC write to bus">
        <span>pcw</span>
      </div>

      <div class="led led--w" 
        :class="{ redled : controlLines.ramMemoryAddressRegisterReadFromBus }"
        title="Read RAM memory address register from BUS">
        <span>rmr</span>
      </div>
      <div class="led led--w" 
        :class="{ redled : controlLines.ramMemoryAddressRegisterIncrement }"
        title="Increment RAM memory address register">
        <span>rmi</span>
      </div>
      <div class="led led--w" 
        :class="{ redled : controlLines.ramWriteMemoryContentsToBus }"
        title="Write RAM contents to BUS">
        <span>rcw</span>
      </div>
      <div class="led led--w" 
        :class="{ redled : controlLines.ramReadMemoryContentsFromBus }"
        title="Read RAM from bus to contents">
        <span>rcr</span>
      </div>

      <div class="led led--w" 
        :class="{ redled : controlLines.aluEnabled }"
        title="ALU enabled">
        <span>ale</span>
      </div>
      <div class="led led--w" 
        :class="{ redled : controlLines.aluSubtractionEnabled }"
        title="ALU subtraction mode">
        <span>als</span>
      </div>
      <div class="led led--w" 
        :class="{ redled : controlLines.aluWriteResultToBus }"
        title="ALU Write result to BUS">
        <span>alw</span>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { boolArrayToBase10, base10ToBoolArray } from '@/utils/BusConversions.js';

export default {
  name: 'ControlLogic',
  computed: {
    ...mapState(['controlLines']),
  },
}
</script>

<style scoped lang="scss">
  .ControlLogic {
    min-width: 340px;
    width: 35%;
    height: 132px;

    .input-area .step-line {
      color: $color-red;
    }

    .lines .led {
      display: inline-block;
      float: none;
    }
  }
</style>
