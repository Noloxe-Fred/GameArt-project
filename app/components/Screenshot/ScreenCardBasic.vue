<template>
  <div>
    <v-dialog v-model="fullSize" @click:outside="toggleFullSize" :width="getDialogWidth">
      <v-img contain max-height="100vh" :src="`${getStrapiUrl}${screenData.picture.url}`"></v-img>
    </v-dialog>
    <v-hover v-slot="{ hover }">
      <v-card class="screen-card" @click="toggleFullSize" elevation="20">
        <v-img :aspect-ratio="16/9" :src="`${getStrapiUrl}${screenData.picture.url}`">
          <v-expand-transition>
            <div
              v-if="hover"
              class="screen-card__information"
            >
              <h2 class="stylised-letter">{{ screenData.game.name }}</h2>
              <p>{{screenData.title}} | {{ screenData.user.username }}</p>
            </div>
          </v-expand-transition>
        </v-img>
      </v-card>
    </v-hover>
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
    margin: 16px;
  }
  &__information {
    padding: 5px;
    background-color: $secondAppColor;
    opacity: .8;
    height: 80px;
  }
}
</style>
