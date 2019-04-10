import api from "../../api"
import * as types from "../mutation-types"
import Vuex from "vuex"
import { resolve } from "path";
import { rejects } from "assert";

const state = {
  logged_in: false,
  username: false,
  real_name: false,
  user_avatar: false
}

const getters = {
  isLoggedIn: state => state.logged_in,
  userDisplayName: state => state.username,
  userRealName: state => state.real_name,
  userAvatar: state => state.user_avatar
}

const actions = {
  login({ commit }) {
    var token = localStorage.getItem('access-token')
    api.getUserMeta(token)
      .then(response => {
        let displayName = response.data.display_name
        let realName = response.data.real_name
        let defaultAvatarId = response.data.default_avatar_id
        commit(types.LOGIN_USER, { displayName, realName })
        commit(types.USER_AVATAR, { defaultAvatarId })
      })
      .catch(e => {
      })
  },

  logout({ commit }) {
    commit(types.LOGOUT_USER)
  }
}

const mutations = {
  [types.LOGIN_USER] (state, { displayName, realName }) {
    state.logged_in = true
    state.username = displayName
    state.real_name = realName
  },

  [types.USER_AVATAR] (state,  { defaultAvatarId }) {
    state.user_avatar = "https://avatars.yandex.net/get-yapic/" + defaultAvatarId + "/islands-retina-50"
  },

  [types.LOGOUT_USER] (state) {
    state.logged_in = false
    state.username = false
    state.real_name = false
    state.user_avatar = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}