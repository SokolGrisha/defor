<template>
  <div class="container">
    <div class="card">
      <div class="card-image">
        <img src="img/forest.jpg">
        <span class="card-title">Хеш: {{hash}}</span>
      </div>
      <div class="card-content">
        <p>Дата: 24 декабря, 2020 года</p>
        <p>Долгота: 35*</p>
        <p>Ширина: 135*</p>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        hash: this.$route.query.hash
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .card {
    width: 70%;
    margin-top: -40px;
  }
</style>
