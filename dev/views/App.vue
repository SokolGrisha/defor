<template>
  <div id="app">
    <navigation></navigation>

    <map-forests></map-forests>

    <forest></forest>
    <ethereum-modal></ethereum-modal>
    <add-info-modal></add-info-modal>

    <loader v-show="loading"></loader>
  </div>
</template>

<script>
  const Navigation = require('./Navigation.vue');
  const AddInfoModal = require('./AddInfoModal.vue');
  const EthereumModal = require('./EthereumModal.vue');
  const MapForests = require('./MapForests.vue');
  const Forest = require('./Forest.vue');
  const Loader = require('./Loader.vue');

  module.exports = {
    components: {
      Navigation,
      AddInfoModal,
      EthereumModal,
      MapForests,
      Forest,
      Loader
    },
    computed: {
      loading() {
        return this.$store.state.loading;
      }
    }
  }
</script>

<style scoped>
  #app {
    min-height: 100vh;
    overflow: hidden;
  }
</style>
