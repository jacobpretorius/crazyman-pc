<template>
  <div class="cpu-container">
    <p>One day this may be a full 8-bit PC.</p>

    <div class="flexer">
      <DecimalDisplay class="decimal-display"/>
      <BusOutput class="bus-output" />
      <ProgramCounter class="program-counter" />
      <Clock class="clock" />

      <Register class="register" register-name="A" />
      <Register class="register" register-name="B" />
      <ALU class="alu" :registerNames="['A','B']" />

      <RAM />
      <ControlLogic />

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import BusOutput from '../BusOutput/BusOutput.vue';
import Clock from '../Clock/Clock.vue';
import Register from '../Register/Register.vue';
import ALU from '../ALU/ALU.vue';
import ProgramCounter from '../ProgramCounter/ProgramCounter.vue';
import RAM from '../RAM/RAM.vue';
import ControlLogic from '../ControlLogic/ControlLogic.vue';
import DecimalDisplay from '../DecimalDisplay/DecimalDisplay.vue';

export default {
  name: 'CpuContainer',
  components: {
    BusOutput,
    Clock,
    Register,
    ALU,
    ProgramCounter,
    RAM,
    ControlLogic,
    DecimalDisplay,
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
    margin-top: 1rem;
    flex-wrap: wrap;
    width: 100%;

    > * {
      padding: 5px;
      margin: 0 5px 5px 0;
      border: 2px solid $color-eucalyptus;
    }

    h1 {
      display: inline-block;
    }

    .break {
      flex-basis: 100%;
      height: 3px;
    }

    .input-area {
      display: flex;

      .bus-line {
        width: 10px;
        padding: 3px;
        margin: 2px;
        border: 2px solid grey;
        color: $color-gunmetal;
        background-color: $color-white-smoke;

        &.lineHigh {
          border: 2px solid $color-eucalyptus;
        }
      }
    }

    .led {
      width: 20px;
      height: 20px;
      background-color: grey;
      padding: 0 2px;
      margin: 2px 2px 5px 2px;
      float: right;
      border-radius: 10px;
      opacity: 0.8;
      text-align: center;
      color: white;
      cursor: not-allowed;
      box-sizing: border-box;

      :first-child {
        vertical-align: top;
        top: -3px;
        position: relative;
      }

      &--w {
        width: 30px;
      }
    }

    .blueled {
      background-color: $color-electric-blue;
      opacity: 1;
    }

    .redled {
      background-color: $color-red;
      opacity: 1;
    }

    .greenled {
      background-color: $color-eucalyptus;
      opacity: 1;
    }

    .active {
      background-color: $color-eucalyptus;
    }

    .red {
      color: $color-red;
    }

    .blue {
      color: $color-electric-blue;
    }

    button {
      padding: 2px 4px;
      margin: 2px;
      border: 1px solid $color-white-smoke;
    }
  }
}
</style>
