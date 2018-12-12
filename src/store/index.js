// Make sure to call Vue.use(Vuex) first if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import tree from './modules/tree'
import user from './modules/user'
import fourProblemQuiz from './modules/fourProblemQuiz'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
      tree,
      fourProblemQuiz,
      user,
    }
})

export default store