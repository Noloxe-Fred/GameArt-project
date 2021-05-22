<template>
  <div>
    <v-row class="categories-menu" justify="space-around">
      <div v-for="category in getCategories" :key="category.id" elevation="2">
        <v-btn
          class="categories-menu__item stylised-letter"
          :outlined="category.id == selectedCategory"
          elevation="5"
          :to="getLink(category.type)"
          >{{ category.type }}</v-btn
        >
      </div>
    </v-row>
    <MainGallery
      v-if="getScreensListDatas.list.length > 0"
      :screens-list-datas="getScreensListDatas"
      :list-name="getListName"
      :list-filters="getListFilters"
    />
  </div>
</template>

<script>
import Vue from "vue"
import { mapGetters } from "vuex"
import MainGallery from "../../../components/Screenshot/MainGallery"
import { MAIN_GALLERY_PAGINATION_BASE } from "../../../store/modules/mainGalleryLists"

const CATEGORIES_LIST_NAME = (id) => `CATEGORIES_LIST_${id}`

export default Vue.extend({
  name: "CategoriesPage",
  components: {
    MainGallery,
  },
  async asyncData({ store, $strapi, route }) {
    let categories = []
    if (!store.state.modules.categories.list.length) {
      categories = await $strapi.find("categories")
      store.dispatch("modules/categories/initCategories", categories)
    } else {
      categories = store.state.modules.categories.list
    }
    const pageCategory = categories.find((c) => c.type === route.params.type).id
    if (
      !store.state.modules.mainGalleryLists.lists[
        CATEGORIES_LIST_NAME(pageCategory)
      ]
    ) {
      const total = await $strapi.count("screenshots", {
        categories: pageCategory,
      })
      const screensListFetched = await $strapi.find("screenshots", {
        categories: pageCategory,
        ...MAIN_GALLERY_PAGINATION_BASE,
      })
      const screensListDatas = {
        listName: CATEGORIES_LIST_NAME(pageCategory),
        total,
        list: screensListFetched,
      }
      store.dispatch("modules/mainGalleryLists/initList", screensListDatas)
    }

    return {
      selectedCategory: pageCategory,
      listName: CATEGORIES_LIST_NAME(pageCategory),
    }
  },
  computed: {
    ...mapGetters({
      screensListDatas: "modules/mainGalleryLists/getListDatasByName",
    }),
    getScreensListDatas() {
      return this.screensListDatas(CATEGORIES_LIST_NAME(this.selectedCategory))
    },
    getListName() {
      return CATEGORIES_LIST_NAME(this.selectedCategory)
    },
    getListFilters() {
      return { categories: this.selectedCategory }
    },
    getCategories() {
      return this.$store.state.modules.categories.list
    },
  },
  methods: {
    getLink(type) {
      return `/categories/${type}`
    },
  },
})
</script>

<style lang="scss" scoped>
.categories-menu {
  padding-top: 10px;
  width: 100%;
  &__item {
    width: 230px;
  }
}
</style>
