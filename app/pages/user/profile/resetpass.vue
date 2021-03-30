<template>
  <v-main class="reset-pass-form">
    <h1>Réinitialisation de mot de passe:</h1>
    <v-form v-model="valid" @submit.prevent="sendResetPass">
      <v-text-field
        v-model="newPass"
        :rules="newPassRules"
        label="Nouveau mot de passe"
        type="password"
        required
      />
      <v-text-field
        v-model="confirmPass"
        :rules="confirmPassRules"
        label="Confirmation mot de passe"
        type="password"
        required
      />
      <v-btn type="submit">Envoyer</v-btn>
    </v-form>
  </v-main>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "ResetPass",
  middleware({ from, redirect }) {
    if (!from.query.code) {
      return redirect('/')
    }
  },
  data() {
    return {
      valid: false,
      newPass: '',
      newPassRules: [
        v => v.length > 6 || 'Mot de passe trop court'
      ],
      confirmPass: '',
      confirmPassRules: [
        v => v === this.newPass || 'Vos mots de passe ne correspondent pas'
      ]
    }
  },
  methods: {
    async sendResetPass() {
      await this.$strapi.resetPassword({ code: this.$route.query.code, password: this.newPass, passwordConfirmation: this.confirmPass })
    }
  }
})
</script>

<style lang="scss" scoped>
.reset-pass-form {
  width: 500px;
  margin: auto;
}
</style>
