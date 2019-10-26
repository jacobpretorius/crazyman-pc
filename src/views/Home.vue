<template>
  <div class="home">
    <CpuContainer />
  </div>
</template>

<script>
import CpuContainer from '@/components/CpuContainer/CpuContainer.vue';

export default {
  name: 'home',
  components: {
    CpuContainer,
  },
};
</script>

<style lang="scss">
.home {
  padding: 0 2rem;
}
</style>
