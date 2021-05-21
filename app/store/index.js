import Vue from "vue"
import Vuex from "vuex"
import mainGalleryLists from "./modules/mainGalleryLists"

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    mainGalleryLists,
  },
})
