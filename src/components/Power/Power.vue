<template>
  <div class="power">
    <h1>Power</h1>

    <div class="break"></div>

    <button @click="handlePcReset">PC RESET</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Power',
  computed: {
    ...mapState(['memory']),
  },
  methods: {
    ...mapMutations({
      resetBus: 'RESET_BUS',
      resetRegister: 'RESET_REGISTER',
      resetFlagsRegister: 'RESET_FLAGS_REGISTER',
      setMemoryLocation: 'SET_MEMORY_LOCATION',
      setControlLineLow: 'SET_CONTROL_LINE_LOW',
      setControlLineHigh: 'SET_CONTROL_LINE_HIGH',
      resetControlLines: 'RESET_CONTROL_LINES',
      setClonePC: 'SET_CLONE_PC',
    }),
    handlePcReset() {
      this.setControlLineLow('halt');
      this.setControlLineHigh('pcReset');

      this.setClonePC(0);
      this.resetBus();
      this.resetRegister('A');
      this.resetRegister('B');
      this.resetFlagsRegister();

      for (let i = 0; i < Object.keys(this.memory).length; i++) {
        this.setMemoryLocation({ memoryAddress: i, value: [false, false, false, false, false, false, false, false]});
      }
    },
  },
};
</script>

<style scoped lang="scss">
.power {
  width: $block-width;
  min-width: $min-block-width;

  @media screen and (max-width: 727px) {
    width: $block-width-mobile;
  }
}
</style>
