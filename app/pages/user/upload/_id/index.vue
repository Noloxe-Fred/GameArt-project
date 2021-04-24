<template>
  <div>
    <h1>{{ gameData.name }}</h1>
    <v-btn @click="toggleUploadCard">Ajouter un screen</v-btn>
    <UploadCard :is-active="activeUploadCard" :game="gameData" @toggle="toggleUploadCard" @refreshList="refreshUserScreens" />
    <section>
      <h2>Mes screens</h2>
      <MainGallery :screensList="userScreens" :loadMore="loadMore" />
    </section>
  </div>
</template>

<script>
import Vue from 'vue';
import UploadCard from "../../../../components/Screenshot/UploadCard";
import ScreenCardUser from "../../../../components/Screenshot/ScreenCardUser";

export default Vue.extend({
  name: "GameUpload",
  middleware: 'authenticated',
  components: {
    UploadCard,
    ScreenCardUser,
  },
  async asyncData(context) {
    let gameData;
    const [data] = await context.$strapi.find('games', { rawgId: context.route.params.id});
    if (data) {
      gameData = data;
    } else {
      const result = await context.$axios.$get('https://api.rawg.io/api/games/' + context.route.params.id);
      const createData = { rawgId: result.id.toString(), name: result.name, imageUrl: result.background_image };
      gameData = await context.$strapi.create('games', createData)
    }
    const count = await context.$strapi.count('screenshots', {
      user: context.$strapi.user.id,
      game: gameData.id,
    })
    const userScreens = await context.$strapi.find('screenshots', {
      user: context.$strapi.user.id,
      game: gameData.id,
      _start: 0,
      _limit: 10,
      _sort: 'createdAt:desc'
    })
    return {
      gameData,
      userScreens,
      count
    }
  },
  data() {
    return {
      gameData: {},
      activeUploadCard: false,
      userScreens: [],
      count: null,
    }
  },
  methods: {
    toggleUploadCard() {
      this.activeUploadCard = !this.activeUploadCard;
    },
    async refreshUserScreens({ newScreen }) {
      this.userScreens.unshift(newScreen);
    },
    async loadMore(start) {
      if (this.userScreens.length >= this.count) {
        return;
      }
      const newScreens = await this.$strapi.find('screenshots', {
        user: this.$strapi.user.id,
        game: this.gameData.id,
        _start: start,
        _limit: 10,
      });
      this.userScreens.push(...newScreens);
    }
  }
})
</script>

<style scoped>

</style>
