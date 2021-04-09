<template>
  <div>
    <v-dialog v-model="fullSize" @click:outside="toggleFullSize" :width="getDialogWidth">
      <v-img contain max-height="90vh" :src="`${getStrapiUrl}${screenData.picture.url}`"></v-img>
    </v-dialog>
    <v-hover v-slot="{ hover }">
      <v-card class="screen-card" @click="toggleFullSize" elevation="20">
        <v-img :src="`${getStrapiUrl}${screenData.picture.url}`">
          <v-expand-transition>
            <h2
              v-if="hover"
            >
              {{ screenData.game.name }}
            </h2>
          </v-expand-transition>
        </v-img>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "ScreenCardPublic",
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
  transition: margin .3s;
  &:hover {
    margin: 6px;
  }
}
</style>
