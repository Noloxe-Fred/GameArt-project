<template>
  <v-row v-if="screensListDatas.list.length">
    <v-col v-for="item in screensListDatas.list" :key="item.id" md="4">
      <screen-card-basic
        :screen-data="item"
        :can-edit="canEdit"
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
  props: {
    screensListDatas: Object,
    listName: String,
    listFilters: { type: Object, default: {} },
    canEdit: { type: Boolean, default: false },
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
    async loadMoreImages() {
      console.log(this.listFilters)
      const { list, total, _start, _limit, _sort } = this.screensListDatas

      if (list.length >= total) {
        return
      }
      const newScreens = await this.$strapi.find("screenshots", {
        ...this.listFilters,
        _start,
        _limit,
        _sort,
      })
      this.$store.dispatch("modules/mainGalleryLists/increaseList", {
        listName: this.listName,
        list: newScreens,
      })
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
      this.$emit("deleteScreen", { id })
    },
  },
})
</script>
