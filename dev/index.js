const Vue = require('vue');
const VueResource = require('vue-resource');

const App = require('./views/App.vue');

Vue.use(VueResource);

new Vue({
  el: '#app',
  render: (h) => h(App),
});
