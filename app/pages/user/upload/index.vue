<template>
  <UserLayout>
    <h1>Gestion de ma Screenthèque</h1>
    <div class="screen_management_page">
      <section class="screen_management_page__section screen_management_page__section__own">
        <h2>Mes jeux</h2>
        <div class="game-list">
          <p v-if="!userGamesList.length">Vous n'avez pas encore de screenshots. Commencez à en ajouter maintenant en cherchant un jeu >>></p>
          <v-card v-for="item in userGamesList" class="game-list__game-card" @click="goToUpload(item.rawgId)" :key="item.id">
            <v-img
              width="250"
              :src="item.imageUrl"
            />
            <v-card-title>{{ item.name }}</v-card-title>
          </v-card>
        </div>
      </section>
      <v-divider vertical></v-divider>
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
              :src="item.imageUrl"
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
    let userGamesList = context.$strapi.user.games;
    if (userGamesList.length) {
      if (typeof userGamesList[0] === 'string') {
        userGamesList = await Promise.all(userGamesList.map(async (gameId) => {
          return context.$strapi.findOne('games', gameId);
        }))
      }
    }
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
        imageUrl: background_image,
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
    padding: 20px;
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
