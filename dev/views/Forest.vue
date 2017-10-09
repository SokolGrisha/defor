<template>
  <div id="forest" class="modal">
    <div class="card">
      <div class="card-image">
        <div class="image" :style="{ backgroundImage: 'url(' + info.image + ')' }"></div>
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
