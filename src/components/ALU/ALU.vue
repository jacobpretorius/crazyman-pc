<template>
  <div class="ALU">
    <h1>ALU</h1>

    <div class="led" :class="{ write : writeEnabledLED }">
      <span>w</span>
    </div>
    <div class="led" :class="{ write : readEnabled }">
      <span>r</span>
    </div>
    <div class="led" :class="{ addition : !subtractionEnabled }">
      <span>+</span>
    </div>
    <div class="led" :class="{ subtraction : subtractionEnabled }">
      <span>-</span>
    </div>

    <div class="break"></div> 
    <button @click="readEnabled = !readEnabled" :class="{ active : readEnabled }">ENABLE</button>
    <button @click="writeResultToBus">WRITE</button>
    <button @click="subtractEnable" :class="{ active : subtractionEnabled }">MIN</button>
  </div>
</template>

<script>
import { mapState, mapMutations, } from 'vuex';
import { boolArrayAddition, boolArraySubtraction } from './ALUOperations.js';

export default {
  name: 'ALU',
  props: {
    registerNames: {
      type: Array,
      default: [],
    },
  },
  data: function() {
    return {
      readEnabled: false,
      writeEnabledLED: false,
      subtractionEnabled: false,
    };
  },
  computed: {
    ...mapState(['clockHigh', 'registers']),
  },
  methods: {
    ...mapMutations({
      fullSetBus: 'FULL_SET_BUS',
    }),
    writeResultToBus() {
      this.blinkWriteEnabledLed();
      var result = this.calculateAddition();
      if (result) {
        this.fullSetBus(result);
      }
    },
    subtractEnable() {
      this.subtractionEnabled = !this.subtractionEnabled;
    },
    blinkWriteEnabledLed() {
      this.writeEnabledLED = true;
      window.setTimeout(() => {
        this.writeEnabledLED = false;
      }, 350);
    },
    calculateAddition() {
      if (
        this.registers[this.registerNames[0]].length &
        this.registers[this.registerNames[1]].length
      ) {
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
  watch: {
    clockHigh: function() {
      // Read from BUS
      if (this.readEnabled) {
        var result = this.calculateAddition();
        if (result) {
          this.fullSetBus(result);
        }
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

  .break {
    flex-basis: 100%;
    height: 0;
  }

  border: 2px solid $color-eucalyptus;
  padding: 5px;
  margin: 5px;
  min-width: 145px;

  .led {
    width: 20px;
    height: 20px;
    background-color: $color-gunmetal;
    padding: 0 2px;
    margin: 2px 2px 5px 2px;
    float: right;
    border-radius: 10px;
    opacity: 0.5;
    text-align: center;
    color: white;

    :first-child {
      vertical-align: top;
      top: -2px;
      position: relative;
    }
  }

  .addition {
    background-color: $color-electric-blue;
    opacity: 1;
  }

  .subtraction {
    background-color: $color-electric-blue;
    opacity: 1;
  }

  .write {
    background-color: $color-Red;
    opacity: 1;
  }

  .active {
    background-color: $color-eucalyptus;
  }

  button {
    padding: 0 2px;
    margin: 2px;
    border: 1px solid $color-gunmetal;
  }
}
</style>