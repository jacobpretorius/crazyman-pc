<template>
  <div class="bus-output">
    <h1>Bus Output</h1>

    <div class="input-area">
      <input
        v-for="(busLine, index) in displayBus"
        :key="index"
        type="text"
        :value="busLine === true ? 1 : 0"
        class="bus-line"
        :class="{ lineHigh : busLine === true }"
        disabled
      />
    </div>

    <button @click="handleResetBus">RESET</button>
    <button @click="handleTestState">TEST</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'BusOutput',
  computed: {
    ...mapState(['bus']),
    displayBus() {
      return [...this.bus].reverse();
    },
  },
  methods: {
    ...mapMutations({
      fullSetBus: 'FULL_SET_BUS',
      resetBus: 'RESET_BUS',
    }),
    handleResetBus() {
      this.resetBus();
    },
    handleTestState() {
      this.fullSetBus([false, true, false, true, false, true, false, true]);
    },
  },
};
</script>

<style scoped lang="scss">
.bus-output {
  height: 100%;
  width: 20%;
  min-width: $min-block-width;

  @media screen and (max-width: 727px) {
    width: $block-width-mobile;
  }
}
</style>
