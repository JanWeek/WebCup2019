<template>
  <div class="gallery-wrapper">
    <h1>Галерея</h1>
    <div class="gallery__header">
      <div class="gallery__control">
        Показывать на странице:
        <span 
          class="images-quantity"
          :class="{active : this.show === 10}"
          @click="showQnty(10)"
        >10</span>
        <span 
          class="images-quantity"
          :class="{active : this.show === 20}"
          @click="showQnty(20)"  
        >20</span>
        <span 
          class="images-quantity"
          :class="{active : this.show === 50}"
          @click="showQnty(50)"
        >50</span>
        <span 
          class="images-quantity"
          :class="{active : this.show === this.imagesTotal}"
          @click="showQnty(imagesTotal)"
        >все</span>
      </div>
    </div>
    <div class="fluid-container">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-xl-3 image-card"
          v-for="(image, index) in this.images" 
          :key="index"
        >
          <div class="image-preview-wrapper">
            <img 
              :src="image.preview" 
              alt=""
              @click="showImage(index)"
            >
          </div>
        </div>
      </div>
    </div>
    <nav class="pagination-wrapper" v-if="this.imagesTotal > this.show">
      <ul class="pagination justify-content-center">
        <li 
          class="page-item d-none d-sm-block"
          :class="{disabled : currentPage === 1}"
          
        >
          <span 
            class="page-link" 
            @click="goToPage(1)"
          >
            Первая
          </span>
        </li>
        <li 
          class="page-item"
          :class="{disabled : currentPage === 1}"
        >
          <span 
            class="page-link"
            @click="goToPage(--currentPage)"
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Предыдущая</span>
          </span>
        </li>
        <li 
          class="page-item d-none d-sm-block" 
          v-for="index in pagesTotal" 
          :key="index"
          :class="{ active : index === currentPage }"
        >
          <span 
            class="page-link"
            :class="{ active : index === currentPage }"
            @click="goToPage(index, $event)"
          >
            {{ index }}
          </span>
          </li>
        <li 
          class="page-item"
          :class="{ disabled : currentPage === pagesTotal }"
        >
          <span 
            class="page-link"
            @click="goToPage(++currentPage)"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Следующая</span>
          </span>
        </li>
        <li 
          class="page-item d-none d-sm-block"
          :class="{ disabled : currentPage === pagesTotal }"
        >
          <span 
            class="page-link"
            @click="goToPage(pagesTotal)"
          >
            Последняя
          </span>
        </li>
      </ul>
    </nav>
    <imageModal :index="this.showIndex" :visible="this.showModalImage"/>
    <loader v-if="this.showLoader"/>
  </div>
</template>

<script>
import EventBus from "../EventBus/event-bus"

import { mapGetters } from "vuex"

import ImageModal from "./Gallery/ImageModal.vue"
import Loader from "./Loader/Loader.vue"

export default {
  name: "Home",
  data() {
    return {
      show: 20,
      skip: 0,
      currentPage: 1,
      showModalImage: false,
      showIndex: false,
      showLoader: false
    }
  },

  computed: {
    ...mapGetters({
      images: "imagesOnPage",
      imagesTotal: "imagesTotal",
      imagesLimit: "imagesLimit"
    }),

    pagesTotal: function() {
      return Math.ceil(this.imagesTotal / this.imagesLimit)
    }
  },

  created() {
    this.getImages(this.show, this.skip)
  },

  mounted() {
    EventBus.$on("hideImage", () => {
      this.showModalImage = false
      document.body.style.overflowY = "auto"
    })
  },

  components: {
    imageModal: ImageModal,
    loader: Loader
  },

  methods: {
    getImages(show, skip) {
      this.showLoader = true
      this.$store.dispatch("getImages", { show, skip })
        .then(() => {
          this.showLoader = false
        })
    },

    showImage(index) {
      this.showIndex = index
      this.showModalImage = true
      document.body.style.overflowY = "hidden"
    },

    showQnty(limit) {
      this.show = limit
      this.skip = 0,
      this.currentPage = 1,
      this.getImages(this.show, this.skip)
    },

    goToPage(index, event) {
      console.log(event)
      if (typeof event === "undefined") {
        event = false
      }
      if (event && event.target.classList[1] == "active") {
        return false
      }
      this.currentPage = index
      this.skip = this.imagesLimit * (index - 1)
      this.getImages(this.show, this.skip)
    }
  }
}
</script>
