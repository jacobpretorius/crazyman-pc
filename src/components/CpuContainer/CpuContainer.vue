<template>
  <div class="cpu-container">
    <p>This is the CPU</p>

    <div class="flexer">
      <BusOutput class="bus-output" />
      <Clock class="clock" />
    </div>
  </div>
</template>

<script>
import BusOutput from "../BusOutput/BusOutput.vue";
import Clock from "../Clock/Clock.vue";

export default {
  name: "CpuContainer",
  components: {
    BusOutput,
    Clock
  }
};
</script>

<style scoped lang="scss">
.cpu-container {
  .flexer {
    @apply flex mt-8;

    .bus-output {
      @apply w-2/3;
    }

    .clock {
      @apply w-1/3;
    }
  }
}
</style>