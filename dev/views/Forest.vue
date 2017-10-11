<template>
  <div id="forest" class="modal">
    <div class="card modal-fixed-footer">
      <div class="card-image">
        <img class="responsive-img materialboxed" :src="info.image"></img>
      </div>
      <div class="card-content">
        <p class="flow-text">Дата: {{info.date | formatDate('MM/DD/YYYY, HH:mm:ss')}}</p>
        <p class="flow-text">Долгота: {{info.x}}°</p>
        <p class="flow-text">Широта: {{info.y}}°</p>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    computed: {
      info() {
        $('#forest').modal('open');
        return this.$store.state.info;
      }
    },
    filters: {
      formatDate(date, template) {
        var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
        date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
        return date.toISOString().split(/[-:.TZ]/).reduce((template, item, i) => {
          return template.split(specs[i]).join(item);
        }, template);
      }
    }
  }
</script>

<style scoped>
  .modal {
    background: none;
    box-shadow: none;
    overflow-y: initial;
  }
  .card-content {
    position: absolute;
    bottom: 0px;
    background: #fff;
    width: 100%;
  }
  @media (max-width: 1280px) {
    .card-content {
      bottom: -50px;
    }
  }
  @media (max-width: 720px) {
    .card-content {
      bottom: -100px;
    }
  }
</style>
