<template>
  <v-row>
    <v-col md="4" v-for="item in screensList">
      <screen-card-public :screenData="item" />
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import ScreenCardPublic from "../components/Screenshot/ScreenCardPublic";

export default Vue.extend({
  components: {
    ScreenCardPublic
  },
  async asyncData(context) {
    const count = await context.$strapi.count('screenshots');
    const screensList = await context.$strapi.find('screenshots', { _start: 0, _limit: 10 });
    return {
      screensList,
      count
    }
  },
  data() {
    return {
      screensList: [],
      start: 11,
      count: null,
    }
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        console.log('listen')
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) {
         this.loadMoreImages();
        }
      }
    },
    increaseStart() {
      this.start = start + 10;
    },
    async loadMoreImages() {
      console.log('infinite Scroll', this.screensList.length, this.count)
      if (this.screensList.length >= this.count) {
        return;
      }
      const newScreens = await this.$strapi.find('screenshots', { _start: this.start, _limit: 10 });
      this.screensList.push(...newScreens);
      this.increaseStart;
    }
  },
  mounted() {
    this.scroll();
  }
})
</script>
