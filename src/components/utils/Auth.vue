<template>
  <div class="auth">
    <p>Загрузка...</p> 
    <p v-if="this.error">Ошибка подключения к API</p>
  </div>
</template>

<script>
import api from '../../api'

export default {
  data() {
    return {
      error: false
    }
  },

  props: ["code"],

  created() {
    this.getToken()
  },

  methods: {
    getToken() {
      this.$store.dispatch("getToken", { code: this.code })
        .then(() => {
          this.$store.dispatch("login")
          this.$router.push("/")
        })
        .catch(() => {
          this.error = true
          setTimeout(this.$router.push("/"), 5000)
        })
    }
  }
}
</script>
