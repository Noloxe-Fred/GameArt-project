<template>
  <div>
    <v-dialog v-model="fullSize" fullscreen @click:outside="toggleFullSize">
      <v-row class="fullscreen-img">
        <v-col sm="10" class="fixed">
          <v-img
            contain
            :src="`${getStrapiUrl}${screenData.picture.url}`"
          ></v-img>
        </v-col>
        <v-col sm="2">
          <v-btn text @click="toggleFullSize">Fermer</v-btn>
          <div class="fullscreen-img__information">
            <h2 class="stylised-letter">{{ screenData.game.name }}</h2>
            <p>{{ screenData.title }}</p>
            <p>{{ screenData.user.username }}</p>
          </div>
          <div v-if="isAuthor">
            <UploadCard
              :is-active="editScreen"
              :game="screenData.game"
              :edit-datas="screenData"
              type="edit"
              @toggle="toggleEditScreen"
              @updateScreenData="updateScreenData"
              @deleteScreen="deleteScreen"
            />
              <v-overlay
                :z-index="zIndex"
                :value="deleteConfirmationOverlay"
              >
              <v-card>
                <v-btn
                  class="white--text"
                  color="teal"
                  @click="toggleDeleteConfirmation"
                >
                  Annuler
                </v-btn>
                <v-btn
                  class="white--text"
                  color="teal"
                  @click="deleteScreen"
                >
                  Confirmer
                </v-btn>
              </v-card>
              </v-overlay>
            <v-btn @click="toggleEditScreen">Editer</v-btn>
            <v-btn @click="toggleDeleteConfirmation">Supprimer</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-dialog>
    <v-hover v-slot="{ hover }">
      <v-card class="screen-card" elevation="20" @click="toggleFullSize">
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
    </v-hover>
  </div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  name: "ScreenCardUser",
  props: ["screenData"],
  data() {
    return {
      fullSize: false,
      editScreen: false,
      deleteConfirmationOverlay: false,
    }
  },
  computed: {
    getStrapiUrl() {
      return this.$strapi.options.url
    },
    getDialogWidth() {
      const { width } = this.screenData.picture
      const maxWidth = "80vw"
      return width < maxWidth ? width : maxWidth
    },
  },
  methods: {
    toggleFullSize() {
      this.fullSize = !this.fullSize
    },
    isAuthor(screenId) {
      return this.$strapi.user && screenId === this.$strapi.user.id
    },
    toggleEditScreen() {
      this.editScreen = !this.editScreen
    },
    toggleDeleteConfirmation() {
      this.deleteConfirmationOverlay = !this.deleteConfirmationOverlay;
    },
    updateScreenData({ updatedScreen }) {
      this.$emit("updateScreenData", { updatedScreen })
    },
    async deleteScreen() {
      try {
        await this.$strapi.delete("screenshots", this.screenData.id);
        this.toggleFullSize();
        this.toggleDeleteConfirmation();
        this.$emit('deleteScreen', { id: this.screenData.id })
      }
      catch {
        alert('Erreur lors de la suppression')
      }
    }
  },
})
</script>

<style lang="scss" scoped>
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

.fullscreen-img {
  background-color: $mainAppColor;
  height: 100%;
  width: 100%;
  &__information {
    padding: 5px;
  }
}
</style>
