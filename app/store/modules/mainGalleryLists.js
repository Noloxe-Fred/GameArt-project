export const MAIN_GALLERY_PAGINATION_BASE = {
  _start: 0,
  _limit: 10,
  _sort: "createdAt:desc",
}

const state = () => ({
  lists: {},
})

const getters = {
  getListDatasByName: (state) => (name) => {
    return state.lists[name]
  },
}

const mutations = {
  initList(state, { listName, total, list }) {
    state.lists[listName] = {
      ...MAIN_GALLERY_PAGINATION_BASE,
      total,
      list,
      _start: 10,
    }
  },
  increaseList(state, { listName, list }) {
    const newState = {
      ...state,
      lists: {
        ...state.lists,
        [listName]: {
          ...state.lists[listName],
          _start: state.lists[listName]._start + 10,
          list: [...state.lists[listName].list, ...list],
        },
      },
    }
    state.lists = { ...newState.lists }
  },
  updateScreen(state, screenData) {
    const newState = Object.entries(state.lists).map((item) => {
      console.log(item[0], item[1])
      return {
        [item[0]]: {
          ...item[1],
          list: item[1].list.map((screen) => {
            if (screen.id === screenData.id) {
              return screenData
            }
            return screen
          }),
        },
      }
    })
    state.lists = { ...newState }
  },
}

const actions = {
  increaseList({ commit }, { listName, list }) {
    commit("increaseList", { listName, list })
  },
  initList({ commit }, { listName, total, list }) {
    commit("initList", { listName, total, list })
  },
  updateScreen({ commit }, screenData) {
    commit("updateScreen", screenData)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
