const state = {
  current: 0,
  currentQuizTry: 1,
  tree: {},
  showItem: 'quiz',
  puzzle: {},
  puzzles: [],
  texts: [],
  currentParentProblem: {},
  puzzleTries: {},
  corrects: [],
}

const getters = {
  getCurrent(state) {
    return state.current
  },

  getTree(state) {
    return state.tree
  },

  getShowItem(state) {
    return state.showItem
  },

  getCurrentQuizTry() {
    return state.currentQuizTry
  },

  getPuzzles() {
    return state.puzzles
  },

  getPuzzle() {
    return state.puzzle
  },

  getTexts() {
    return state.texts
  },

  getCurrentParentProblem() {
    return state.currentParentProblem
  },

  getPuzzleTries() {
    return state.puzzleTries
  },

  getCorrects() {
    return state.corrects
  },
}

const actions = {
  setCurrent(context, payload) {
    context.commit('setCurrent', payload)
  },

  setTree(context, payload) {
    context.commit('setTree', payload)
  },

  setShowItem(context, payload) {
    context.commit('setShowItem', payload)
  },

  setCurrentQuizTry(context, payload) {
    context.commit('setCurrentQuizTry', payload)
  },

  setPuzzles(context, payload) {
    context.commit('setPuzzles', payload)
  },

  setAllAnswerTexts(context, payload) {
    context.commit('setAllAnswerTexts', payload)
  }
}

const mutations = {
  setCurrent(state, current) {
    state.current = current
  },

  setTree(state, tree) {
    state.tree = tree
  },

  setShowItem(state, showItem) {
    state.showItem = showItem
  },

  setCurrentQuizTry(state, currentQuizTry) {
    state.currentQuizTry = currentQuizTry
  },

  setPuzzles(state, puzzles) {
    state.puzzles = puzzles
  },

  setPuzzle(state, puzzle) {
    state.puzzle = puzzle
  },

  clearTreeData(state) {
    state.current = 0
    state.currentQuizTry = 1
    state.tree = {}
    state.showItem = 'quiz'
    state.puzzle = {}
    state.puzzles = []
  },

  setAllAnswerTexts(state, texts) {
    state.texts = texts
  },

  setCurrentParentProblem(state, problem) {
    state.currentParentProblem = problem
  },

  setPuzzleTry(state, payload) {
    let id = payload.id
    let att = payload.try
    state.puzzleTries[id] = att
  },

  setCorrects(state, puzzleId) {
    if (state.corrects.indexOf(puzzleId) == -1) {
      state.corrects.push(puzzleId)
    }
  },

  clearPuzzleTries(state) {
    state.puzzleTries = {}
  },

  clearCorrects(state) {
    state.corrects = []
  },
  
  clearCurrentParentProblem(state) {
    state.currentParentProblem = {}
  },
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
}