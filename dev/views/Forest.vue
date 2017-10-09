<template>
  <div id="forest" class="modal">
    <div class="card">
      <div class="card-image">
        <img :src="data.image">
      </div>
      <div class="card-content">
        <p class="flow-text">Дата: {{data.date | formatDate('MM/DD/YYYY, HH:mm:ss')}}</p>
        <p class="flow-text">Долгота: {{data.x}}°</p>
        <p class="flow-text">Широта: {{data.y}}°</p>
      </div>
    </div>
  </div>
</template>

<script>
  const options = require('../options');

  module.exports = {
    data() {
      return {
        data: {}
      }
    },
    filters: {
      formatDate(date, template) {
        var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
        date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
        return date.toISOString().split(/[-:.TZ]/).reduce(function(template, item, i) {
          return template.split(specs[i]).join(item);
        }, template);
      }
    },
    methods: {
      loadInfo(hash) {
        this.$http.get(options.api + '/get_info', {params: {hash}}).then(response => {
          this.data = response.body;
          $('#forest').modal('open');
        }, response => {
          Materialize.toast('Не удалось загрузить информацию.', 3000);
        });
      }
    },
    mounted() {
      this.$parent.$on('loadInfo', this.loadInfo);
    }
  }
</script>

<style scoped>
  .modal {
    background: none;
    box-shadow: none;
    overflow: hidden;
  }
</style>
