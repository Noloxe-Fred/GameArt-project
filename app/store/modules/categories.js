const state = () => ({
  list: [],
})

const mutations = {
  initCategories(state, categories) {
    state.list = [...categories]
  },
}

const actions = {
  initCategories({ commit }, categories) {
    commit("initCategories", categories)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
