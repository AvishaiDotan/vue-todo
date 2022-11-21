import { eventBus } from "../services/event-bus.service.js"

export default {
    template:`
        <section class="app-header" v-if="user">
            <h1 @click="$router.push('/')" class="animate__animated animate__backInLeft">Todos</h1>
            <div className="user-container">
                <div class="progress-bar">
                    <div v-if="todos" class="progress-bar-fill" :style="{width: getTodosProgress + '%'}">{{ getTodosProgress }}%</div>
                </div>
                <h3>{{ user.fullName }}</h3>
                <router-link to="/user"><img src="./assets/img/user.png" title="user-icon" alt="user-icon" /></router-link>
            </div>
        </section>
    `,
    computed: {
        user() {
            return this.$store.getters.getUser
        },
        todos() {
            return this.$store.getters.getTodos
        },
        getTodosProgress() {
            const todos = JSON.parse(JSON.stringify(this.todos))
            const todosLength = todos.length
    
            const activeTodos = todos.filter(todo => !todo.isActive)
            const activeTodosLength = activeTodos.length
    
            return (activeTodosLength / todosLength).toFixed(1) * 100
        },
    },
}