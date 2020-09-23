import axios from 'axios'
const { url } = require('../../helpers/env')

const state = () => {
  return {
    token: localStorage.getItem('token') || null
  }
}

const getters = {
  isLogin (state) {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  login (context, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post(`${url}/users/login`, payload)
        .then((response) => {
          console.log(response)
          if (response.code === 200) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refreshtoken', response.data.refreshToken)
          }
          resolve(response.message)
        })
        // .catch((err) => {
        //   reject(err)
        // })
    })
  },
  register (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/users/register`, payload)
        .then((response) => {
          resolve(response.data.message)
        })
    })
  },
  refreshToken (context, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post(`${url}/users/refreshtoken`, payload)
        .then((response) => {
          // console.log(response)
          localStorage.setItem('token', response.data.token)
          resolve(response.message)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters
}
