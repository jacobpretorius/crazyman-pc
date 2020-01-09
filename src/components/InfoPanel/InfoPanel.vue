<template>
  <div class="info-panel">
    <h1>Info</h1>

    <h2>Machine code in RAM</h2>
    <pre contentEditable="false" class="bytecode-display" v-html="displayMachineCode">
    </pre>

    <h2>Code</h2>
    <textarea v-model="userProgram" class="code-input" placeholder="Write some assembly ;)" rows="10"></textarea>

    <div class="footer">
      <button @click="handleCompile">COMPILE</button>
      <button @click="handleClear">CLEAR</button>
      <button @click="handleClearRam">CLEAR RAM</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getVerb, verbToBinaryBitArray } from '@/utils/VerbHelper.js';
import { boolArrayToBase10, base10ToBoolArray } from '@/utils/BusConversions.js';

export default {
  name: 'InfoPanel',
  data() {
    return {
      userProgram: '',
    };
  },
  computed: {
    ...mapState(['memory', 'infoPanelObject']),
    memoryIsPopulated() {
      for (let i = 0; i < Object.keys(this.memory).length; i++) {
        if (this.memory[i].some(x => x === true)){
          return true;
        }
      }
      return false;
    },
    displayMachineCode() {
      if (this.memoryIsPopulated) {
        let output = 'LOC \tRAM Contents \t=> VERB | Value\n';

        // Loop the Memory addresses
        for (let i = 0; i < Object.keys(this.memory).length; i++) {
          // Highlight the active PC line
          if (this.infoPanelObject.pcClone === i)
            output += '<span style="background-color: #429063;">';

          output += `${i}  -> \t`;

          let displayFlipped = [...this.memory[i]].reverse();
          // Output raw bits
          displayFlipped.forEach(bit => {
            output += this.boolBitToStringEndPadded(bit);
          });

          // Output VERB & binary 4 least significant bits
          output += `=> ${getVerb([...this.memory[i]])} ${boolArrayToBase10([...this.memory[i]].slice(0, 4))} | ${boolArrayToBase10([...this.memory[i]])}`;

          if (this.infoPanelObject.pcClone === i)
            output += '</span>';

          output += '\n';
        }

        return output;
      }

      return 'No program loaded..';
    },
  },
  methods: {
    ...mapMutations({setMemoryLocation: 'SET_MEMORY_LOCATION'}),
    boolBitToStringEndPadded(bit) {
      return bit === true ? '1 ' : '0 ';
    },
    handleCompile() {
      this.handleClearRam();

      // Split into lines of code equal to lines of memory, removing empty lines
      let code = this.userProgram.toUpperCase().match(/.+/g);
      let memoryLinePosition = 0;
      code.forEach(codeLine => {
        let parts = codeLine.trim().split(' ');
        let machineCodeArr;

        // Check for the three types of values we accept
        if (!isNaN(parts[0])) {
          // This line is only a binary value that we want stored in ram
          machineCodeArr = base10ToBoolArray(parseInt(parts[0])).reverse();
        } else {
          // This line has either a VERB or a VERB MEMLOC command
          machineCodeArr = verbToBinaryBitArray(parts[0]);

          if (parts.length >= 2) {
            // VERB and MEMLOC
            machineCodeArr = machineCodeArr.concat(base10ToBoolArray(parseInt(parts[1])).reverse().slice(4));
          } else {
            // VERB only, fill empty MEMLOC
            machineCodeArr = machineCodeArr.concat([false, false, false, false]);
          }
        }

        this.setMemoryLocation({ memoryAddress: memoryLinePosition++, value: machineCodeArr.reverse()});
      });
    },
    handleClear() {
      this.userProgram = '';
    },
    handleClearRam() {
      for (let i = 0; i < Object.keys(this.memory).length; i++) {
        this.setMemoryLocation({ memoryAddress: i, value: [false, false, false, false, false, false, false, false]});
      }
    },
  },
}
</script>

<style scoped lang="scss">
.info-panel {
  position: relative;
  height: 100%;
  min-width: 300px;

  @media screen and (max-width: 727px) {
    width: $block-width-mobile;
  }
  
  .bytecode-display {
    resize: none;
    padding: 0 5px;
    width: stretch;
    background-color: $color-gunmetal;
    color: $color-white-smoke;
  }

  .code-input {
    resize: vertical;
    padding: 0 5px;
    width: stretch;
    background-color: $color-gunmetal;
    color: $color-white-smoke;
  }

  .code-input::placeholder {
    color: $color-white-smoke;
    opacity: 0.8;
  }

  .code-input:focus.code-input::placeholder {
    opacity: 0;
  }

  .footer {
    position: absolute;
    bottom: 5px;
  }
}
</style>
