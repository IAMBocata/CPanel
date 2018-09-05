// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from './api/config'

import VueSession from 'vue-session'

import VueMaterial from 'vue-material'
import VueSweetalert2 from 'vue-sweetalert2'

import ToggleButton from 'vue-js-toggle-button'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueSweetalert2)
Vue.use(VueSession)
Vue.use(ToggleButton)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
