<template>
  <div class="Clock">
    <h1>Clock</h1>

    <div class="led" :class="{ greenled : this.clockHigh }"></div>
    <div class="led" :class="{ blueled : this.controlLines.halt }"><span title="halt">h</span></div>
    <div class="break"></div> 

    <button @click="handleRunClick" :class="{ active : clockRunning }">RUN</button>
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
    handleRunClick() {
      this.clockRunning = !this.clockRunning ;
      if (this.clockRunning) {
        this.startClockPulse();
      } else {
        this.clearRunningTimers();
      }
    },
    startClockPulse() {
      this.sendHighLowClockPulse();
      var timer = window.setInterval(() => {
        this.sendHighLowClockPulse();
      }, 1000);

      this.clockIntervals.push(timer);
    },
    clearRunningTimers() {
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
