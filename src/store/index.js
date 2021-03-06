import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import products from './products'
import category from './category'
import history from './history'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    products,
    category,
    history
  }
})
