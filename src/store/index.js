import Vue from "vue"
import Vuex from "vuex"
import createPersist from "vuex-localstorage"
import auth from "./modules/auth"
import user from "./modules/user"
import gallery from "./modules/gallery"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let localStorage = createPersist({
  namespace: 'WEBCUP_APP',
  initialState: {},
  expires: 1.21e+9 // Две недели
})

export default new Vuex.Store({
    modules: {
    user,
    auth,
    gallery
  },
  strict: debug,
  plugins: [localStorage]
})