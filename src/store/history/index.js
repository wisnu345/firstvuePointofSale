import axios from 'axios'
const { url } = require('../../helpers/env')

const state = () => {
  return {
    all: {
      history: []
    },
    history: []
  }
}

const mutations = {
  SET_ALL_HISTORY (state, payload) {
    state.all.history = payload
  },
  SET_HISTORY (state, payload) {
    state.history = payload
  }
}

const getters = {
  getallData (state) {
    return state.all.history
  },
  getHistory (state) {
    return state.history
  }
}

const actions = {
  getHistory (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/history/gethistory`)
        .then((response) => {
          context.commit('SET_HISTORY', response.data)
          resolve(response.message)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getData (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/history/getall`)
        .then((response) => {
          context.commit('SET_ALL_HISTORY', response.data)
          resolve(response.message)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  sendData (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post(url + '/history/insert', payload)
        .then((response) => {
          // console.log(response)
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
