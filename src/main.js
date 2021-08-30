import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// 全局echarts对象的挂载
Vue.prototype.$echarts = window.echarts;

Vue.config.productionTip = false

const bus = new Vue();
export default bus;
Vue.prototype.bus = bus;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
