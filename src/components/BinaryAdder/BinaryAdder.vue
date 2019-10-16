<template>
  <div class="BinaryAdder">
    <h1>Binary Adder</h1>

    <button @click="handleActive" :class="{ active : adderRunning }">ENABLE</button>
    <button @click="handleStop">STOP</button>
  </div>
</template>

<script>
import { mapState, mapMutations, } from 'vuex';
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
  methods: {
    ...mapMutations({
      fullSetBus: 'FULL_SET_BUS',
      resetBus: 'RESET_BUS',
    }),
    handleStop() {
      this.adderRunning = false;
    },
    handleActive() {
      this.adderRunning = true;
    },
  },
  watch: {
    clockHigh: function() {
      if (this.adderRunning) {
        if (this.clockHigh) {
          var busAsBase10 = boolArrayToBase10(this.bus);

          // Add 1 to converted bus
          busAsBase10 = busAsBase10 + 1;

          this.fullSetBus(
            base10ToBoolArray(busAsBase10, this.bus.length),
          );
        }
      }
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