<template>
  <div class="Register">
    <h1>Register {{ registerName }}</h1>

    <div class="led" :class="{ write : this.writeEnabledLED }">
      <span>w</span>
    </div>
    <div class="led" :class="{ read : this.readEnabledLED }">
      <span>r</span>
    </div>

    <div class="Input-Area">
      <input
        type="text"
        v-for="(registerLine, index) in register"
        :key="`register-${registerName}-${index}`"
        :value="registerLine === true ? 1 : 0"
        @keypress="checkValueValidBinaryChar(index, $event)"
        class="Bus-Line"
        :class="{ lineHigh : registerLine === true }"
      />
    </div>

    <button @click="handleClearRegister">RESET</button>
    <button @click="loadRegisterFromBus">READ</button>
    <button @click="writeRegisterToBus">WRITE</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

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
      readEnabled: false,
      writeEnabled: false,
      readEnabledLED: false,
      writeEnabledLED: false,
    };
  },
  computed: {
    ...mapState(['bus', 'clockHigh']),
    ...mapGetters(['getRegisters', 'getBus']),
    register: function() {
      return this.getRegisters[this.registerName];
    },
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
        updatedRegister: [...this.getBus],
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
        var updatedRegister = [...this.register];
        updatedRegister[index] = event.key === '1' ? true : false;

        this.setRegister({
          registerName: this.registerName,
          updatedRegister,
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
  watch: {
    clockHigh: function() {
      // Read from BUS
      if (this.readEnabled) {
        this.loadRegisterFromBus();
      }
    },
  },
  created() {
    this.resetRegister(this.registerName);
  },
};
</script>

<style scoped lang="scss">
.Register {
  h1 {
    display: inline-block;
  }

  border: 2px solid $color-eucalyptus;
  padding: 5px;
  margin: 5px;
  min-width: 206px;

  .led {
    width: 20px;
    height: 20px;
    background-color: $color-gunmetal;
    padding: 0 2px;
    margin: 2px 2px 5px 2px;
    float: right;
    border-radius: 10px;
    opacity: 0.5;
    text-align: center;
    color: white;

    :first-child {
      vertical-align: top;
      top: -2px;
      position: relative;
    }
  }

  .read {
    background-color: $color-electric-blue;
    opacity: 1;
  }

  .write {
    background-color: $color-Red;
    opacity: 1;
  }

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
    margin: 2px;
    border: 1px solid $color-gunmetal;
  }
}
</style>