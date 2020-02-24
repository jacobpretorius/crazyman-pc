<template>
  <div class="register">
    <h1>Register {{ registerName }}</h1>

    <div class="led" :class="{ redlead : this.writeEnabledLED }">
      <span>w</span>
    </div>
    <div class="led" :class="{ bluelead : this.readEnabledLED }">
      <span>r</span>
    </div>
    <div class="break"></div>

    <div class="input-area">
      <input
        v-for="(registerLine, index) in displayRegister"
        :key="`register-${registerName}-${index}`"
        type="text"
        :value="registerLine === true ? 1 : 0"
        class="bus-line"
        :class="{ lineHigh : registerLine === true }"
        disabled
      />
    </div>

    <button @click="handleClearRegister">RESET</button>
    <button @click="loadRegisterFromBus">READ</button>
    <button @click="writeRegisterToBus">WRITE</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Register',
  props: {
    registerName: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState(['bus', 'clockHigh', 'registers', 'controlLines']),
    register() {
      return this.registers[this.registerName];
    },
    displayRegister() {
      return [...this.register].reverse();
    },
    readEnabledLED() {
      return this.registerName === 'A' ? this.controlLines.regAReadContentsFromBus : this.controlLines.regBReadContentsFromBus;
    },
    writeEnabledLED() {
      return this.registerName === 'A' ? this.controlLines.regAWriteToBus : this.controlLines.regBWriteToBus;
    },
  },
  watch: {
    controlLines: function() {
      // Write to bus
      if (this.controlLines.regAWriteToBus && this.registerName === 'A') {
        this.writeRegisterToBus();
      }
      if (this.controlLines.regBWriteToBus && this.registerName === 'B') {
        this.writeRegisterToBus();
      }

      // Read from BUS
      if (this.controlLines.regAReadContentsFromBus && this.registerName === 'A') {
        this.loadRegisterFromBus();
      }
      if (this.controlLines.regBReadContentsFromBus && this.registerName === 'B') {
        this.loadRegisterFromBus();
      }
    },
  },
  created() {
    this.resetRegister(this.registerName);
  },
  methods: {
    ...mapMutations({
      setRegister: 'SET_REGISTER',
      resetRegister: 'RESET_REGISTER',
      fullSetBus: 'FULL_SET_BUS',
    }),
    loadRegisterFromBus() {
      let tempBus = [...this.bus].fill(false);
      for (let i = 0; i < 4; i++) {
        tempBus[i] = this.bus[i]
      }

      this.setRegister({
        registerName: this.registerName,
        value: this.controlLines.reg4BitMode 
          ? tempBus 
          : [...this.bus],
      });
    },
    writeRegisterToBus() {
      this.fullSetBus(this.register);
    },
    handleClearRegister() {
      this.resetRegister(this.registerName);
    },
  },
};
</script>

<style scoped lang="scss">
.register {
  width: $block-width;
  min-width: $min-block-width;

  @media screen and (max-width: 727px) {
    width: $block-width-mobile;
  }
}
</style>
