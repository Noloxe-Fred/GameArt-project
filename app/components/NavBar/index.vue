<template>
  <v-app-bar dense class="second-background" fixed app>
    <div v-for="(item, index) in menuLinks" :key="index">
      <v-btn :key="index" :to="item.to" class="stylised-letter main-btn" text>{{ item.title }}</v-btn>
    </div>
    <v-spacer />
    <v-menu v-if="isAuthenticated" offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          class="mx-2 stylised-letter"
          text
          v-bind="attrs"
          v-on="on"
        >
          {{ userName }}
        </v-btn>
      </template>
      <v-list class="navbar__menu-list" >
        <v-list-item v-for="(item, index) in userLinks" :key="index">
          <v-btn text :to="item.to">{{ item.title }}</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn @click="logout">Deconnexion</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <div v-else v-click-outside="onClickOutside" class="navbar__login-menu">
      <v-btn
        text
        class="navbar__login-menu__expand-btn stylised-letter"
        @click="expandLogin = !expandLogin"
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
import vClickOutside from "v-click-outside"
import Login from "./Login"

export default {
  components: {
    Login,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      expandLogin: false,
      menuLinks: [
        {
          title: "Home",
          to: "/",
        },
        {
          title: "Categories",
          to: "/categories",
        },
        {
          title: "Screeners",
          to: "/screeners",
        },
        {
          title: "Fil",
          to: "/wall",
        },
      ],
      userLinks: [
        {
          title: "Profil",
          to: "/user/profile",
        },
        {
          title: "Bibliothèque",
          to: "/user/screens",
        },
        {
          title: "Ajout Screen",
          to: "/user/upload",
        },
      ],
    }
  },
  computed: {
    isAuthenticated() {
      return this.$strapi.user?.confirmed
    },
    userName() {
      const { username } = this.$strapi.user
      return username;
    },
  },
  methods: {
    logout() {
      this.$strapi.logout()
    },
    onClickOutside() {
      this.expandLogin = false
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  &__login-menu {
    position: absolute;
    right: 0;
    &__expand {
      position: absolute;
      top: 40px;
      right: 0;
    }
  }
  &__menu-list {
    min-width: 250px;
    background: linear-gradient($secondAppColor, 90%, transparent);
    color: $mainFontColor;
  }
}
</style>
