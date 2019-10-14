<template>
  <div class="Clock">
    <h1>Clock</h1>

    <div class="led" :class="{ on : this.clockHigh }"></div>

    <button @click="handleRun" :class="{ on : clockRunning }">RUN</button>
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
    ...mapState(['bus', 'clockHigh']),
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

  .led {
    width: 20px;
    height: 20px;
    background-color: $color-gunmetal;
    padding: 0 2px;
    margin: 2px 2px 5px 2px;
  }

  .on {
    background-color: $color-eucalyptus;
  }

  button {
    padding: 0 2px;
    margin: 2px;
    border: 1px solid $color-gunmetal;
  }
}
</style>