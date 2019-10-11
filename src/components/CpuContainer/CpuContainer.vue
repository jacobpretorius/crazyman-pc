<template>
  <div class="cpu-container">
    <p>One day this may be a full CPU</p>

    <div class="flexer">
      <BusOutput class="bus-output" />
      <Clock class="clock" />

      <Register class="register" register-name="A"/>
      <Register class="register" register-name="B"/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import BusOutput from "../BusOutput/BusOutput.vue";
import Clock from "../Clock/Clock.vue";
import Register from "../Register/Register.vue";

export default {
  name: "CpuContainer",
  components: {
    BusOutput,
    Clock,
    Register,
  },
  computed: mapState({
    items: state => state
  }),
};
</script>

<style scoped lang="scss">
.cpu-container {
  .flexer {
    @apply flex flex-wrap mt-8 w-full;

    .bus-output {
      @apply w-3/5;
    }

    .clock {
      @apply w-1/3;
    }

    .register {
      @apply w-1/3;
    }
  }
}
</style>