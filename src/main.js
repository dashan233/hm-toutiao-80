import Vue from 'vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router'
import axios from '@/api'
import myPlugin from '@/components'
import '@/styles/index.less'

Vue.use(ElementUi)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(myPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
