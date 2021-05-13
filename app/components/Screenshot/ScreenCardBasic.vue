<template>
  <div>
    <v-dialog v-model="fullSize" fullscreen content-class="fullscreen-dialog"  @click:outside="toggleFullSize">
      <v-card class="fullscreen-img">
        <v-row>
          <v-col sm="10" class="fixed">
            <v-img
              contain
              max-height="95vh"
              :src="`${getStrapiUrl}${screenData.picture.url}`"
            ></v-img>
          </v-col>
          <v-col sm="2">
            <div class="fullscreen-img__close-btn">
              <v-icon large @click="toggleFullSize">mdi-close</v-icon>
            </div>
            <v-card class="fullscreen-img__information">
              <v-card-title class="stylised-letter">{{ screenData.game.name }}</v-card-title>
              <v-card-subtitle>{{ screenData.user.username }}</v-card-subtitle>
              <v-divider class="mx-4"></v-divider>
              <v-card-text>{{ screenData.title }}</v-card-text>
              <v-divider v-if="isAuthor" class="mx-4"></v-divider>
              <v-card-actions v-if="isAuthor" class="fullscreen-img__manage-btn">
                <v-btn @click="toggleEditScreen">Editer</v-btn>
                <v-btn @click="toggleDeleteConfirmation">Supprimer</v-btn>
              </v-card-actions>
            </v-card>
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
                :value="deleteConfirmationOverlay"
              >
                <v-card>
                  <v-btn
                    class="white--text"
                    @click="toggleDeleteConfirmation"
                  >
                    Annuler
                  </v-btn>
                  <v-btn
                    class="white--text"
                    @click="deleteScreen"
                  >
                    Confirmer
                  </v-btn>
                </v-card>
              </v-overlay>
            </div>
          </v-col>
        </v-row>
      </v-card>
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
    isAuthor() {
      return this.$strapi.user && this.$strapi.user.id === this.screenData.user.id
    },
  },
  methods: {
    toggleFullSize() {
      this.fullSize = !this.fullSize
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

.fullscreen-dialog {
    padding: 15px !important;
}

.fullscreen-img {
  background-color: $mainAppColor;
  height: 100vh;
  width: 100%;
  padding: 15px !important;
  &__close-btn {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-bottom: 10px;
  }
  &__information {
    padding: 5px;
  }
  &__manage-btn {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
