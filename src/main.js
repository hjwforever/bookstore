import Vue from 'vue'

import axios from 'axios'
import './plugin'
import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/utils/request'

import '@/icons'
import '@/permission'

import { hasAnyRight, RIGHTS } from '@/utils/permission'
import VueLazyload from 'vue-lazyload'

axios.defaults.withCredentials = true
request.defaults.withCredentials = true
Vue.use(ElementUI)
Vue.use(VueLazyload)

axios.defaults.baseURL = process.env.VUE_APP_BASE_API

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$request = request
Vue.prototype.RIGHTS = RIGHTS
Vue.prototype.hasAnyRight = hasAnyRight
window.axios = axios
window.request = request

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
