<template>
  <div class="control-logic">
    <h1>Control Logic</h1>

    <h2>Instruction Register - {{ this.activeVerb }}</h2>
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
        :class="{ redled : controlLines.pcEnabled }"
        title="PC Enabled">
        <span>pce</span>
      </div>
      <div class="led led--w" 
        :class="{ redled : controlLines.pcWriteCounterToBus }"
        title="PC write to bus">
        <span>pcw</span>
      </div>

      <div class="led led--w" 
        :class="{ redled : controlLines.reg4BitMode }"
        title="Registers in 4-bit mode">
        <span>r4b</span>
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
        :class="{ redled : controlLines.aluSetFlagsRegisterOnResult }"
        title="ALU set FlagsRegister on execution result">
        <span>alf</span>
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
import resetControlLineModel from '@/data/ControlLineModel.js';
import { getVerb } from '@/utils/VerbHelper.js';

export default {
  name: 'ControlLogic',
  data() {
    return {
      programRegister: [false, false, false, false, false, false, false, false],
      programStep: [false, false, false],
      enableProgramExecution: true,
    };
  },
  computed: {
    ...mapState(['bus', 'memory' ,'clockHigh', 'controlLines', 'registers', 'flagsRegister']),
    programRegisterDisplay() {
      return [...this.programRegister].reverse();
    },
    programStepDisplay() {
      return [...this.programStep].reverse();
    },
    activeVerb() {
      return getVerb(this.programRegister);
    },
    pcReset() {
      return this.controlLines.pcReset;
    },
  },
  watch: {
    bus: function () {
      if (this.controlLines.clReadInstructionRegisterFromBus) {
        this.readControlRegisterFromBus();
      }

      if (this.controlLines.clWriteInstructionRegisterToBus) {
        this.writeControlRegisterToBus();
      }
    },
    controlLines: function () {
      if (this.controlLines.clReadInstructionRegisterFromBus) {
        this.readControlRegisterFromBus();
      }

      if (this.controlLines.clWriteInstructionRegisterToBus) {
        this.writeControlRegisterToBus();
      }
    },
    pcReset: function(value) {
      if (value === true) {
        this.programRegister = [false, false, false, false, false, false, false, false];
      } 
    },
    clockHigh: function() {
      if (this.enableProgramExecution && this.clockHigh) {
        this.stepRunner();
      }
    },
  },
  methods: {
    ...mapMutations({
      setControlLineHigh: 'SET_CONTROL_LINE_HIGH',
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
      }, 50);
    },
    runStep() {
      // This gets called for each step of the exec
      let activeStep = boolArrayToBase10(this.programStep);

      // Reset our control lines to initial state
      this.resetControlLines(Object.assign({}, resetControlLineModel));

      // Step 0 and 1 are always from FETCH
      if (activeStep === 0) {
        this.setControlLineHigh('pcWriteCounterToBus');
        this.setControlLineHigh('ramMemoryAddressRegisterReadFromBus');
      }

      if (activeStep === 1) {
        this.setControlLineHigh('ramWriteMemoryContentsToBus');
        this.setControlLineHigh('clReadInstructionRegisterFromBus');
      }

      // =============================================================
      // MAIN PC LOGIC HERE for steps 2, 3 & 4 to VERB operations

      // LDA
      if (this.activeVerb === 'LDA') {
        if (activeStep === 2) {
          this.setControlLineHigh('clWriteInstructionRegisterToBus');
          this.setControlLineHigh('ramMemoryAddressRegisterReadFromBus');
        }

        if (activeStep === 3) {
          this.setControlLineHigh('ramWriteMemoryContentsToBus');
        }

        if (activeStep === 4) {
          this.setControlLineHigh('regAReadContentsFromBus');
        }
      }

      // LDB
      if (this.activeVerb === 'LDB') {
        if (activeStep === 2) {
          this.setControlLineHigh('clWriteInstructionRegisterToBus');
          this.setControlLineHigh('ramMemoryAddressRegisterReadFromBus');
        }

        if (activeStep === 3) {
          this.setControlLineHigh('ramWriteMemoryContentsToBus');
        }

        if (activeStep === 4){
          this.setControlLineHigh('regBReadContentsFromBus');
        }
      }

      // ADD TODO: change result type
      if (this.activeVerb === 'ADD') {
        if (activeStep === 2) {
          this.setControlLineHigh('aluSetFlagsRegisterOnResult');
          this.setControlLineHigh('aluWriteResultToBus');
        }

        if (activeStep === 3) {
          this.setControlLineHigh('regAReadContentsFromBus');
        }
      }

      // SUB TODO: change result type
      if (this.activeVerb === 'SUB') {
        if (activeStep === 2) {
          this.setControlLineHigh('aluSetFlagsRegisterOnResult');
          this.setControlLineHigh('aluSubtractionEnabled');
          this.setControlLineHigh('aluWriteResultToBus');
        }

        if (activeStep === 3) {
          this.setControlLineHigh('regAReadContentsFromBus');
        }
      }

      // STA
      if (this.activeVerb === 'STA') {
        if (activeStep === 2) {
          this.setControlLineHigh('ramMemoryAddressRegisterReadFromBus');
        }

        if (activeStep === 3) {
          this.setControlLineHigh('regAWriteToBus');
          this.setControlLineHigh('ramReadMemoryContentsFromBus');
        }
      }

      // LDI
      if (this.activeVerb === 'LDI') {
        if (activeStep === 2) {
          this.setControlLineHigh('reg4BitMode');
          this.setControlLineHigh('regAReadContentsFromBus');
        }
      }

      // JMP
      if (this.activeVerb === 'JMP') {
        if (activeStep === 2) {
          this.setControlLineHigh('clWriteInstructionRegisterToBus');
        }

        if (activeStep === 3) {
          this.setControlLineHigh('pcReadFromBus');
        }
      }

      // JPC
      if (this.activeVerb === 'JPC') {
        if (this.flagsRegister[1] === false) return;

        if (activeStep === 2) {
          this.setControlLineHigh('clWriteInstructionRegisterToBus');
        }

        if (activeStep === 3) {
          this.setControlLineHigh('pcReadFromBus');
        }
      }

      // JPZ
      if (this.activeVerb === 'JPZ') {
        if (this.flagsRegister[0] === false) return;

        if (activeStep === 2) {
          this.setControlLineHigh('clWriteInstructionRegisterToBus');
        }

        if (activeStep === 3) {
          this.setControlLineHigh('pcReadFromBus');
        }
      }

      // OUT
      if (this.activeVerb === 'OUT') {
        if (activeStep === 2) {
          this.setControlLineHigh('regAWriteToBus');
        }
        
        if (activeStep === 3) {
          this.setControlLineHigh('doUpdateFromBus');
        }

        if (activeStep === 4) {
          console.log(' ----------- OUT ----------- ');
          console.log(boolArrayToBase10(this.registers['A']));
          console.log(' ----------- OUT ----------- ');
        }
      }

      // HLT
      if (this.activeVerb === 'HLT') {
        this.setControlLineHigh('halt');
        if (activeStep === 2) {
          console.log(' ----------- HALT CALLED ----------- ');
        }
      }

      // =============================================================
    },
    handleEnableProgramExecClick() {
      this.enableProgramExecution = !this.enableProgramExecution;
    },
  },
}
</script>

<style scoped lang="scss">
  .control-logic {
    width: $block-width;
    min-width: $min-block-width;

    @media screen and (max-width: 727px) {
      width: $block-width-mobile;
    }

    .input-area .step-line {
      color: $color-red;
    }

    .lines .led {
      display: inline-block;
      float: none;
    }
  }
</style>
