import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/index.js'

Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
