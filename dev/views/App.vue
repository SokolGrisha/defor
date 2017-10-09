<template>
  <div id="app">
    <navigation></navigation>

    <div class="container">
      <div class="card">
        <map-forests></map-forests>
      </div>
    </div>

    <forest></forest>
    <ethereum-modal></ethereum-modal>
    <add-info-modal></add-info-modal>
  </div>
</template>

<script>
  const Navigation = require('./Navigation.vue');
  const AddInfoModal = require('./AddInfoModal.vue');
  const EthereumModal = require('./EthereumModal.vue');
  const MapForests = require('./MapForests.vue');
  const Forest = require('./Forest.vue');


  module.exports = {
    components: {
      Navigation,
      AddInfoModal,
      EthereumModal,
      MapForests,
      Forest
    }
  }
</script>

<style scoped>
  .card {
    width: 100%;
    height: 70vh;
    margin-top: 100px;
  }
</style>
