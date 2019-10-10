<template>
<div class="cpu-container">
  <p>This is the CPU</p>
  <BusOutput />
</div>
  
</template>

<script>
import BusOutput from '../BusOutput/BusOutput.vue';

export default {
  name: "CpuContainer",
  components: {
    BusOutput,
  },
};
</script>

<style scoped lang="scss">

</style>