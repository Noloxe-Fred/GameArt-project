<template>
  <v-row class="fullscreen-img">
    <v-col sm="10" class="fixed">
      <v-img
        contain
        max-height="95vh"
        :src="`${getStrapiUrl}${screenData.picture.url}`"
      ></v-img>
    </v-col>
    <v-col sm="2">
      <div class="fullscreen-img__close-btn">
        <v-btn @click="routerBack">Retour</v-btn>
      </div>
      <v-card class="fullscreen-img__information">
        <v-card-title class="stylised-letter">{{
          screenData.game.name
        }}</v-card-title>
        <v-card-subtitle>{{ screenData.user.username }}</v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>{{ screenData.title }}</v-card-text>
        <v-divider v-if="canEdit" class="mx-4"></v-divider>
        <v-card-actions v-if="canEdit" class="fullscreen-img__manage-btn">
          <v-btn @click="toggleEditScreen">Editer</v-btn>
          <v-btn @click="toggleDeleteConfirmation">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
      <div v-if="canEdit">
        <UploadCard
          :is-active="editScreen"
          :game="screenData.game"
          :edit-datas="screenData"
          type="edit"
          @toggle="toggleEditScreen"
          @updateScreenData="updateScreenData"
          @deleteScreen="deleteScreen"
        />
        <v-overlay :value="deleteConfirmationOverlay">
          <v-card>
            <v-btn class="white--text" @click="toggleDeleteConfirmation">
              Annuler
            </v-btn>
            <v-btn class="white--text" @click="deleteScreen"> Confirmer </v-btn>
          </v-card>
        </v-overlay>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  name: "ScreenPage",
  transition: "fade",
  async asyncData(context) {
    const screenId = context.params.id
    const screenData = await context.$strapi.findOne("screenshots", screenId)
    return {
      screenData,
      screenId,
    }
  },
  data() {
    return {
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
    canEdit() {
      return (
        this.$strapi.user && this.$strapi.user.id === this.screenData.user.id
      )
    },
  },
  methods: {
    toggleEditScreen() {
      this.editScreen = !this.editScreen
    },
    toggleDeleteConfirmation() {
      this.deleteConfirmationOverlay = !this.deleteConfirmationOverlay
    },
    updateScreenData({ updatedScreen }) {
      this.screenData = updatedScreen
    },
    async deleteScreen() {
      try {
        await this.$strapi.delete("screenshots", this.screenData.id)
        this.toggleFullSize()
        this.toggleDeleteConfirmation()
        //this.$emit("deleteScreen", { id: this.screenData.id })
        alert("screen supprimé")
      } catch {
        alert("Erreur lors de la suppression")
      }
    },
    routerBack() {
      return this.$router.back()
    },
  },
})
</script>

<style lang="scss" scoped>
.fullscreen-img {
  background-color: $mainAppColor;
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
