<template>
  <v-row>
    <v-col md="4" v-for="item in screensList" :key="item.id">
      <screen-card-user v-if="isAuthor(item.user.id)" :screenData="item" />
      <screen-card-public v-else :screenData="item" />
    </v-col>
    <v-col md="4" v-for="item in screensList" :key="item.id">
      <screen-card-user v-if="isAuthor(item.user.id)" :screenData="item" />
      <screen-card-public v-else :screenData="item" />
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import ScreenCardPublic from "./ScreenCardPublic";
import ScreenCardUser from './ScreenCardUser';

export default Vue.extend({
  name: 'MainGallery',
  props: ['screensList', 'loadMore'],
  components: {
    ScreenCardPublic,
    ScreenCardUser
  },
  data() {
    return {
      start: 11,
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
      this.start = start + 10;
    },
    async loadMoreImages() {
      if (this.screensList.length >= this.count) {
        return;
      }
      this.loadMore(this.start);
      this.increaseStart;
    },
    isAuthor(id) {
      return this.$strapi.user && id === this.$strapi.user.id
    }
  },
  mounted() {
    this.scroll();
  }
})
</script>
