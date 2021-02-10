<template>
  <v-app dark>
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
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mx-2"
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
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; Project GameArt</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
