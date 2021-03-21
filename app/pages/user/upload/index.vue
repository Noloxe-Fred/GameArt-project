<template>
  <UserLayout>
    <h1>Gestion de ma Screenthèque</h1>
    <div class="screen_management_page">
      <section class="screen_management_page__section screen_management_page__section__own">
        <h2>Mes jeux</h2>
        <div class="game-list">
          <p v-if="!userGamesList.length">Vous n'avez pas encore de screenshots. Commencez à en ajouter maintenant en cherchant un jeu >>></p>
          <v-card v-for="item in userGamesList" class="game-list__game-card" @click="goToUpload(item.id)" :key="item.id">
            <v-img
              width="250"
              :src="item.image_url"
            />
            <v-card-title>{{ item.name }}</v-card-title>
          </v-card>
        </div>
      </section>
      <section class="screen_management_page__section screen_management_page__section__search">
        <h2>Chercher un autre jeu</h2>
        <v-form @submit.prevent="searchGame">
          <v-text-field
            v-model="searchValue"
            label="Nom"
          />
        </v-form>
        <div class="game-list" v-if="searchedGamesList">
          <v-card v-for="item in searchedGamesList" class="game-list__game-card" @click="goToUpload(item.id)" :key="item.id">
            <v-img
              width="250"
              :src="item.image_url"
            />
            <v-card-title>{{ item.name }}</v-card-title>
          </v-card>
        </div>
      </section>
    </div>
  </UserLayout>
</template>

<script>
import Vue from "vue";
import UserLayout from "../../../layouts/UserLayout"

export default Vue.extend({
name: "Upload",
  components: {
    UserLayout,
  },
  async asyncData(context) {
    const userGamesList = context.$strapi.user.games;
    return {
      userGamesList,
    }
  },
  data() {
    return {
      searchValue: '',
      searchedGamesList: null,
      userGamesList: [],
    }
  },
  methods: {
    setSearchedGamesList(value) {
      this.searchedGamesList = value;
    },
    async searchGame() {
      const { results } = await this.$axios.$get('https://api.rawg.io/api/games?search=' + this.searchValue);
      const games = results.map(({ id, name, background_image }) => ({
        id,
        name,
        image_url: background_image,
      }));
      this.setSearchedGamesList(games);
    },
    async goToUpload(id) {
      this.$router.push({ path: `/user/upload/${id}` })
    }
  },
})
</script>

<style lang="scss" scoped>
.screen_management_page {
  display: flex;
  &__section {
    width: 45%;
  }
}
.game-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &__game-card {
    margin: 20px;
    width: 200px;
    &:hover {
      opacity: .6;
      transition: .5s;
    }
  }
}
</style>
