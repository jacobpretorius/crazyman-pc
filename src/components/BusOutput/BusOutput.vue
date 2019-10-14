<template>
  <div class="BusOutput">
    <h1>Bus Output</h1>

    <div class="Input-Area">
      <input
        type="text"
        v-for="(busLine, index) in bus"
        :key="`busline-${index}`"
        :value="busLine"
        @keypress="checkValueValidBinaryChar(index, $event)"
        class="Bus-Line"
        :class="{ lineHigh : busLine === 1 }"
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
  },
  methods: {
    ...mapMutations({
      fullSetBus: 'FULL_SET_BUS',
      updateBus: 'UPDATE_BUS',
      resetBus: 'RESET_BUS',
    }),
    handleResetBus() {
      this.resetBus();
    },
    handleTestState() {
      this.fullSetBus([1, 1, 1, 1, 0, 0, 0, 0]);
    },
    checkValueValidBinaryChar(busline, event) {
      if (event.key === '1' || event.key === '0') {
        this.updateBus({ index : busline, value : event.key });
        return;
      }else{
        event.preventDefault();
      }
    },
  },
  created() {
    this.resetBus();
  },
};
</script>

<style scoped lang="scss">
.BusOutput {
  border: 2px solid $color-eucalyptus;
  padding: 5px;
  margin: 5px;

  .Input-Area {
    display: flex;

    .Bus-Line {
      width: 20px;
      padding: 3px;
      margin: 2px;
      border: 2px solid $color-gunmetal;

      &.lineHigh {
        border: 2px solid $color-eucalyptus;
      }
    }
  }

  button {
    padding: 0 2px;
    margin: 0 2px;
    border: 1px solid $color-gunmetal;
  }
}
</style>