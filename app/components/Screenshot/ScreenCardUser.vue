<template>
  <div>
    <v-dialog v-model="fullSize" @click:outside="toggleFullSize" :width="getDialogWidth">
      <v-img contain max-height="90vh" :src="`${getStrapiUrl}${screenData.picture.url}`"></v-img>
    </v-dialog>
    <v-card class="screen-card" @click="toggleFullSize" elevation="20">
      <v-img :src="`${getStrapiUrl}${screenData.picture.url}`"></v-img>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "ScreenCardUser",
  props: ['screenData'],
  data() {
    return {
      fullSize: false,
    }
  },
  computed: {

    getStrapiUrl() {
      return this.$strapi.options.url;
    },
    getDialogWidth() {
      const { width } = this.screenData.picture;
      const maxWidth = 1520;
      return width < maxWidth ? width : maxWidth;
    }
  },
  methods: {
    toggleFullSize() {
      this.fullSize = !this.fullSize;
    },
  }
})
</script>

<style lang="scss" scoped>
.screen-card {
  margin: 20px;
  transition: margin .2s;
  &:hover {
    margin: 8px;
  }
}
</style>
