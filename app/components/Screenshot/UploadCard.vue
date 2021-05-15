<template>
  <v-dialog v-model="isActive" width="600" @click:outside="toggleCard">
    <v-card class="upload-screen-dialog">
      <v-img :src="game.imageUrl" class="upload-screen-dialog__img"></v-img>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="title" label="Titre"></v-text-field>
        <v-text-field v-model="subtitle" label="Légende"></v-text-field>
        <v-container>
          <h3>Catégories:</h3>
          <v-row no-gutters justify="center">
            <v-col v-for="item in categories" :key="item.id" sm="2">
              <v-checkbox v-model="selectedCategories" :label="item.type" :value="item.id" />
            </v-col>
          </v-row>
        </v-container>
        <v-file-input
          v-if="type === 'create'"
          v-model="file"
          label="Votre Screen"
        ></v-file-input>
        <v-container>
          <v-row justify="space-between">
            <v-btn :disabled="disabledSubmit" :loading="loadingUpload" type="submit">{{
              type === "create" ? "Envoyer" : "Modifier"
            }}</v-btn>
            <v-alert
              v-if="uploadDone"
              dense
              text
              :type="uploadSuccess ? 'success' : 'error'"
            />
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  name: "UploadCard",
  props: ["isActive", "game", "type", "editDatas"],
  data() {
    return {
      ...this.initialState(),
      loadingUpload: false,
      uploadDone: false,
      uploadSuccess: null,
      }
  },
  async fetch() {
    this.categories = await this.$strapi.find("categories")
  },
  methods: {
    initialState() {
      if (this.type === "edit") {
        return {
          ...this.editDatas,
          selectedCategories: this.editDatas.categories.map((c) => c.id),
        }
      }
      return {
        title: null,
        subtitle: null,
        selectedCategories: [],
        file: null,
      }
    },
    setLoadingUpload(value) {
      this.loadingUpload = value;
    },
    setUploadDone(value) {
      this.uploadDone = value;
    },
    setUploadSuccess(value) {
      this.uploadSuccess = value;
    },
    reset() {
      Object.assign(this.$data, this.initialState())
    },
    toggleCard() {
      this.setUploadDone(false)
      this.$emit("toggle")
    },
    async submitScreen() {
      const formData = new FormData()
      formData.append(
        `files`,
        this.file,
        `${this.file.name}.${Date.now()}.${this.$strapi.user.username}`
      )
      const [file] = await this.$http.$post(
        `${this.$strapi.options.url}/upload`,
        formData
      )
      const screenDatas = {
        title: this.title,
        subtitle: this.subtitle,
        user: this.$strapi.user.id,
        categories: this.selectedCategories,
        game: this.game.id,
        picture: file.id,
      }
      const newScreen = await this.$strapi.create("screenshots", screenDatas)
      this.reset()
      this.$emit("refreshList", { newScreen })
      this.setLoadingUpload(false)
      this.setUploadDone(true)
      if (newScreen.id) {
        this.setUploadSuccess(true);
      } else {
        this.setUploadSuccess(false);
      }
    },
    async editScreen() {
      const screenDatas = {
        title: this.title,
        subtitle: this.subtitle,
        categories: this.selectedCategories,
      }
      const updatedScreen = await this.$strapi.update(
        "screenshots",
        this.editDatas.id,
        screenDatas
      )
      this.reset();
      this.$emit("updateScreenData", { updatedScreen });
      this.$emit("toggle");
      this.setLoadingUpload(false);
    },
    submitForm() {
      this.setUploadDone(false);
      this.setLoadingUpload(true);
      if (this.type === "create") {
        return this.submitScreen()
      }
      return this.editScreen()
    },
  },
  computed: {
    disabledSubmit() {
      return !this.title || !this.selectedCategories.length || ( this.type === 'create' && !this.file );
    }
  }
})
</script>

<style lang="scss" scoped>
.upload-screen-dialog {
  padding: 10px;
  &__img {
    max-height: 200px;
  }
}
</style>
