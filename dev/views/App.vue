<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
  const Navigation = require('./Navigation.vue');

  module.exports = {
    components: {
      Navigation
    }
  }
</script>
