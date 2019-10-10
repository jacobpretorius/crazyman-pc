<template>
  <div class="home">
    <CpuContainer />
  </div>
</template>

<script>
import { mapState } from "vuex";

import CpuContainer from "@/components/CpuContainer/CpuContainer.vue";

export default {
  name: "home",
  components: {
    CpuContainer
  },
  computed: mapState({
    items: state => state
  }),
};
</script>
