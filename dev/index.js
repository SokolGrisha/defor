const Vue = require('vue');
const VueRouter = require('vue-router');
const VueResource = require('vue-resource');

const App = require('./views/App.vue');
const Main = require('./views/Main.vue');
const Forest = require('./views/Forest.vue');

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';


var router = new VueRouter({
	routes: [
		{path: '*', redirect: '/main'},
		{path: '/', component: Main},
    {path: '/forest', component: Forest, props: (route) => ({ hash: route.query.hash })},
	]
});

new Vue({
  el: '#app',
	router,
  render: (h) => h(App),
});
