export const state = () => ({
    user : null
})

export const mutations = {
    set_user(state, user){
        state.user = user;
    }
}

export const actions = {
    setUser({ commit }, user){
        commit('set_user', user)
    }
}

export const getters = {
    getUser : (state) => state.user
}

