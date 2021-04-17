<template>
  <MainGallery :screensList="this.screensList" :loadMore="this.loadMore" />
</template>

<script>
import Vue from 'vue';
import MainGallery from "../components/Screenshot/MainGallery";

export default Vue.extend({
  components: {
    MainGallery
  },
  async asyncData(context) {
    const count = await context.$strapi.count('screenshots');
    const screensList = await context.$strapi.find('screenshots', { _start: 0, _limit: 10,  _sort: 'createdAt:desc', });
    return {
      screensList,
      count
    }
  },
  data() {
    return {
      screensList: [],
      count: null,
    }
  },
  methods: {
    async loadMore(start) {
      if (this.screensList.length >= this.count) {
        return;
      }
      const newScreens = await this.$strapi.find('screenshots', { _start: start, _limit: 10, _sort: 'createdAt:desc', });
      this.screensList.push(...newScreens);
    }
  }
})
</script>
