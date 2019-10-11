<template>
  <div class="Register">
    <h1>Register {{ registerName }}</h1>

    <div class="Input-Area">
      <input
        type="text"
        v-for="(registerLine, index) in register"
        :key="index"
        :value="registerLine"
        @keypress="checkValueValidBinaryChar"
        class="Bus-Line"
        :class="{ lineHigh : registerLine === 1 }"
      />
    </div>

    <button @click="handleClearRegister">RESET REGISTER</button>
    <button @click="handleTestRegister">TEST REGISTER</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "Register",
  props: {
    registerName: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState(["bus"]),
    ...mapGetters(["getRegisters"]),
    register: function() {
      return this.getRegisters[this.registerName];
    }
  },
  methods: {
    ...mapMutations({
      setRegister: "SET_REGISTER",
      resetRegister: "RESET_REGISTER"
    }),
    handleClearRegister() {
      this.resetRegister(this.registerName);
    },
    handleTestRegister() {
      this.setRegister({ 
        registerName: this.registerName,
        updatedRegister: [1, 1, 1, 1, 0, 0, 0, 0] 
      });
    },
    checkValueValidBinaryChar(event) {
      if (event.key === "1" || event.key === "0") {
        return;
      }
      event.preventDefault();
    }
  },
  created() {
    this.resetRegister(this.registerName);
  }
};
</script>

<style scoped lang="scss">
.Register {
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