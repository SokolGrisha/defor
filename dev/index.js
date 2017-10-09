const Vue = require('vue');
const Vuex = require('vuex');

const App = require('./views/App.vue');
const store = require('./store');

Vue.use(Vuex);

new Vue({
  el: '#app',
	store: new Vuex.Store(store),
  render: (h) => h(App),
});
