<template>
  <div class="login-menu">
    <v-form v-if="loginForm" @submit.prevent="submitLogin">
      <v-container flex>
        <div>
          <v-text-field
            v-model="usernameLog"
            label="Pseudo"
            required
          ></v-text-field>

          <v-text-field
            v-model="passwordLog"
            label="Mot de passe"
            type="password"
            required
          ></v-text-field>
        </div>
        <v-btn type="submit" class="stylised-letter main-btn" small block text>Connexion</v-btn>
        <p class="login-menu__login-form__toggle-elt" @click="toggleLoginForm">
          Pas encore inscrit?
        </p>
      </v-container>
    </v-form>
    <v-form v-else @submit.prevent="submitRegister">
      <v-card>
        <v-card-title>BETA</v-card-title>
        <v-card-text>GameArt est actuellement en beta. Vous pouvez naviguer et profiter des screens postés par nos utilisateurs.</v-card-text>
        <v-card-text>Si vous souhaitez vous inscrire et participer activement à la création du projet en tant que beta-testeur, merci d'écrire à noloxe.web@gmail.com en expliquant vos motivations.</v-card-text>
      <!-- <v-container center>
        <div>
          <v-text-field
            v-model="emailReg"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="usernameReg"
            label="Pseudo"
            required
          ></v-text-field>
          <v-text-field
            v-model="passwordReg"
            type="password"
            label="Mot de passe"
            required
          ></v-text-field>
        </div>
        <v-btn type="submit" class="stylised-letter main-btn" small block text>Inscription</v-btn> -->
        <p class="login-menu__login-form__toggle-elt" @click="toggleLoginForm">
          Déjà inscrit?
        </p>
      </v-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  name: "Login",
  data: () => ({
    login: false,
    register: false,
    loginForm: true,
    usernameReg: "",
    usernameLog: "",
    emailReg: "",
    passwordReg: "",
    passwordLog: "",
  }),
  methods: {
    async submitLogin() {
      await this.$strapi.login({
        identifier: this.usernameLog,
        password: this.passwordLog,
      })
    },
    // async submitRegister() {
    //  await this.$strapi.register({
    //    email: this.emailReg,
    //    username: this.usernameReg,
    //    password: this.passwordReg,
    //  })
    // },
    toggleLoginForm() {
      this.loginForm = !this.loginForm
    },
  },
})
</script>

<style lang="scss" scoped>
.login-menu {
  min-width: 250px;
  background: linear-gradient($secondAppColor, 90%, transparent);
  color: $mainFontColor;
  &__login-form {
    &__toggle-elt {
      cursor: pointer;
      font-size: 0.8em;
      text-decoration: underline;
      margin: 5px;
      text-align: center;
      &:hover {
        color: #3f51b5;
      }
    }
  }
}
</style>
