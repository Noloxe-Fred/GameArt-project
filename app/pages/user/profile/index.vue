<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <h1>Avatar</h1>
          <h2>WIP</h2>
        </v-col>
        <v-col>
          <h1>Mot de passe</h1>
          <v-form @submit.prevent="changePassword" v-model="passwordFormValid">
            <v-text-field
              v-model="actualPass"
              :rules="requiredRules"
              type="password"
              label="Mot de passe actuel"
              required
            />
            <v-text-field
              v-model="newPass"
              :rules="requiredRules"
              type="password"
              label="Nouveau mot de passe"
              required
            />
            <v-text-field
              v-model="confirmPass"
              :rules="requiredRules"
              type="password"
              label="Confirmation du mot de passe"
              required
            />
            <v-btn :disabled="!enableSubmitPassBtn" type="submit">Envoyer</v-btn>
          </v-form>
          <v-alert v-if="passAlert.display" :type="passAlert.type">{{  passAlert.message}}</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "index",
  data() {
    return {
      passAlert: {
        display: false,
        type: '',
        message: '',
      },
      passwordFormValid: false,
      requiredRules: [
        v => !!v || 'Champ requis'
      ],
      actualPass: '',
      newPass: '',
      confirmPass: '',
    }
  },
  computed: {
    enableSubmitPassBtn() {
      return this.actualPass.length && this.newPass.length && this.confirmPass.length;
    }
  },
  methods: {
    async changePassword() {
      if (this.newPass.length < 6) {
        return this.setPassAlert(true, 'error', 'Votre nouveau mot de passe est trop court');
      }
      if (this.newPass !== this.confirmPass) {
        return this.setPassAlert(true, 'error', 'Vos mots de passe ne correspondent pas');
      }

      try {
        await this.$strapi.login({ identifier: this.$strapi.user.username, password: this.actualPass });
      } catch {
        return this.setPassAlert(true, 'error', 'Merci de vérifier votre mot de passe actuel');

      }
      try {
        await this.$strapi.update('users', this.$strapi.user._id, { password: this.newPass });
        return this.setPassAlert(true, 'success', 'Mot de passe mis à jour')
      } catch {
        return this.setPassAlert(true, 'error', 'Erreur lors de la mise à jour du mot de passe. Merci de contacter un administrateur.')
      }
    },
    setPassAlert(display, type = '', message = '') {
      this.passAlert = {
        display,
        type,
        message,
      }
    }
  }
})

</script>

<style scoped>

</style>
