import { router } from './router/router.js'
import { store } from './store/store.js'

import { showSuccessMsg, showErrorMsg, eventBus } from './services/event-bus.service.js'

import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.js'



const options = {
    template: `
        <section :style="backgroundColor" class="main-container">
            <app-header/>
            <router-view v-if="getUser && todos"/>
            <div v-else class="loader-container">
                <div class="loader"></div>
                <div class="loader"></div>
                <div class="loader"></div>
                <span class="loader-list"></span>
            </div>
            <user-msg/>
        </section>
        
    `,
    components: {
        appHeader,
        userMsg
    },
    computed: {
        backgroundColor() {
            const color = this.getUser.pref.colorTheme
            return {backgroundColor: color}
        },
        getUser() {
            return this.$store.getters.getUser
        },
        todos() {
            return this.$store.getters.getTodos
        }
    },
    created() {
        this.$store.dispatch({ type: 'loadTodos'})
        
        this.$store.dispatch('loadUser')
            .then(() => {
                // showSuccessMsg('')
            })
            .catch((err) => {
                showErrorMsg('Couldn\'t load user')
            })

    },

}
const app = Vue.createApp(options)

app.use(router)
app.use(store)
app.mount('#app')
