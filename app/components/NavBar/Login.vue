<template>
  <div class="login-menu">
    <v-form v-model="valid">
    <v-container>
      <h2>Connexion</h2>
      <div>

          <v-text-field
            v-model="username"
            :rules="usernameRules"
            :counter="3"
            label="Pseudo"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Mot de passe"
            required
          ></v-text-field>

      </div>
    </v-container>
  </v-form>
  <v-form v-model="register">
    <v-container>
      <h2>Inscription</h2>
      <div>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            :counter="3"
            label="Pseudo"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Mot de passe"
            required
          ></v-text-field>
      </div>
    </v-container>
  </v-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data: () => ({
    login: false,
    register: false,
    username: '',
    usernameRules: [
      v => !!v || 'Le pseudo est requis',
      v => v.length <= 3 || 'Le pseudo doit contenir au moins 3 caractères',
    ],
    email: '',
    emailRules: [
      v => !!v || "L'email est requis",
      v => /.+@.+/.test(v) || "L'email n'est pas valide",
    ],
    password: '',
    passwordRules: [
      p => p.length <= 6 || 'Le mot de passe doit contenir au moins 6 caractères'
    ]
  }),
  methods: {
    login: async () => {
      await this.$strapi.login({ identifier: this.username, password: this.password })
    },
    register: async () => {
      await this.$strapi.register({ email: '', username: '', password: '' })
    }
  }
}
</script>

<style scoped>
.login-menu {
  min-width: 250px;
}
</style>
