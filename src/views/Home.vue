<template>
  <div class="home">
    <CpuContainer />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import CpuContainer from "@/components/CpuContainer/CpuContainer.vue";

export default {
  name: "home",
  components: {
    CpuContainer
  },
  computed: mapState({
    items: state => state
  }),
  methods: {
    ...mapMutations({
      resetBus: "RESET_BUS"
    }),
  },
  created() {
    this.resetBus();
  },
};
</script>

<style lang="scss">
.home {
  @apply px-8;
}
</style>
