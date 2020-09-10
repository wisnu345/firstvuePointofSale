import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Unicon from 'vue-unicons'
import { uniLayerGroupMonochrome, uniCarWash, uniConstructor } from 'vue-unicons/src/icons'
import 'bootstrap/dist/css/bootstrap.css'

Unicon.add([uniLayerGroupMonochrome, uniCarWash, uniConstructor])
Vue.use(Unicon)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
