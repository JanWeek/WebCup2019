<template>
  <header class="navbar navbar-header navbar-light navbar-expand-md fixed-top">
    <div class="header__logo">
      <router-link class="navbar-brand" to="/">Галерея</router-link>
    </div>
    <div class="header__btn-grp btn-group" >
      <div class="user-wrapper" title="Ваш профиль" v-if="this.isLoggedIn">
        <span class="user__avatar" @click="showModal()" v-bind:style="{ backgroundImage: 'url(' + this.userAvatar + ')' }"></span>
      </div>
      <div class="auth-wrapper" title="Войти через Яндекс" v-else>
        <a v-bind:href="authLink">
          <span class="auth__icon"></span>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import EventBus from "../../EventBus/event-bus"
import { mapGetters } from "vuex"
export default {
  props: ["authLink"],

  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      userAvatar: "userAvatar"
    })
  },

  methods: {
    showModal: function() {
      EventBus.$emit("showModal")
    }
  }
}
</script>
