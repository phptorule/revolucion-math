const state = {
  currentGroup: 0,
  currentQuestion: 0
}

const getters = {
  getCurrentGroup(state) {
    return state.currentGroup
  },
  getCurrentQuestion(state) {
    return state.currentQuestion
  },
}

const actions = {
  setCurrentGroup(context, payload) {
    context.commit('setCurrentGroup', payload)
    context.commit('setCurrentQuestion', 0)
  },
  setCurrentQuestion(context, payload) {
    context.commit('setCurrentQuestion', payload)
  }
}

const mutations = {
  setCurrentGroup(state, currentGroup) {
    state.currentGroup = currentGroup
  },

  setCurrentQuestion(state, currentQuestion) {
    state.currentQuestion = currentQuestion
  },

  clearFourProblemQuizData(state) {
    state.currentGroup = 0
    state.currentQuestion = 0
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}