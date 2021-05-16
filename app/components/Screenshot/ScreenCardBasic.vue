<template>
  <v-hover v-slot="{ hover }">
    <nuxt-link :to="getScreenLink">
      <v-card class="screen-card" elevation="20">
        <v-img
          :aspect-ratio="16 / 9"
          :src="`${getStrapiUrl}${screenData.picture.url}`"
        >
          <v-expand-transition>
            <div v-if="hover" class="screen-card__information">
              <h2 class="stylised-letter">{{ screenData.game.name }}</h2>
              <v-container>
                <v-row class="screen-card__information__author-data">
                  <p class="screen-card__information__author-data__title">
                    {{ screenData.title }} | {{ screenData.user.username }}
                  </p>
                </v-row>
              </v-container>
            </div>
          </v-expand-transition>
        </v-img>
      </v-card>
    </nuxt-link>
  </v-hover>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  name: "ScreenCardUser",
  props: { screenData: Object },
  data() {
    return {}
  },
  computed: {
    getStrapiUrl() {
      return this.$strapi.options.url
    },
    getScreenLink() {
      return `/screen/${this.screenData.id}`
    }
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.screen-card {
  margin: 20px;
  transition: margin 0.2s;
  &:hover {
    margin: 16px;
  }
  &__information {
    padding: 5px;
    background-color: $secondAppColor;
    opacity: 0.8;
    height: 80px;
    &__author-data {
      align-items: center;
      &__title {
        margin-bottom: 0;
      }
    }
  }
}
</style>
