<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
    <ethereum-modal></ethereum-modal>
    <add-info-modal></add-info-modal>
  </div>
</template>

<script>
  const Navigation = require('./Navigation.vue');
  const AddInfoModal = require('./AddInfoModal.vue');
  const EthereumModal = require('./EthereumModal.vue');

  module.exports = {
    components: {
      Navigation,
      AddInfoModal,
      EthereumModal
    }
  }
</script>
