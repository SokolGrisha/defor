<template>
  <div id="app">
    <navigation></navigation>

    <div class="container">
      <div class="card">
        <map-forests @loading="setLoading"></map-forests>
      </div>
    </div>

    <forest :ethAPI="ethAPI" :ethKey="ethKey" @loading="setLoading"></forest>
    <ethereum-modal @setEthKey="setEthKey" @loading="setLoading"></ethereum-modal>
    <add-info-modal :ethAPI="ethAPI" :ethKey="ethKey" @loading="setLoading"></add-info-modal>

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

  const ethContract = require('../contract.json');
  const EthAPI = require('../EthAPI');

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
        loading: false,
        ethKey: '',
        ethAPI: new EthAPI(ethContract.adress, ethContract.contract)
      }
    },
    methods: {
      setLoading(v) {
        this.loading = v;
      },
      setEthKey(key) {
        this.ethKey = key;
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
