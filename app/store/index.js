import Vue from "vue"
import Vuex from "vuex"
import mainGalleryLists from "./modules/mainGalleryLists"
import categories from "./modules/categories"

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    mainGalleryLists,
    categories
  },
})
