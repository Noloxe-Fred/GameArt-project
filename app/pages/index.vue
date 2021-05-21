<template>
  <MainGallery
    v-if="getScreensListDatas.list.length > 0"
    :screens-list-datas="getScreensListDatas"
    :list-name="getListName"
  />
</template>

<script>
import Vue from "vue"
import { mapGetters } from "vuex"
import MainGallery from "../components/Screenshot/MainGallery"
import { MAIN_GALLERY_PAGINATION_BASE } from "../store/modules/mainGalleryLists"

const HOME_LIST_NAME = "HOME_LIST"

export default Vue.extend({
  name: "Home",
  components: {
    MainGallery,
  },
  async asyncData({ store, $strapi }) {
    if (!store.state.modules.mainGalleryLists.lists[HOME_LIST_NAME]) {
      const total = await $strapi.count("screenshots")
      const screensListFetched = await $strapi.find(
        "screenshots",
        MAIN_GALLERY_PAGINATION_BASE
      )
      const screensListDatas = {
        listName: HOME_LIST_NAME,
        total,
        list: screensListFetched,
      }
      store.dispatch("modules/mainGalleryLists/initList", screensListDatas)
    }
  },
  computed: {
    ...mapGetters({
      screensListDatas: "modules/mainGalleryLists/getListDatasByName",
    }),
    getScreensListDatas() {
      return this.screensListDatas(HOME_LIST_NAME)
    },
    getListName() {
      return HOME_LIST_NAME
    },
  },
})
</script>
