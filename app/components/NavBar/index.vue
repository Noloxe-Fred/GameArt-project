<template>
  <v-app-bar dense class="second-background" fixed app>
    <v-tabs>
      <v-tab to="/"><v-img width="70" height="40" contain :src="require('../../assets/images/Final.png')"/></v-tab>
      <v-tabs-slider class="navbar__main-menu__slider"></v-tabs-slider>
      <v-tab v-for="(item, index) in menuLinks" :key="index" :to="item.to" class="stylised-letter main-btn">{{ item.title }}</v-tab>
    </v-tabs>
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
        outlined
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
          title: "Categories",
          to: "/categories",
        },
      ],
      userLinks: [
        {
          title: "Profil",
          to: "/user/profile",
        },
        {
          title: "Gestion Screens",
          to: "/user/upload",
        },
      ],
    }
  },
  computed: {
    isAuthenticated() {
      return this.$strapi?.user?.confirmed
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
  &__main-menu {
    &__slider {
      color: $mainFontColor;
    }
  }
  &__login-menu {
    position: absolute;
    right: 10px;
    &__expand {
      position: absolute;
      top: 40px;
      right: 0;
    }
  }
  &__menu-list {
    min-width: 250px;
    background: linear-gradient($secondAppColor, 98%, transparent);
    color: $mainFontColor;
  }
}
</style>
