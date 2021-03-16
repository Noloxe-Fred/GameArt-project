<template>
  <div class="login-menu">
    <v-form v-if="loginForm" @submit.prevent="submitLogin">
      <v-container>
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
        <v-btn type="submit">Connexion</v-btn>
        <p class="login-menu__login-form__toggle-elt" @click="toggleLoginForm">
          Pas encore inscrit?
        </p>
      </v-container>
    </v-form>
    <v-form v-else @submit.prevent="submitRegister">
      <v-container>
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
        <v-btn type="submit">Inscription</v-btn>
        <p class="login-menu__login-form__toggle-elt" @click="toggleLoginForm">
          Déjà inscrit?
        </p>
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
      console.log({ identifier: this.usernameLog, password: this.passwordLog })
      await this.$strapi.login({
        identifier: this.usernameLog,
        password: this.passwordLog,
      })
    },
    async submitRegister() {
      await this.$strapi.register({
        email: this.emailReg,
        username: this.usernameReg,
        password: this.passwordReg,
      })
    },
    toggleLoginForm() {
      this.loginForm = !this.loginForm
    },
  },
})
</script>

<style lang="scss" scoped>
.login-menu {
  min-width: 250px;
  &__login-form {
    &__toggle-elt {
      cursor: pointer;
      font-size: 0.8em;
      text-decoration: underline;
      margin-top: 5px;
      &:hover {
        color: #3f51b5;
      }
    }
  }
}
</style>
