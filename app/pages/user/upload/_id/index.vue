<template>
  <div>
    <h1>{{ gameData.name }}</h1>
    <v-btn @click="toggleUploadCard">Ajouter un screen</v-btn>
    <UploadCard :is-active="activeUploadCard" :game="gameData" @toggle="toggleUploadCard" @refetchScreens="refetchUserScreens" />
    <section>
      <h2>Mes screens</h2>
      <v-row>
        <v-col md="4" v-for="item in userScreens">
          <screen-card-user :screenData="item" />
        </v-col>
      </v-row>
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
      console.log(result)
      const createData = { rawgId: result.id.toString(), name: result.name, imageUrl: result.background_image };
      gameData = await context.$strapi.create('games', createData)
    }
    const userScreens = await context.$strapi.find('screenshots', {
      user: context.$strapi.user.id,
      game: gameData.id
    })
    return {
      gameData,
      userScreens,
    }
  },
  data() {
    return {
      gameData: {},
      activeUploadCard: false,
      userScreens: [],
    }
  },
  methods: {
    toggleUploadCard() {
      this.activeUploadCard = !this.activeUploadCard;
    },
    async refetchUserScreens() {
      this.userScreens = await this.$strapi.find('screenshots', {
        user: this.$strapi.user.id,
        game: this.gameData.id
      });
    },
  }
})
</script>

<style scoped>

</style>
