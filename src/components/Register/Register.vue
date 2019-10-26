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
        @keypress="checkValueValidBinaryChar(index, $event)"
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
      readFromBus: false, // temp
      readEnabledLED: false,
      writeEnabledLED: false,
    };
  },
  computed: {
    ...mapState(['bus', 'clockHigh', 'registers']),
    register: function() {
      return this.registers[this.registerName];
    },
    displayRegister() {
      return [...this.register].reverse();
    },
  },
  watch: {
    clockHigh: function() {
      // Read from BUS
      if (this.readFromBus) {
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
    checkValueValidBinaryChar(index, event) {
      if (event.key === '1' || event.key === '0') {
        let updatedRegister = [...this.register];
        updatedRegister[index] = event.key === '1';

        this.setRegister({
          registerName: this.registerName,
          value: updatedRegister,
        });
        return;
      }
      event.preventDefault();
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
  border: 2px solid $color-eucalyptus;
  padding: 5px;
  margin: 5px;
  min-width: 206px;
}
</style>
