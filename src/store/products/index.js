import axios from 'axios'
const { url } = require('../../helpers/env')

const state = () => {
  return {
    all: {
      products: [],
      loading: false
    },
    detail: []
  }
}

const mutations = {
  SET_PRODUCTS (state, payload) {
    state.all.products = payload
  },
  SET_LOADING (state, payload) {
    state.all.loading = payload
  },
  SET_PRODUCTS_DETAIL (state, payload) {
    state.detail = payload
  }
}

const getters = {
  getallData (state) {
    return state.all
  },
  getdetail (state) {
    return state.detail
  }
}

const actions = {
  getData (context, payload) {
    // console.log(payload)
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/products/getall`, {
        params: {
          name: payload
        }
      })
        .then((response) => {
          context.commit('SET_PRODUCTS', response.data)
          resolve(response.message)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          context.commit('SET_LOADING', false)
        })
    })
  },
  sendData (context, payload) {
    console.log(payload.image)
    const formdata = new FormData()
    formdata.append('product_name', payload.product_name)
    formdata.append('category_id', payload.category_id)
    formdata.append('product_price', payload.product_price)
    formdata.append('image', payload.image)
    return new Promise((resolve, reject) => {
      axios.post(url + '/products/insert', formdata)
        .then((response) => {
          resolve(response.message)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getDataDetail (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/products/getdetail/${payload}`)
        .then((response) => {
          context.commit('SET_PRODUCTS_DETAIL', response.data[0])
          resolve(response.message)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  updateData (context, payload) {
    console.log(payload)
    const formdata = new FormData()
    formdata.append('product_name', payload.product_name)
    formdata.append('category_id', payload.category_id)
    formdata.append('product_price', payload.product_price)
    formdata.append('image', payload.image)
    return new Promise((resolve, reject) => {
      axios.patch(url + `/products/updatedetail/${payload.id}`, formdata)
        .then((response) => {
          resolve(response.message)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  deleteData (context, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/products/delete/${payload}`)
        .then((response) => {
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
