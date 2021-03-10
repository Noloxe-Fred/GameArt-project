<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
  >
    <v-btn
      to="/"
      elevation="24"
      large
    >
      LOGO
    </v-btn>
    <div v-for="(item, index) in menuLinks">
      <v-btn :key="index" :to="item.to" text>{{ item.title }}</v-btn>
    </div>
    <v-spacer />
    <v-menu v-if="isAuthenticated" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          text
          fab
          dark
          color="indigo"
          v-bind="attrs"
          v-on="on"
        >
          V
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in userLinks"
          :key="index"
        >
          <v-btn text :to="item.to">{{ item.title }}</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu
      v-else
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          color="indigo"
          v-bind="attrs"
          v-on="on"
        >
          Login
        </v-btn>
      </template>
      <Login />
    </v-menu>
  </v-app-bar>
</template>


<script>

import Login from './Login';

export default {
  components: {
    Login
  },
  data () {
    return {
      menuLinks: [
        {
          title: 'Categories',
          to: '/categories'
        },
        {
          title: 'Screeners',
          to: '/screeners'
        },
        {
          title: 'Fil',
          to: '/wall'
        }
      ],
      userLinks: [
        {
          title: 'Profil',
          to: '/profil'
        },
        {
          title: 'Bibliothèque',
          to: '/bibliotheque'
        },
      ],
    }
  },
  computed: {
    isAuthenticated() {
      return this.$strapi.user?.confirmed;
    },
    userName() {
      const { user } = this.$strapi;
      return `${user.firstName} ${user.lastName}`;
    },
  },
}
</script>
