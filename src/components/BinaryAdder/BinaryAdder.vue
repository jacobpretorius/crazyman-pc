<template>
  <div class="BinaryAdder">
    <h1>Binary Adder</h1>
    <div class="break"></div>

    <button :class="{ active : adderRunning }" @click="handleActiveClick">ENABLE</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { boolArrayToBase10, base10ToBoolArray } from '../../utils/BusConversions.js';

export default {
  name: 'BinaryAdder',
  data: function() {
    return {
      adderRunning: false,
    };
  },
  computed: {
    ...mapState(['bus', 'clockHigh']),
  },
  watch: {
    clockHigh: function() {
      if (this.adderRunning) {
        if (this.clockHigh) {
          let busAsBase10 = boolArrayToBase10(this.bus);

          // I know, I know. This is dirty. I'll get round to changing it sometime.
          // These operations being bitwise are less important to me than having the Ben Eater CPU running. MVP.

          // Add 1 to converted bus
          busAsBase10 = busAsBase10 + 1;

          this.fullSetBus(base10ToBoolArray(busAsBase10, this.bus.length));
        }
      }
    },
  },
  methods: {
    ...mapMutations({
      fullSetBus: 'FULL_SET_BUS',
      resetBus: 'RESET_BUS',
    }),
    handleActiveClick() {
      this.adderRunning = !this.adderRunning;
    },
  },
};
</script>

<style scoped lang="scss">
.BinaryAdder {
  border: 2px solid $color-eucalyptus;
  padding: 5px;
  margin: 5px;
  min-width: 88px;
}
</style>
