<template>
  <div class="clock">
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
  data() {
    return {
      clockIntervals: [],
      clockRunning: false,
    };
  },
  computed: {
    ...mapState(['bus', 'clockHigh', 'controlLines']),
    pcReset() {
      return this.controlLines.pcReset;
    },
  },
  watch: {
    pcReset: function(value) {
      if (value === true) {
        this.clockRunning = false;
        this.clearRunningTimers();
      } 
    },
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
      setControlLineLow: 'SET_CONTROL_LINE_LOW',
    }),
    handlePulse() {
      this.sendHighLowClockPulse();
    },
    handleRunClick() {
      this.clockRunning = !this.clockRunning;
      if (this.clockRunning) {
        this.setControlLineLow('halt');
        this.startClockPulse();
      } else {
        this.clearRunningTimers();
      }
    },
    startClockPulse() {
      this.sendHighLowClockPulse();
      var timer = window.setInterval(() => {
        this.sendHighLowClockPulse();
      }, 500);

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
      }, 250);
    },
  },
};
</script>

<style scoped lang="scss">
.clock {
  width: $block-width;
  min-width: $min-block-width;

  @media screen and (max-width: 727px) {
    width: $block-width-mobile;
  }
}
</style>
