<template>
  <div class="BusOutput">
    <button @click="handleButtonClick">FULL RESET STATE</button>

    <div class="Input-Area">
      <input
        type="text"
        v-for="(busLine, index) in bus"
        :key="index"
        :value="busLine"
        class="Bus-Line"
        :class="{ lineHigh : busLine === 1 }"
      />
    </div>
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
      fullSetBus: "FULL_SET_BUS"
    }),
    handleButtonClick() {
      this.fullSetBus([1, 1, 1, 1, 0, 0, 0, 0]);
    }
  }
};
</script>

<style scoped lang="scss">
.BusOutput {
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
}
</style>