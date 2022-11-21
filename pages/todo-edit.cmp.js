import { todoService } from "../services/todo.service.js"
import { showSuccessMsg, showErrorMsg, eventBus } from "../services/event-bus.service.js"

{/* <select v-model.number="todoToEdit.importance">
<option>Importance</option>
<option>1</option>
<option>2</option>
<option>3</option>
</select> */}

export default {
    name: 'todoEdit',
    template: `
        <section>
            <form @submit.prevent="save">

                <input v-model="todoToEdit.txt" type="text" placeholder="What's on your mind?"/>

                <div @click="toggleDropDown" class="dropdown-toggle">
                    <span class="dropdown-btn">{{ todoToEdit.importance }}</span> 
                    <div :class="{'open': isDropdownOpen}" class="dropdown">
                        <span v-for="n in 3" @click="todoToEdit.importance = n">{{n}}</span>
                    </div>
                </div>

                <button>+</button>
            </form>
        </section>
    `,
    data() {
        return {
            todoToEdit: todoService.getEmptyTodo(),
            isDropdownOpen: false,
        }
    },
    methods: {
        loadTodoToEdit() {
            if (this.$route.params.id) {

                this.$store.dispatch({ type: 'getTodo', todoId: this.$route.params.id })
                    .then((currTodo) => {
                        currTodo = JSON.parse(JSON.stringify(currTodo))
                        this.todoToEdit = currTodo
                    })
            } else {
                this.todoToEdit = todoService.getEmptyTodo()
            }
        },
        save() {
            if (!this.todoToEdit.txt) {
                showErrorMsg('Cannot Save when there are empty cells')
                return
            } else {
                this.$store.dispatch({ type: 'addTodo', todo: this.todoToEdit })
                    .then(() => {
                        showSuccessMsg('Todo Saved')
                    })
                    .catch(() => {
                        showErrorMsg('Todo Failed To Save')
                    })

                this.$store.commit({ type: 'setCurrTodo', todoId: '' })

                showSuccessMsg('Todo Saved')
                this.todoToEdit = todoService.getEmptyTodo()
            }
        },
        toggleDropDown() {
            this.isDropdownOpen = !this.isDropdownOpen
        },
    },
    watch: {
        '$route.params.id'(id) {
            this.loadTodoToEdit()
        }
    }
}
