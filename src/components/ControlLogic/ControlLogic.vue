<template>
  <div class="ControlLogic">
    <h1>Control Logic</h1>

    <h2>Instruction Register</h2>
    <div class="input-area">
      <input
        v-for="(instructionLine, index) in programRegisterDisplay"
        :key="`instructionLine-${index}`"
        type="text"
        :value="instructionLine === true ? 1 : 0"
        class="bus-line"
        :class="{ lineHigh : instructionLine === true }"
        disabled
      />
    </div>

    <h2>Step</h2>
    <div class="input-area">
      <input
        v-for="(stepLine, index) in programStepDisplay"
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

      <div class="led led--w" 
        :class="{ redled : controlLines.clReadInstructionRegisterFromBus }"
        title="Control Line read Instruction Register from BUS">
        <span>clr</span>
      </div>
      <div class="led led--w" 
        :class="{ redled : controlLines.clWriteInstructionRegisterToBus }"
        title="Control Line write Instruction Register to BUS">
        <span>clw</span>
      </div>
    </div>

    <button :class="{ active : this.enableProgramExecution }" @click="handleEnableProgramExecClick">ENABLE CL</button>
    <button @click="readControlRegisterFromBus">READ</button>
    <button @click="writeControlRegisterToBus">WRITE</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { boolArrayToBase10, base10ToBoolArray } from '@/utils/BusConversions.js';
// import resetControlLineModel from '@/data/ControlLineModel.js';

export default {
  name: 'ControlLogic',
  data: function() {
    return {
      programRegister: [false, false, false, false, false, false, false, false],
      programStep: [false, false, false],
      enableProgramExecution: false,
    };
  },
  computed: {
    ...mapState(['bus', 'memory' ,'clockHigh', 'controlLines']),
    programRegisterDisplay() {
      return [...this.programRegister].reverse();
    },
    programStepDisplay() {
      return [...this.programStep].reverse();
    },
  },
  watch: {
    clockHigh: function() {
      if (this.enableProgramExecution) {
        if (this.clockHigh) {
          if (this.controlLines.clReadInstructionRegisterFromBus) {
            this.readControlRegisterFromBus();
          }

          if (this.controlLines.clWriteInstructionRegisterToBus) {
            this.writeControlRegisterToBus;
          }

          this.stepRunner();
        }else {
          // Clock low
          // this.stepRunner();
        }
      }
    },
  },
  methods: {
    ...mapMutations({
      setControlLine: 'UPDATE_CONTROL_LINES',
      resetControlLines: 'RESET_CONTROL_LINES',
      fullSetBus: 'FULL_SET_BUS',
    }),
    readControlRegisterFromBus() {
      this.programRegister = [...this.bus];
    },
    writeControlRegisterToBus() {
      this.fullSetBus = [...this.programRegister];
    },
    stepRunner() {
      // Run the five steps one by one
      this.runStep();

      let callCount = 1;
      let repeater = window.setInterval(() => {
        if (callCount < 5) {
          // Increment active step
          let activeStep = boolArrayToBase10(this.programStep) + 1;
          this.programStep = base10ToBoolArray(activeStep, this.programStep.length);

          this.runStep();
          callCount += 1;
        } else {
          clearInterval(repeater);
          this.programStep = [...this.programStep].fill(false);
        }
      }, 90);
    },
    runStep() {
      // This gets called for each step of the exec
      let activeStep = boolArrayToBase10(this.programStep);
      console.log(activeStep);

      // Reset our control lines to initial state
      // this.resetControlLines(Object.assign({}, resetControlLineModel));

      // Step 0 and 1 are always from FETCH
      if (activeStep === 0) {
        this.setControlLine({
          line: 'pcWriteCounterToBus',
          value: true,
        });

        this.setControlLine({
          line: 'ramMemoryAddressRegisterReadFromBus',
          value: true,
        });
      }

      if (activeStep === 1) {
        this.setControlLine({
          line: 'ramWriteMemoryContentsToBus',
          value: true,
        });

        this.setControlLine({
          line: 'clReadInstructionRegisterFromBus',
          value: true,
        });
      }

      // Test with LDA 
      // console.log(this.programRegister.slice(4, this.programRegister.length));
      if (this.getVerb() === 'LDA') {
        if (activeStep === 2) {
          this.setControlLine({
            line: 'clWriteInstructionRegisterToBus',
            value: true,
          });

          this.setControlLine({
            line: 'ramMemoryAddressRegisterReadFromBus',
            value: true,
          });
        }

        if (activeStep === 3) {
          this.setControlLine({
            line: 'ramWriteMemoryContentsToBus',
            value: true,
          });

          this.setControlLine({
            line: 'regAReadContentsFromBus',
            value: true,
          });
        }
      }

    },
    getVerb() {
      if (JSON.stringify(this.programRegister.slice(4, this.programRegister.length)) === JSON.stringify([true, false, false, false])) {
        return 'LDA';
      }
      return;
    },
    handleEnableProgramExecClick() {
      this.enableProgramExecution = !this.enableProgramExecution;
    },
  },
}
</script>

<style scoped lang="scss">
  .ControlLogic {
    min-width: 340px;
    width: 35%;

    .input-area .step-line {
      color: $color-red;
    }

    .lines .led {
      display: inline-block;
      float: none;
    }
  }
</style>
