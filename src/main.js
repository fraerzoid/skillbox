import loader from 'vue-ui-preloader';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(loader);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
