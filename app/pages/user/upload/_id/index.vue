<template>
  <div>
    <h1>{{ gameData.name }}</h1>
    <v-btn @click="toggleUploadCard">Ajouter un screen</v-btn>
    <UploadCard
      :is-active="activeUploadCard"
      :game="gameData"
      type="create"
      @toggle="toggleUploadCard"
    />
    <section>
      <MainGallery
        :list-name="getListName"
        :screens-list-datas="getScreensListDatas"
        :list-filters="getListFilters"
        :can-edit="true"
        @deleteScreen="deleteScreen"
      />
    </section>
  </div>
</template>

<script>
import Vue from "vue"
import { mapGetters } from "vuex"
import UploadCard from "../../../../components/Screenshot/UploadCard"
import MainGallery from "../../../../components/Screenshot/MainGallery"

const USER_GAME_LIST_NAME = (id) => `USER_GAME_LIST_${id}`

export default Vue.extend({
  name: "GameUpload",
  components: {
    UploadCard,
    MainGallery,
  },
  middleware: "authenticated",
  async asyncData(context) {
    if (
      !context.store.state.modules.mainGalleryLists.lists[
        USER_GAME_LIST_NAME(context.route.params.id)
      ]
    ) {
      let gameData
      const [data] = await context.$strapi.find("games", {
        rawgId: context.route.params.id,
      })
      if (data) {
        gameData = data
      } else {
        const result = await context.$axios.$get(
          "https://api.rawg.io/api/games/" +
            context.route.params.id +
            process.env.rawgApiKey
        )
        const createData = {
          rawgId: result.id.toString(),
          name: result.name,
          imageUrl: result.background_image,
        }
        gameData = await context.$strapi.create("games", createData)
      }
      const total = await context.$strapi.count("screenshots", {
        user: context.$strapi.user.id,
        game: gameData.id,
      })
      const userScreens = await context.$strapi.find("screenshots", {
        user: context.$strapi.user.id,
        game: gameData.id,
        _start: 0,
        _limit: 10,
        _sort: "createdAt:desc",
      })
      const screensListDatas = {
        listName: USER_GAME_LIST_NAME(gameData.rawgId),
        total,
        list: userScreens,
      }
      context.store.dispatch(
        "modules/mainGalleryLists/initList",
        screensListDatas
      )
      return {
        gameData,
      }
    } else {
      const [gameData] = await context.$strapi.find("games", {
        rawgId: context.route.params.id,
      })
      return {
        gameData,
      }
    }
  },
  data() {
    return {
      activeUploadCard: false,
    }
  },
  computed: {
    ...mapGetters({
      screensListDatas: "modules/mainGalleryLists/getListDatasByName",
    }),
    getListName() {
      return USER_GAME_LIST_NAME(this.$route.params.id)
    },
    getScreensListDatas() {
      return this.screensListDatas(this.getListName)
    },
    getListFilters() {
      return {
        user: this.$strapi.user.id,
        game: this.gameData.id,
      }
    },
  },
  methods: {
    toggleUploadCard() {
      this.activeUploadCard = !this.activeUploadCard
    },
    deleteScreen({ id }) {
      this.userScreens = this.userScreens.filter((screen) => screen.id !== id)
    },
  },
})
</script>

<style scoped></style>
