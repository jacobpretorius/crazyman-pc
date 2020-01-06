<template>
  <div class="info-panel">
    <h1>Info</h1>

    <h2>Machine code in RAM</h2>
    <pre contentEditable="false" class="bytecode-display" v-html="displayMachineCode">
    </pre>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getVerb } from '@/utils/VerbHelper.js';
import { boolArrayToBase10 } from '@/utils/BusConversions.js';

export default {
  name: 'InfoPanel',
  computed: {
    ...mapState(['memory', 'pcClone']),
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
          if (this.pcClone === i)
            output += '<span style="background-color: #429063;">';

          output += `${i}  -> \t`;

          let displayFlipped = [...this.memory[i]].reverse();
          // Output raw bits
          displayFlipped.forEach(bit => {
            output += this.boolBitToStringEndPadded(bit);
          });

          // Output VERB & binary 4 least significant bits
          output += `=> ${getVerb([...this.memory[i]])} ${boolArrayToBase10([...this.memory[i]].slice(0, 4))} | ${boolArrayToBase10([...this.memory[i]])}`;

          if (this.pcClone === i)
            output += '</span>';

          output += '\n';
        }

        return output;
      }

      return 'No program loaded..';
    },
  },
  methods: {
    boolBitToStringEndPadded(bit) {
      return bit === true ? '1 ' : '0 ';
    },
  },
}
</script>

<style scoped lang="scss">
.info-panel {
  height: 100%;
  min-width: 300px;

  @media screen and (max-width: 727px) {
    width: $block-width-mobile;
  }
  
  .bytecode-display {
    resize: none;
    width: 100%;
    padding-left: 5px;
    background-color: $color-gunmetal;
    color: $color-white-smoke;
  }
}
</style>
