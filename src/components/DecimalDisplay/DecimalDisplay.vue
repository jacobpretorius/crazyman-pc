<template>
  <div class="DecimalDisplay">
    <h1>Decimal Display</h1>
    <div class="break"></div>

    <input v-model="busAsDecimalValue" class="display" >
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { boolArrayToBase10 } from '../../utils/BusConversions.js';

export default {
  name: 'DecimalDisplay',
  computed: {
    ...mapState(['bus']),
    busAsDecimalValue() {
      return boolArrayToBase10([...this.bus]) ;
    },
  },
};
</script>

<style scoped lang="scss">
.DecimalDisplay {
  width: $block-width;
  min-width: $min-block-width;

  @media screen and (max-width: max-mobile-size) {
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
