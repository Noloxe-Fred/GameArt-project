<template>
  <div>
    <h1>{{ gameData.name }}</h1>
    <v-btn @click="toggleUploadCard">Ajouter un screen</v-btn>
    <UploadCard :is-active="activeUploadCard" :game="gameData" @toggle="toggleUploadCard"/>
    <section>
      <h2>Mes screens</h2>
    </section>
  </div>
</template>

<script>
import Vue from 'vue';
import UploadCard from "../../../../components/Screenshot/UploadCard";

export default Vue.extend({
  name: "GameUpload",
  components: {
    UploadCard,
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
      gameData = context.$strapi.create('games', createData)
    }
    return {
      gameData,
    }
  },
  data() {
    return {
      gameData: {},
      activeUploadCard: false,
    }
  },
  methods: {
    toggleUploadCard() {
      this.activeUploadCard = !this.activeUploadCard;
    }
  }
})
</script>

<style scoped>

</style>
