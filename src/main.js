import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Unicon from 'vue-unicons'
import { uniLayerGroupMonochrome, uniCarWash, uniConstructor } from 'vue-unicons/src/icons'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'
import axios from 'axios'

axios.defaults.headers = {
  token: localStorage.getItem('token')
}

axios.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  const status = err.response.status
  console.log(status)
  if (status === 409) {
    window.location = '/refreshtoken'
  }
})

Unicon.add([uniLayerGroupMonochrome, uniCarWash, uniConstructor])
Vue.use(Unicon)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
