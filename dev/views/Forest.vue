<template>
  <div id="forest" class="modal">
    <div class="card">
      <div class="card-image">
        <div class="image" :style="{ backgroundImage: 'url(' + data.image + ')' }"></div>
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
    props: ['ethAPI', 'ethKey'],
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
        this.ethAPI.check(hash, '0x9267549a2c01237b35515c9463dB994A8173B1d5').then((data) => {
          if(data) {
            this.$emit('loading', true);
            this.$http.get(options.api + '/get_info', {params: {hash}}).then(response => {
              this.data = response.body;
              $('#forest').modal('open');
              this.$emit('loading', false);
            }, response => {
              Materialize.toast('Не удалось загрузить информацию.', 3000);
              this.$emit('loading', false);
            });
          } else {
            Materialize.toast('Данные повреждены', 3000);
            this.$emit('loading', false);
          }
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
  .image {
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 500px;
  }

  @media (max-width: 480px) {
    .image {
      height: 250px;
    }
  }
</style>
