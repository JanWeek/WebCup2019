import axios from "axios"
import * as types from "../mutation-types"
import api from "../../api"

const state = {
  accessToken: /*localStorage.getItem('access-token') ||*/ false
}

const getters = {

}

const actions = {
  getToken({ commit }, { code }) {
    return new Promise((resolve, reject) => {
      api.getAuthToken(code)
        .then(response => {
          localStorage.setItem('access-token', response.data.access_token)
          /*let tokenExpireDate = new Date() + Date(response.data.expires_in)
          localStorage.setItem('token-expire-date', tokenExpireDate)*/
          localStorage.setItem('refresh-token', response.data.refresh_token)
          commit(types.SET_TOKEN)
          //axios.defaults.headers.common['Authorization'] = "Bearer AQAAAAAuPTbAAAWYHXx7dnKmyEE0iPNng1397ZQ"
          resolve()
        })
        .catch(e => {
          reject(e)
        })
      }) 
  },

  deleteToken({ commit }) {
    localStorage.removeItem('access-token')
    commit(types.DELETE_TOKEN)
  }
}

const mutations = {
  [types.SET_TOKEN] (state) {
    state.accessToken = localStorage.getItem('access-token')
  },

  [types.DELETE_TOKEN] (state) {
    state.accessToken = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

