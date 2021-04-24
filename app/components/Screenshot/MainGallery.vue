<template>
  <v-row>
    <v-col md="4" v-for="item in screensList" :key="item.id">
      <screen-card-basic :screenData="item" />
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import ScreenCardBasic from "./ScreenCardBasic";

export default Vue.extend({
  name: 'MainGallery',
  props: ['screensList', 'loadMore'],
  components: {
    ScreenCardBasic,
  },
  data() {
    return {
      start: 10,
    }
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
         this.loadMoreImages();
        }
      }
    },
    increaseStart() {
      this.start = this.start + 10;
    },
    async loadMoreImages() {
      if (this.screensList.length >= this.count) {
        return;
      }
      this.loadMore(this.start);
      this.increaseStart;
    },
  },
  mounted() {
    this.scroll();
  }
})
</script>
