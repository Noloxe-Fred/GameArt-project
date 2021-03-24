<template>
  <div>
    <v-dialog v-model="fullSize" @click:outside="toggleFullSize">
      <v-img contain max-height="90vh" :src="`${getStrapiUrl()}${screenData.picture.url}`"></v-img>
    </v-dialog>
    <v-card class="screen-card" @click="toggleFullSize">
      <v-img :src="`${getStrapiUrl()}${screenData.picture.url}`"></v-img>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "ScreenCard",
  props: ['screenData'],
  data() {
    return {
      fullSize: false,
    }
  },
  methods: {
    toggleFullSize() {
      this.fullSize = !this.fullSize;
    },
    getStrapiUrl() {
      return this.$strapi.options.url;
    }
  }
})
</script>

<style lang="scss" scoped>
.screen-card {
  margin: 20px;
}
</style>
