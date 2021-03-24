<template>
  <div>
    <v-dialog v-model="fullSize" @click:outside="toggleFullSize">
      <v-img contain max-height="90vh" :src="`http://localhost:1337${screenData.picture.url}`"></v-img>
    </v-dialog>
    <v-card class="screen-card" @click="toggleFullSize">
      <v-img :src="`http://localhost:1337${screenData.picture.url}`"></v-img>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "ScreenCard",
  props: ['screenData'],
  data() {
    return {
      fullSize: false,
    }
  },
  methods: {
    toggleFullSize() {
      this.fullSize = !this.fullSize;
    }
  }
})
</script>

<style lang="scss" scoped>
.screen-card {
  margin: 20px;
}
</style>
