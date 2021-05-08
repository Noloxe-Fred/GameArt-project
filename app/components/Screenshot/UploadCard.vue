<template>
  <v-dialog v-model="isActive" width="600" @click:outside="toggleCard">
    <v-card class="upload-screen-dialog">
      <v-img :src="game.imageUrl" class="upload-screen-dialog__img"></v-img>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="title" required label="Titre"></v-text-field>
        <v-text-field v-model="subtitle" label="Légende"></v-text-field>
        <v-select
          v-model="selectedCategories"
          :items="categories"
          item-text="type"
          item-value="id"
          label="Catégories"
          multiple
        />
        <v-file-input
          v-if="type === 'create'"
          v-model="file"
          label="Votre Screen"
        ></v-file-input>
        <v-btn type="submit">{{
          type === "create" ? "Envoyer" : "Modifier"
        }}</v-btn>
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
    return this.initialState()
  },
  async fetch() {
    this.categories = await this.$strapi.find("categories")
  },
  methods: {
    initialState() {
      if (this.type === "edit") {
        return {
          ...this.editDatas,
          selectedCategories: this.editDatas.categories,
        }
      }
      return {
        title: "",
        subtitle: "",
        categories: [],
        selectedCategories: [],
        file: null,
      }
    },
    reset() {
      Object.assign(this.$data, this.initialState())
    },
    toggleCard() {
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
      this.$emit("toggle")
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
      this.reset()
      this.$emit("updateScreenData", { updatedScreen })
      this.$emit("toggle")
    },
    submitForm() {
      if (this.type === "create") {
        return this.submitScreen()
      }
      return this.editScreen()
    },
  },
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
