<template>
  <div class="DecimalDisplay">
    <h1>Decimal Display</h1>

    <div class="led" :class="{ blueled : controlLines.doUpdateFromBus }">
      <span>w</span>
    </div>
    <div class="break"></div>

    <input v-model="busAsDecimalValue" class="display" >
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { boolArrayToBase10 } from '../../utils/BusConversions.js';

export default {
  name: 'DecimalDisplay',
  data: function() {
    return {
      outputRegister: [false, false, false, false, false, false, false, false],
    };
  },
  computed: {
    ...mapState(['bus', 'controlLines']),
    busAsDecimalValue() {
      return boolArrayToBase10([...this.outputRegister]) ;
    },
  },
  watch: {
    controlLines: function () {
      if (this.controlLines.doUpdateFromBus) {
        this.outputRegister = [...this.bus];
      }
    },
  },
};
</script>

<style scoped lang="scss">
.DecimalDisplay {
  width: $block-width;
  min-width: $min-block-width;

  @media screen and (max-width: 727px) {
    width: $block-width-mobile;
  }

  .display {
    color: white;
    background-color: grey;
    width: 50px;
    border: 2px solid $color-red;
    padding: 5px;
  }
}
</style>
