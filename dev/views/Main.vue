<template>
  <div class="container">
    <div class="card">
      <map-forests></map-forests>
    </div>

    <ethereum-modal></ethereum-modal>
  </div>
</template>

<script>
  const MapForests = require('./MapForests.vue');
  const EthereumModal = require('./EthereumModal.vue');

  module.exports = {
    components: {
      MapForests,
      EthereumModal
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
