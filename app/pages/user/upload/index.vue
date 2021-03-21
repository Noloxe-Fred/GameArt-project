<template>
  <UserLayout>
    <h2>User Upload</h2>
    <v-form @submit.prevent="searchGame">
      <v-text-field
        v-model="searchValue"
        label="Chercher un jeu"
        placeholder="Nom..."
      />
    </v-form>
    <div class="game-list" v-if="gamesList">
        <v-card v-for="item in gamesList" class="game-list__game-card" @click="goToUpload(item.id)" :key="item.id">
          <v-img
            width="250"
            :src="item.image_url"
          />
          <v-card-title>{{ item.name }}</v-card-title>
        </v-card>
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
  data() {
    return {
      searchValue: '',
      gamesList: null,
    }
  },
  methods: {
    setGamesList(value) {
      this.gamesList = value;
    },
    async searchGame() {
      const { results } = await this.$axios.$get('https://api.rawg.io/api/games?search=' + this.searchValue);
      const games = results.map(({ id, name, background_image }) => ({
        id,
        name,
        image_url: background_image,
      }));
      this.setGamesList(games);
    },
    async goToUpload(id) {
      this.$router.push({ path: `/user/upload/${id}` })
    }
  },
})
</script>

<style lang="scss" scoped>
.game-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &__game-card {
    margin: 20px;
    width: 200px;
    &:hover {
      width: 250px;
      transition: .5s;
    }
  }
}
</style>
