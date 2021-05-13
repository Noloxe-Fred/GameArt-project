<template>
  <v-row v-if="screensList.length">
    <v-col v-for="item in screensList" :key="item.id" md="4">
      <screen-card-basic
        :screen-data="item"
        @updateScreenData="updateScreenData"
        @deleteScreen="deleteScreen"
      />
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue"
import ScreenCardBasic from "./ScreenCardBasic"

export default Vue.extend({
  name: "MainGallery",
  components: {
    ScreenCardBasic,
  },
  props: ["screensList", "loadMore"],
  data() {
    return {
      start: 10,
    }
  },
  mounted() {
    this.scroll()
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.loadMoreImages()
        }
      }
    },
    increaseStart() {
      this.start = this.start + 10
    },
    async loadMoreImages() {
      if (this.screensList.length >= this.count) {
        return
      }
      this.loadMore(this.start)
      this.increaseStart
    },
    updateScreenData({ updatedScreen }) {
      this.screensList = this.screensList.map((screen) => {
        if (screen.id === updatedScreen.id) {
          return updatedScreen
        }
        return screen
      })
    },
    deleteScreen({ id }) {
      this.screensList = this.screensList.filter((screen) => screen.id !== id);
    }
  },
})
</script>
