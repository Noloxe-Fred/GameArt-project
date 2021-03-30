<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <h1>Avatar</h1>
          <h2>WIP</h2>
        </v-col>
        <v-col>
          <h1>Changement de mot de passe</h1>
          <p>En cliquant sur "Envoyer", vous recevrez un e-mail vous permettant de changer votre mot de passe. Merci de suivre les instructions qu'il contiendra:</p>
          <v-btn @click="changePassRequest">Envoyer</v-btn>
          <v-alert v-if="askPassRequest" type="success">Demande envoyée</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "index",
  middleware: 'authenticated',
  data() {
    return {
      askPassRequest: false,
    }
  },
  methods: {
    async changePassRequest() {
      await this.$strapi.forgotPassword({ email: this.$strapi.user.email });
      this.setAskPassRequest(true);
    },
    setAskPassRequest(value) {
      this.askPassRequest = value;
    }
  }
})

</script>

<style scoped>

</style>
