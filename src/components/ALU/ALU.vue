<template>
  <div class="ALU">
    <h1>ALU</h1>

    <div class="led" :class="{ redled : writeAluResultToBusLED }">
      <span>w</span>
    </div>
    <div class="led" :class="{ redled : readFromBus }">
      <span>r</span>
    </div>
    <div class="led" :class="{ blueled : !subtractionEnabled }">
      <span>+</span>
    </div>
    <div class="led" :class="{ blueled : subtractionEnabled }">
      <span>-</span>
    </div>
    <div class="break"></div>

    <button :class="{ active : readFromBus }" @click="readFromBus = !readFromBus">ENABLE</button>
    <button @click="writeResultToBus">WRITE</button>
    <button :class="{ active : subtractionEnabled }" @click="subtractEnable">MIN</button>
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
      readFromBus: false,
      writeAluResultToBusLED: false,
      subtractionEnabled: false,
    };
  },
  computed: {
    ...mapState(['clockHigh', 'registers']),
    registersValid() {
      return this.registers[this.registerNames[0]].length & this.registers[this.registerNames[1]].length;
    },
  },
  watch: {
    clockHigh: function() {
      if (this.readFromBus) {
        let result = this.calculateAddition();
        if (result) {
          this.fullSetBus(result);
        }
      }
    },
  },
  methods: {
    ...mapMutations({
      fullSetBus: 'FULL_SET_BUS',
    }),
    writeResultToBus() {
      this.blinkWriteEnabledLed();
      let result = this.calculateAddition();
      if (result) {
        this.fullSetBus(result);
      }
    },
    subtractEnable() {
      this.subtractionEnabled = !this.subtractionEnabled;
    },
    blinkWriteEnabledLed() {
      this.writeAluResultToBusLED = true;
      window.setTimeout(() => {
        this.writeAluResultToBusLED = false;
      }, 350);
    },
    calculateAddition() {
      if (this.registersValid) {
        if (this.subtractionEnabled) {
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
