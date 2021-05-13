<template>
  <div>
    <v-row class="categories-menu" justify="space-around">
      <div v-for="category in categories" :key="category.id" elevation="2">
        <v-btn class="categories-menu__item stylised-letter" :outlined="category.id == selectedCategory" elevation="5" @click="changeCategory(category.id)">{{category.type}}</v-btn>
      </div>
    </v-row>
    <MainGallery v-if="screenshotsCategory.length" :screensList="screenshotsCategory" :loadMore="loadMore" />
  </div>
</template>

<script>
import Vue from 'vue';
import MainGallery from "../../components/Screenshot/MainGallery";


export default Vue.extend({
  name: 'CategoriesPage',
  components: {
    MainGallery,
  },
  async asyncData(context) {
    const categories = await context.$strapi.find('categories');
    const initPageCategory = categories[0].id;
    const count = await context.$strapi.count('screenshots', { categories: initPageCategory });
    const initPageScreenshots = await context.$strapi.find('screenshots', { categories: initPageCategory, _sort: 'createdAt:desc', _start: 0, _limit: 10 });
    return {
      categories,
      selectedCategory: initPageCategory,
      screenshotsCategory: initPageScreenshots,
      count,
    }
  },
  data() {
    return {
      screenshotsCategory: [],
      count: null,
    }
  },
  methods: {
    async getScreensList(categoryId, start) {
      return this.$strapi.find('screenshots', { categories: categoryId, _start: start, _limit: 10, _sort: 'createdAt:desc' })
    },
    async changeCategory(id) {
      this.selectedCategory = id;
      this.screenshotsCategory = await this.getScreensList(id, 0);
    },
    async loadMore(start) {
      if (this.screenshotsCategory.length >= this.count) {
        return;
      }
      const newScreens = await this.getScreensList(this.selectedCategory, start);
      this.screenshotsCategory.push(...newScreens);
    }
  }
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