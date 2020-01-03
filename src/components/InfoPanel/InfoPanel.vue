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
        let output = '';
        for (let i = 0; i < Object.keys(this.memory).length; i++) {
          if (this.pcClone === i)
            output += '<span style="background-color: #429063;">';

          output += `${i} -> \t`;

          [...this.memory[i]].reverse().forEach(bit => {
            output += this.boolBitToStringEndPadded(bit);
          });

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
  min-width: $min-block-width;

  @media screen and (max-width: 727px) {
    width: $block-width-mobile;
  }
  
  .bytecode-display {
    resize: none;
    width: 100%;
    height: 50%;
    background-color: $color-gunmetal;
    color: $color-white-smoke;
  }
}
</style>
