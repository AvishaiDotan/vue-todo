import { eventBus } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"

export default {
    name: 'user-details',
    created() {
        const user = JSON.parse(JSON.stringify(this.$store.getters.getUser))
        this.updatedUser = user
    },
    template:`
        <section class="user-details">
            <div class="user-details-container">
                <header class="user-details-header">
                    <button @click="$router.push('/')">Return</button>
                    <h2>User Profile</h2>
                </header>
                <form class="user-details-form">
                    <div class="name-input-container">
                        <input @input.prevent="updateUserDetails" v-model="updatedUser.fullName" type="text"/>
                        <p>Change Your Username</p>
                    </div>
                    <div class="color-picker-container">
                        <input @input.prevent="updateUserDetails" v-model="updatedUser.pref.colorTheme" type="color"/>
                        <p>Select Color Theme</p>
                    </div>
                </form>
            </div>

        </section>
    `,
    data() {
        return {
            updatedUser: {}
        }
    },
    methods: {
        updateUserDetails() {

            const user = JSON.parse(JSON.stringify(this.updatedUser))
            this.$store.commit({ type: 'setUser', user })
            this.$store.dispatch({ type: 'saveUser', user })
                
        }
    },
}