import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'
import VCharts from 'v-charts'
import 'echarts/lib/component/title'
import './index.less'
import './lib/filters.js'

Vue.config.productionTip = false

Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
