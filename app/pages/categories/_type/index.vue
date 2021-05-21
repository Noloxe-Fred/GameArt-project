<template>
  <div>
    <v-row class="categories-menu" justify="space-around">
      <div v-for="category in categories" :key="category.id" elevation="2">
        <v-btn
          class="categories-menu__item stylised-letter"
          :outlined="category.id == selectedCategory"
          elevation="5"
          @click="changeCategory(category.id)"
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
    console.log(route)
    const categories = await $strapi.find("categories")
    console.log(categories)
    const initPageCategory = categories.find(
      (c) => c.type === route.params.type
    ).id
    if (
      !store.state.modules.mainGalleryLists.lists[
        CATEGORIES_LIST_NAME(initPageCategory)
      ]
    ) {
      const total = await $strapi.count("screenshots", {
        categories: initPageCategory,
      })
      const screensListFetched = await $strapi.find("screenshots", {
        categories: initPageCategory,
        ...MAIN_GALLERY_PAGINATION_BASE,
      })
      const screensListDatas = {
        listName: CATEGORIES_LIST_NAME(initPageCategory),
        total,
        list: screensListFetched,
      }
      store.dispatch("modules/mainGalleryLists/initList", screensListDatas)
    }

    return {
      categories,
      selectedCategory: initPageCategory,
      listName: CATEGORIES_LIST_NAME(initPageCategory),
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
  },
  methods: {
    setListName(listName) {
      this.listName = listName
    },
    async getScreensList(categoryId) {
      if (
        !this.$store.state.modules.mainGalleryLists.lists[
          CATEGORIES_LIST_NAME(categoryId)
        ]
      ) {
        const total = await this.$strapi.count("screenshots", {
          categories: categoryId,
        })
        const screensListFetched = await this.$strapi.find("screenshots", {
          categories: categoryId,
          ...MAIN_GALLERY_PAGINATION_BASE,
        })
        const screensListDatas = {
          listName: CATEGORIES_LIST_NAME(categoryId),
          total,
          list: screensListFetched,
        }
        this.$store.dispatch(
          "modules/mainGalleryLists/initList",
          screensListDatas
        )
        return screensListDatas
      } else {
        return this.$store.state.modules.mainGalleryLists.lists[
          CATEGORIES_LIST_NAME(categoryId)
        ]
      }
    },
    async changeCategory(id) {
      await this.getScreensList(id)
      this.setListName(CATEGORIES_LIST_NAME(id))
      this.selectedCategory = id
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
