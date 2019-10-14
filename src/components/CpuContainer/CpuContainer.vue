<template>
  <div class="cpu-container">
    <p>One day this may be a full 8-bit CPU.</p>

    <div class="flexer">
      <BusOutput class="bus-output" />
      <ALU class="alu" :registerNames="['A','B']"/>
      <Clock class="clock" />

      <Register class="register" register-name="A" />
      <Register class="register" register-name="B" />

      <BinaryAdder class="binary-adder" />
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

export default {
  name: 'CpuContainer',
  components: {
    BusOutput,
    ALU,
    Clock,
    Register,
    BinaryAdder,
  },
  computed: mapState({
    items: (state) => state,
  }),
};
</script>

<style scoped lang="scss">
.cpu-container {
  .flexer {
    @apply flex flex-wrap mt-8 w-full;

    .bus-output {
      @apply w-2/5;
    }

    .ALU {
      @apply w-1/5;
    }

    .clock {
      @apply w-1/4;
    }

    .register {
      @apply w-1/3;
    }

    .binary-adder {
      @apply w-1/5;
    }
  }
}
</style>