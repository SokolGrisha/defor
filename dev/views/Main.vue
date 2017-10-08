<template>
  <div class="container">
    <div class="card">
      <map-forests></map-forests>
    </div>
  </div>
</template>

<script>
  const MapForests = require('./MapForests.vue');

  module.exports = {
    components: {
      MapForests
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
