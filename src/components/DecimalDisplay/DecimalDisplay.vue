<template>
  <div class="DecimalDisplay">
    <h1>Decimal Display</h1>

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
  min-width: 100px;
  width: 10%;

  .display {
    color: white;
    background-color: grey;
    width: 50px;
    border: 2px solid $color-red;
    padding: 5px;
  }
}
</style>
