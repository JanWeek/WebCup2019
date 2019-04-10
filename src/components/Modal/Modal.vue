<template>
  <div class="modal-mask">
    <div class="modal-content">
      <div class="modal-content__close-wrapper">
        <div class="modal-close">
          <span class="modal-close-icon" @click="closeModal()"></span>
        </div>
      </div>
      <div class="modal-content__header">
        <div class="img-wrapper">
          <img :src="this.userAvatar" alt="Аватар пользователя">
        </div>
        <div class="user-info">
          <h3>{{ this.userRealName }}</h3>
          <h4>{{ this.userDisplayName }}</h4>
        </div>
      </div>
      <div class="modal-content__body">
        <span @click="logout()">Выйти...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import EventBus from "../../EventBus/event-bus"

export default {
  computed: {
    ...mapGetters({
      userDisplayName: "userDisplayName",
      userRealName: "userRealName",
      userAvatar: "userAvatar"
    })
  },
  
  methods: {
    closeModal: function() {
      EventBus.$emit("closeModal")
    },

    logout: function() {
      this.$store.dispatch("logout")
      this.$store.dispatch("deleteToken")
      this.closeModal()
    }
  }
}
</script>
