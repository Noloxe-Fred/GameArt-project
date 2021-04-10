<template>
<div>
  <v-row class="categories-menu" justify="space-around">
    <div v-for="category in categories" :key="category.id" elevation="2">
      <v-btn class="categories-menu__item stylised-letter" :outlined="category.id == selectedCategory" elevation="5" @click="changeCategory(category.id)">{{category.type}}</v-btn>
    </div>
  </v-row>
    <v-row>
    <v-col md="4" v-for="screen in screenshotsCategory" :key="screen.id">
      <screen-card-public :screenData="screen" />
    </v-col>
  </v-row>
</div>
</template>

<script>
import Vue from 'vue';
import ScreenCardPublic from "../../components/Screenshot/ScreenCardPublic";


export default Vue.extend({
  name: 'CategoriesPage',
  components: {
    ScreenCardPublic,
  },
  async asyncData(context) {
    const categories = await context.$strapi.find('categories');
    const initPageCategory = categories[0].id;
    const initPageScreenshots = await context.$strapi.find('screenshots', { categories: initPageCategory, _sort: 'createdAt:desc' });
   
    return {
      categories,
      selectedCategory: initPageCategory,
      screenshotsCategory: initPageScreenshots,
    }
  },
  data() {
    return {
      screenshotsCategory: [],
    }
  },
  methods: {
    async changeCategory(id) {
      this.selectedCategory = id;
      this.screenshotsCategory = await this.$strapi.find('screenshots', { categories: id, _sort: 'createdAt:desc' });
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