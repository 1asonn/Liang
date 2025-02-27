import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from './axios.js'
import global from './globalFun.js'
import i18n from './i18n/index.js'
require("./mock.js")


Vue.prototype.$axios = axios 
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
