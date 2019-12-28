<template>
  <div class="Clock">
    <h1>Clock</h1>

    <div class="led" 
      :class="{ greenled : this.clockHigh }"
      title="Clock Pulse">
    </div>
    <div class="led" 
      :class="{ blueled : this.controlLines.halt }"
      title="Clock HALTED">
      <span>h</span>
    </div>
    <div class="break"></div>

    <button 
      :class="{ active : clockRunning }" 
      @click="handleRunClick">RUN</button>
    <button 
      :disabled="controlLines.halt"
      @click="handlePulse">PULSE</button>
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
  watch: {
    controlLines: function() {
      if (this.controlLines.halt) {
        this.clockRunning = false;
        this.clearRunningTimers();
      }
    },
  },
  methods: {
    ...mapMutations({
      setClockState: 'SET_CLOCK_STATE',
    }),
    handlePulse() {
      this.sendHighLowClockPulse();
    },
    handleRunClick() {
      this.clockRunning = !this.clockRunning;
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
      this.clockIntervals.forEach(timer => {
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
  min-width: 112px;
  width: 10%;
}
</style>
