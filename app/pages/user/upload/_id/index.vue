<template>
  <div>Upload de fichier. Déjà en base: {{ gameData.name }}</div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "GameUpload",
  async asyncData(context) {
    let gameData;
    const [data] = await context.$strapi.find('games', { rawgId: context.route.params.id});
    if (data) {
      gameData = data;
    } else {
      const result = await context.$axios.$get('https://api.rawg.io/api/games/' + context.route.params.id);
      const createData = { rawgId: result.id.toString(), name: result.name, cover_url: result.backgound_image };
      const createdGame = context.$strapi.create('games', createData)
      gameData = createdGame;
    }
    return {
      gameData,
    }
  }
})
</script>

<style scoped>

</style>
