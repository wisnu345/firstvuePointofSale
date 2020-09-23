import axios from 'axios'
const { url } = require('../../helpers/env')

const state = () => {
  return {
    category: []
  }
}

const mutations = {
  SET_CATEGORY (state, payload) {
    state.category = payload
  }
}

const getters = {
  getallDataCategory (state) {
    return state.category
  }
}

const actions = {
  getData (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/category/getall?`)
        .then((response) => {
          context.commit('SET_CATEGORY', response.data)
          resolve(response.message)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
