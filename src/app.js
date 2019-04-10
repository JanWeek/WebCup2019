import Vue from "vue"

import router from "./router"
import App from "./App.vue"
import store from "./store"
//import * as types from "./store/mutation-types"

import Bootstrap from "bootstrap"
import "./scss/base.scss"


new Vue({  
  el: "#app",
  store,
  router,
  render: h => h(App),
  /*created() {
    this.$store.commit(types.RESET_LOADING_PROGRESS)
    this.$store.dispatch("getNewsCategories")
    this.$store.dispatch("getAllPages")
  }*/
})