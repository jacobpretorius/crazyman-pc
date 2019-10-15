<template>
  <div class="BusOutput">
    <h1>Bus Output</h1>

    <div class="Input-Area">
      <input
        type="text"
        v-for="(busLine, index) in bus"
        :key="index"
        :value="busLine === true ? 1 : 0"
        class="Bus-Line"
        :class="{ lineHigh : busLine === true }"
      />
    </div>

    <button @click="handleResetBus">RESET STATE</button>
    <button @click="handleTestState">TEST STATE</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BusOutput",
  computed: {
    ...mapState(["bus"])
  },
  methods: {
    ...mapMutations({
      fullSetBus: "FULL_SET_BUS",
      resetBus: "RESET_BUS",
    }),
    handleResetBus() {
      this.resetBus();
    },
    handleTestState() {
      this.fullSetBus([false, true, false, true, false, true, false, true]);
    }
  }
};
</script>

<style scoped lang="scss">
.BusOutput {
  border: 2px solid $color-eucalyptus;
  padding: 5px;
  margin: 5px;
  min-width: 205px;
  
  .Input-Area {
    display: flex;

    .Bus-Line {
      width: 20px;
      padding: 3px;
      margin: 2px;
      border: 2px solid $color-gunmetal;

      &.lineHigh{
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