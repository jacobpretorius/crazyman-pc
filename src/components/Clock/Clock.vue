<template>
  <div class="Clock">
    <h1>Clock</h1>

    <div class="led" :class="{ greenled : this.clockHigh }"></div>
    <div class="led" :class="{ blueled : this.controlLines.halt }"><span title="halt">h</span></div>
    <div class="break"></div> 

    <button @click="handleRun" :class="{ active : clockRunning }">RUN</button>
    <button @click="handleStop">STOP</button>
    <button @click="handlePulse">PULSE</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Clock',
  data: function() {
    return {
      clockIntervals: [],
      clockRunning: false,
    };
  },
  computed: {
    ...mapState(['bus', 'clockHigh', 'controlLines']),
  },
  methods: {
    ...mapMutations({
      setClockState: 'SET_CLOCK_STATE',
    }),
    handlePulse() {
      this.sendHighLowClockPulse();
    },
    handleRun() {
      this.clockRunning = true;
      this.sendHighLowClockPulse();
      var timer = window.setInterval(() => {
        this.sendHighLowClockPulse();
      }, 1000);

      this.clockIntervals.push(timer);
    },
    handleStop() {
      this.clockRunning = false;
      this.clockIntervals.forEach((timer) => {
        clearInterval(timer);
      });
    },
    sendHighLowClockPulse() {
      this.setClockState(true);

      window.setTimeout(() => {
        this.setClockState(false);
      }, 500);
    },
  },
};
</script>

<style scoped lang="scss">
.Clock {
  border: 2px solid $color-eucalyptus;
  padding: 5px;
  margin: 5px;
  min-width: 112px;
}
</style>
