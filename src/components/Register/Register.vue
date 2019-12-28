<template>
  <div class="Register">
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
  data: function() {
    return {
      readEnabledLED: false,
      writeEnabledLED: false,
    };
  },
  computed: {
    ...mapState(['bus', 'clockHigh', 'registers', 'controlLines']),
    register: function() {
      return this.registers[this.registerName];
    },
    displayRegister() {
      return [...this.register].reverse();
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
      this.blinkReadEnabledLed();
      this.setRegister({
        registerName: this.registerName,
        value: [...this.bus],
      });
    },
    writeRegisterToBus() {
      this.blinkWriteEnabledLed();
      this.fullSetBus(this.register);
    },
    handleClearRegister() {
      this.resetRegister(this.registerName);
    },
    blinkReadEnabledLed() {
      this.readEnabledLED = true;
      window.setTimeout(() => {
        this.readEnabledLED = false;
      }, 350);
    },
    blinkWriteEnabledLed() {
      this.writeEnabledLED = true;
      window.setTimeout(() => {
        this.writeEnabledLED = false;
      }, 350);
    },
  },
};
</script>

<style scoped lang="scss">
.Register {
  min-width: 206px;
  width: 30%;
}
</style>
