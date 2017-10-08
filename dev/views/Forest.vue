<template>
  <div class="container">
    <div class="card">
      <div class="card-image">
        <img :src="data.image">
        <span class="card-title">Хеш: {{hash}}</span>
      </div>
      <div class="card-content">
        <p>Дата: {{data.date}}</p>
        <p>Долгота: {{data.x}}*</p>
        <p>Широта: {{data.y}}*</p>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        hash: this.$route.query.hash,
        data: {}
      }
    },
    mounted() {
      this.$http.get(options.api + '/get_info', {params: {hash: this.hash}}).then(response => {
        this.data = response.body;
      }, response => {
        Materialize.toast('Не удалось загрузить информацию.', 3000);
      });
    }
  }
</script>

<style scoped>
  .card {
    width: 70%;
    margin: 50px auto;
  }
</style>
