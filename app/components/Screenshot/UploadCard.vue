<template>
  <v-dialog v-model="isActive" @click:outside="toggleCard" width="600" >
    <v-card class="upload-screen-dialog" >
      <v-img
        :src="game.imageUrl"
        class="upload-screen-dialog__img"
      ></v-img>
      <v-form @submit.prevent="submitScreen">
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
        <v-file-input v-model="file" label="Votre Screen"></v-file-input>
        <v-btn type="submit">Envoyer</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "UploadCard",
  props: [
    'isActive',
    'game'
  ],
  data() {
    return this.initialState();
  },
  async fetch() {
    this.categories = await this.$strapi.find('categories');
  },
  methods: {
    initialState() {
      return {
        title: '',
        subtitle: '',
        categories: [],
        selectedCategories: [],
        file: null,
      }
    },
    reset() {
      Object.assign(this.$data, this.initialState());
    },
    toggleCard() {
      this.$emit('toggle');
    },
    async submitScreen() {
      const formData = new FormData();
      formData.append(`files`, this.file, `${this.file.name}.${Date.now()}.${this.$strapi.user.username}`);
      const [file] = await this.$http.$post(`${this.$strapi.options.url}/upload`, formData);
      const screenDatas = {
        title: this.title,
        subtitle: this.subtitle,
        user: this.$strapi.user.id,
        categories: this.categories.map((c) => c.id),
        game: this.game.id,
        picture: file.id,
      };
      const newScreen = await this.$strapi.create('screenshots', screenDatas);
      this.reset();
      this.$emit('refreshList', { newScreen });
      this.$emit('toggle');
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
