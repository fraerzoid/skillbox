import Vue from 'vue';
import App from './App.vue';
import data from './task3_2/data';
import api from './task3_2/api';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

api.alertMessage(data.helloMessage);
api.alertMessage(data.byeMessage);
