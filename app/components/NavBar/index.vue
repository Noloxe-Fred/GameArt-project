<template>
  <v-app-bar
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
        <v-list-item>
          <v-btn @click="logout">Deconnexion</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <div
      v-else
      class="navbar__login-menu"
      v-click-outside="onClickOutside"
    >
      <v-btn
        text
        color="indigo"
        @click="expandLogin = !expandLogin"
        class="navbar__login-menu__expand-btn"
      >
        Login
      </v-btn>
      <v-expand-transition>
        <Login v-show="expandLogin" class="navbar__login-menu__expand" />
      </v-expand-transition>
    </div>
  </v-app-bar>
</template>


<script>

import vClickOutside from 'v-click-outside'
import Login from './Login';

export default {
  components: {
    Login
  },
  data () {
    return {
      expandLogin: false,
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
  directives: {
    clickOutside: vClickOutside.directive
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
  methods: {
    logout() {
      this.$strapi.logout();
    },
    onClickOutside() {
      this.expandLogin = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  &__login-menu {
    position: relative;
    &__expand {
      position: absolute;
      top: 50px;
      right: 0;
    }
   }
}
</style>
