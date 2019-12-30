<template>
  <div class="power">
    <h1>Power</h1>

    <div class="break"></div>

    <button @click="handlePcReset">PC RESET</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
// import resetControlLineModel from '@/data/ControlLineModel.js';

export default {
  name: 'Power',
  computed: {
    ...mapState(['memory']),
  },
  methods: {
    ...mapMutations({
      resetBus: 'RESET_BUS',
      reserRegister: 'RESET_REGISTER',
      setMemoryLocation: 'SET_MEMORY_LOCATION',
      setControlLineHigh: 'SET_CONTROL_LINE_HIGH',
      resetControlLines: 'RESET_CONTROL_LINES',
    }),
    handlePcReset() {
      // this.setControlLineHigh('pcReset');
      this.resetBus();
      this.reserRegister('A');
      this.reserRegister('B');

      for (let i = 0; i < Object.keys(this.memory).length; i++) {
        this.setMemoryLocation({ memoryAddress: i, value: [false, false, false, false, false, false, false, false]});
      }

      // this.resetControlLines(Object.assign({}, resetControlLineModel));
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
