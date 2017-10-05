const Vue = require('vue');
const VueRouter = require('vue-router');

const App = require('./views/App.vue');
const Main = require('./views/Main.vue');

Vue.use(VueRouter);

var router = new VueRouter({
	routes: [
		{path: '*', redirect: '/main'},
		{path: '/', component: Main},
    // {path: '/forest', component: ForestData, props: (route) => ({ hash: route.query.hash })},
	]
});

new Vue({
  el: '#app',
	router,
  render: (h) => h(App),
});
