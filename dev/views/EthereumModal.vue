<template>
  <div>
    <div id="ethereum-key-modal" class="modal">
      <div class="modal-content">
        <h4>Ethereum ключ</h4>
        <p>Введите ваш Ethereum ключ, чтобы получить доступ к информации о лесах.</p>
        <form class="col s12" @submit.prevent="enterKey">
          <div class="input-field">
            <input id="ethereum-key" v-model="key" autocomplete="off" class="validate" data-error="wrong" placeholder="Введите ключ" data-success="right">
          </div>
        </form>
      </div>
    </div>
    <a class="btn-floating btn-large waves-effect waves-light green modal-trigger tooltipped" data-position="left"  data-delay="50" data-tooltip="Ввести ethereum ключ"  href="#ethereum-key-modal"><i class="material-icons">account_balance_wallet</i></a>
  </div>
</template>

<script>
  const store = require('../store');

  module.exports = {
    data() {
      return {
        key: ''
      }
    },
    methods: {
      enterKey() {
        this.$store.commit('setEthKey', this.key);
        $('#ethereum-key-modal').modal('close');
      }
    },
    mounted() {
      $('#ethereum-key-modal').modal({
        endingTop: '20%'
      });
      $('#ethereum-key-modal').modal('open');
    }
  }
</script>

<style scoped>
  a.btn-floating {
    position: absolute;
    bottom: 35px;
    right: 25px;
  }
</style>
