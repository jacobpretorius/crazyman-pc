<template>
  <div class="BinaryAdder">
    <h1>Binary Adder</h1>

    <button @click="handleActive" :class="{ active : adderRunning }">ACTIVE</button>
    <button @click="handleStop">STOP</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

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
          var bus = this.getBus;

          // Safely get the full bus values
          var str = '';
          for (let i = 0; i < bus.length; i++) {
            if (bus[i]) {
              if (bus[i] === 1) {
                str = str + '1';
              } else {
                str = str + '0';
              }
            } else {
              str = str + '0';
            }
          }

          // Convert to bas 10 and add 1
          var busAsBase10 = parseInt(str, 2);
          busAsBase10 = busAsBase10 + 1;
          // Convert result back to base 2
          var updatedBusAsBase2 = busAsBase10.toString(2);
          updatedBusAsBase2 = updatedBusAsBase2.split('').reverse();

          // Update original bus safely
          for (let j = 0; j < bus.length; j++) {
            if (updatedBusAsBase2[j]) {
              if (updatedBusAsBase2[j] === '1') {
                bus[j] = 1;
              } else {
                bus[j] = 0;
              }
            } else {
              bus[j] = 0;
            }
          }
          this.fullSetBus(bus);
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