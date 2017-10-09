<template>
  <div id="app">
    <navigation></navigation>

    <div class="container">
      <div class="card">
        <map-forests @loading="setLoading"></map-forests>
      </div>
    </div>

    <forest @loading="setLoading"></forest>
    <ethereum-modal @loading="setLoading"></ethereum-modal>
    <add-info-modal @loading="setLoading"></add-info-modal>

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
    data() {
      return {
        loading: false
      }
    },
    methods: {
      setLoading(v) {
        console.log(v);
        this.loading = v;
      }
    },
    mounted() {
      $('.modal').modal({
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '18%', // Ending top style attribute
      });
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
