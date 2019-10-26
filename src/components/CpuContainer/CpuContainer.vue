<template>
  <div class="cpu-container">
    <p>One day this may be a full 8-bit CPU.</p>

    <div class="flexer">
      <BusOutput class="bus-output" />
      <ProgramCounter class="program-counter" />
      <Clock class="clock" />

      <Register class="register" register-name="A" />
      <Register class="register" register-name="B" />

      <BinaryAdder class="binary-adder" />
      <ALU class="alu" :registerNames="['A','B']" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import BusOutput from '../BusOutput/BusOutput.vue';
import ALU from '../ALU/ALU.vue';
import Clock from '../Clock/Clock.vue';
import Register from '../Register/Register.vue';
import BinaryAdder from '../BinaryAdder/BinaryAdder.vue';
import ProgramCounter from '../ProgramCounter/ProgramCounter.vue';

export default {
  name: 'CpuContainer',
  components: {
    BusOutput,
    ALU,
    Clock,
    Register,
    BinaryAdder,
    ProgramCounter,
  },
  computed: mapState({
    items: state => state,
  }),
};
</script>

<style lang="scss">
.cpu-container {
  .flexer {
    display: flex;
    margin-top: 2rem;
    flex-wrap: wrap;
    width: 100%;

    .bus-output {
      width: 40%;
    }

    .program-counter {
      width: 25%;
    }

    .clock {
      width: 25%;
    }

    .register {
      width: 33%;
    }

    .binary-adder {
      width: 20%;
    }

    .ALU {
      width: 20%;
    }

    h1 {
      display: inline-block;
    }

    .break {
      flex-basis: 100%;
      height: 0;
    }

    .input-area {
      display: flex;

      .bus-line {
        width: 10px;
        padding: 3px;
        margin: 2px;
        border: 2px solid $color-gunmetal;

        &.lineHigh {
          border: 2px solid $color-eucalyptus;
        }
      }
    }

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
      cursor: not-allowed;
      box-sizing: border-box;

      :first-child {
        vertical-align: top;
        top: -3px;
        position: relative;
      }
    }

    .blueled {
      background-color: $color-electric-blue;
      opacity: 1;
    }

    .redled {
      background-color: $color-Red;
      opacity: 1;
    }

    .greenled {
      background-color: $color-eucalyptus;
      opacity: 1;
    }

    .active {
      background-color: $color-eucalyptus;
    }

    button {
      padding: 2px 4px;
      margin: 2px;
      border: 1px solid $color-gunmetal;
    }
  }
}
</style>
