import { eventBus, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import todoList from "../cmps/todo-list.cmp.js"
import todoFilter from "../cmps/todo-filter.cmp.js"
import todoEdit from "./todo-edit.cmp.js"

export default {
    created() {
        eventBus.on('delete-todo', (id) => {
            this.$store.dispatch({ type: 'deleteTodo', todoId: id })
                .then(() => {
                    showSuccessMsg('Delete The Todo')
                })
                .catch(() => {
                    showErrorMsg('Cant Delete The Todo')
                })
        })

        eventBus.on('addUserActivity', (activityTxt) => {
            this.addUserActivity(activityTxt)
        })

        eventBus.on('save-user', (user) => {
            this.saveUser(user) 
        })
    },
    name: 'todoApp',
    template: `
        <main v-if="todos" class="todo-app-container">
            <section class="todo-app">
                <div class="todo-edit-container">
                    <p>Todo</p>
                    <router-view class="add-todo-container"></router-view>
                </div>
                <todo-filter class="todo-app-filter" @set-filter="setFilter"/> 
                <todo-list  class="todo-list" @set-sort="setSort" @toggle-todo-state="toggleTodoState" :todos="todos"/>
            </section>
        </main>


    `,
    computed: {
        todos() {
            return this.$store.getters.getTodos
        }
    },
    methods: {
        setFilter(filterBy) {
            this.$store.commit({ type: 'setFilterBy', filterBy })
        },
        toggleTodoState(todo) {
            this.$store.dispatch({ type: 'toggleTodoState', todo })
                .then(() => {
                    showSuccessMsg(`${todo.txt} is ${todo.isActive ? 'Active' : 'Finished'}`)
                })
        },
        addUserActivity(txt) {
            const user = JSON.parse(JSON.stringify(this.$store.getters.getUser))

            const activity = {
                txt,
                at: Date.now()
            }

            user.activities.push(activity)
            this.saveUser(user)
        },
        saveUser(user) {
            this.$store.dispatch({ type: 'saveUser', user })
                .then(() => {
                    showSuccessMsg(`Save User Succeeded`)
                })
                .catch(() => {
                    showErrorMsg(`Save User Failed`)
                })
        }, 
        setSort() {
            this.$store.commit({ type: 'setSort'})
        },
    },
    components: {
        todoList,
        todoFilter,
        todoEdit

    }
}