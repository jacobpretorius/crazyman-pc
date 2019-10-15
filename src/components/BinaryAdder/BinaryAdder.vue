<template>
  <div class="BinaryAdder">
    <h1>Binary Adder</h1>

    <button @click="handleActive" :class="{ active : adderRunning }">ENABLE</button>
    <button @click="handleStop">STOP</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { arrayToBase10, base10ToArray } from '../../utils/BusConversions.js';

export default {
  name: 'BinaryAdder',
  data: function() {
    return {
      adderRunning: false,
    };
  },
  computed: {
    ...mapState(['bus', 'clockHigh']),
    ...mapGetters(['getBus']),
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
          var busAsBase10 = arrayToBase10(this.getBus);

          // Add 1 to converted bus
          busAsBase10 = busAsBase10 + 1;

          this.fullSetBus(
            base10ToArray(busAsBase10, this.getBus.length),
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