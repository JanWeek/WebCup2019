<template>
  <div id="my-app" class="page-wrapper">
    <app-header v-bind:auth-link="authLink" />
    <div class="site-content">
      <router-view></router-view>
    </div>
    
    <transition name="modal">
      <modal v-if="showModal" />
    </transition>
  </div>
</template>

<script>
import EventBus from "./EventBus/event-bus"
import SETTINGS from "../settings"

import Header from "./components/Layout/Header.vue"
import Modal from "./components/Modal/Modal.vue"

export default {
  data() {
    return {
      showModal: false,
      authLink: SETTINGS.AUTH_URL+"authorize?response_type=code&client_id="+SETTINGS.CLIENT_ID
    }
  },

  mounted() {
    EventBus.$on("showModal", () => {
      this.showModal = true
      document.body.style.overflowY = "hidden"
    })
    EventBus.$on("closeModal", () => {
      this.showModal = false
      document.body.style.overflow = "auto"
    })
  },

  components: {
    appHeader: Header,
    modal: Modal
  }
}
</script>
