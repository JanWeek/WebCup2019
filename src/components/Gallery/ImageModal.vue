<template >
  <transition name="fade">
    <div 
      class="modal-mask--image" 
      v-if="this.visible"
      @click.self="closeDialog()"
    >
      <div class="modal__header">
        <div class="header__filename">
          {{ this.subStrLink }}
        </div>
        <div class="header__download">
          <a :href="this.image.file">Скачать файл </a>
        </div>
      </div>
      <div class="modal-content--image">
        <img :src="this.image.preview" alt="">
      </div>
      <div class="modal-buttons">
        <div
          class="btn__close"
          @click="closeDialog()"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
        <div 
          class="btn__prev"
          :class="{disable: this.currentIndex === 0}"
          @click="prevImage()"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-prev"></use>
          </svg>
        </div>
        <div 
          class="btn__next"
          :class="{disable: this.currentIndex === this.imagesOnPage.length - 1}"
          @click="nextImage()"
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-next"></use>
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import "../../assets/svg/iconfont"

import { mapGetters } from "vuex"

import EventBus from "../../EventBus/event-bus"

export default {
  props: ["index", "visible"],

  data() {
    return {
      image: false,
      currentIndex: false
    }
  },

  computed: {
    ...mapGetters({
      imagesOnPage: "imagesOnPage",
      isLoggedIn: "isLoggedIn"
    }),

    subStrLink: function() {
      if (this.image.name.length > 50) {
        return this.image.name.substr(0, 50) + "..."
      }
        else return this.image.name
    }
  },

  watch: {
    index (index) {
      this.currentIndex = this.index
    },

    currentIndex() {
      this.image = this.imagesOnPage[this.currentIndex]
    }
  },

  methods: {
    closeDialog() {
      EventBus.$emit('hideImage')
    },

    nextImage() {
      if (this.currentIndex === this.imagesOnPage.length - 1) 
        return false
      this.currentIndex += 1
    },

    prevImage() {
      if (this.currentIndex === 0)
        return false
      this.currentIndex -= 1
    },

    setImage() {
      this.currentIndex = this.index
    }

    // нереализованный функционал добавления файла на Я.Диск пользователя

    /*saveToDisk() {
      const imgPath = this.image.path
      this.$store.dispatch('saveToDisk', { path: "/1500x500.jfif" })
    }*/
  }
}
</script>
