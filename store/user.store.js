import { userService } from '../services/user.service.js'

export const userModule = {
    state() {
        return {
            user: null,
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        }
    },
    actions: {
        loadUser(context) {
            userService.query()
                .then(user => {
                    context.dispatch({ type: 'saveUser', user })
                })
                .catch(err => {
                    throw err
                })
        },
        saveUser(context, { user }) {
            user = JSON.parse(JSON.stringify(user))
            userService.save(user)
                .then(newUser => {
                    context.commit('setUser', {user: newUser})
                    return Promise.resolve()
                })
                .catch(err => {
                    throw err
                })
        },
    }
}


