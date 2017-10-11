const Vue = require('vue');
const Vuex = require('vuex');
const VeeValidate = require('vee-validate');

const App = require('./views/App.vue');
const store = require('./store');

Vue.use(Vuex);
Vue.use(VeeValidate);

new Vue({
  el: '#app',
	store: new Vuex.Store(store),
  render: (h) => h(App),
});
