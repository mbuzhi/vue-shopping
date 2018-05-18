import Vue from 'vue'
import Vuex from 'vuex'

import productData from '../api/product'

Vue.use(Vuex)

function getFilterArray (array) {
  const res = []
  const json = {}
  for (let i = 0; i < array.length; i++) {
    const _self = array[i]
    if (!json[_self]) {
      res.push(_self)
      json[_self] = 1
    }
  }
  return res
}
const state = {
  testId: 111333,
  productList: []
}
const getters = {
  list: (state) => {
    return state.productList
  },
  brands: (state) => {
    return getFilterArray(state.productList.map(item => item.brand))
  },
  colors: (state) => {
    return getFilterArray(state.productList.map(item => item.color))
  }
}
const mutations = {
  setProductList: (state, data) => {
    state.productList = data
  }
}
const actions = {
  getProductList: (context) => {
    setTimeout(() => {
      context.commit('setProductList', productData)
    }, 500)
  }
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
export default store
