import * as types from "../mutation-types"
import api from "../../api"

const state = {
  images: false,
  imagesTotal: false,
  imagesLimit: false
}

const getters = {
  imagesOnPage: state => state.images,
  imagesTotal: state => state.imagesTotal,
  imagesLimit: state => state.imagesLimit
}

const actions = {
  getImages({ commit }, { show, skip }) {
    return new Promise((resolve, reject) => {
      api.getImagesFromDisk({ show, skip })
      .then(response => {
        let images = response.data._embedded.items
        let total = response.data._embedded.total
        let limit = response.data._embedded.limit
        commit(types.FETCH_IMAGES, { images })
        commit(types.TOTAL_IMAGES, { total })
        commit(types.IMAGES_LIMIT, { limit })
        resolve()
      })
      .catch(e => {
        reject()
      })
    })
  }

  //  нереализованный функционал сохранения файла на Я.Диск пользователя

  /*saveToDisk( { path }) {
    const token = localStorage.getItem('access-token')
    return new Promise((resolve, reject) => {
      api.saveResourceToDisk({ path, token })
        .then(response => {
        })
        .catch(e => {
        })
    })
  }*/
}

const mutations = {
  [types.FETCH_IMAGES] (state, { images }) {
    state.images = images
  },

  [types.TOTAL_IMAGES] (state, { total }) {
    state.imagesTotal = total
  },

  [types.IMAGES_LIMIT] (state, { limit }) {
    state.imagesLimit = limit
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}