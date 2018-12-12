import api from '../../api'
import VueCookies from 'vue-cookies'

const state = {
    user: {},
}
  
const getters = {
    getUser(state) {
        return state.user
    },
}

const actions = {
    setUser(context) {
        const token = VueCookies.get('token');
        api.info(token)
            .then((data) => {
                context.commit('setUser', data.data)
            })
    },
}

const mutations = {
    setUser(state, user) {
        state.user = user
    },
}

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations,
}