<template>
  <v-app dark>
    <NavBar />
    <v-main class="main-background">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "../components/NavBar"

export default {
  components: {
    NavBar,
  },
}
</script>
