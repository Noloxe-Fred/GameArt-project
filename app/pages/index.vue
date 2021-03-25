<template>
  <v-row>
    <v-col md="4" v-for="item in screensList">
      <screen-card-public :screenData="item" />
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import ScreenCardPublic from "../components/Screenshot/ScreenCardPublic";

export default Vue.extend({
  components: {
    ScreenCardPublic
  },
  async asyncData(context) {
    const screensList = await context.$strapi.find('screenshots');
    return {
      screensList,
    }
  },
  data() {
    return {
      screensList: [],
    }
  }
})
</script>
