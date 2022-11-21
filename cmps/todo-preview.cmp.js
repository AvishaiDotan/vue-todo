import { eventBus } from "../services/event-bus.service.js";

export default {
    props: ['todo'],
    template:`
        <section :style="todoStyle" class="todo-preview" @mouseenter="isHover = true" @mouseleave="isHover = false">
           <h3 :style="todoMarkStyle">{{ todo.txt }}</h3>
           
           <div class="preview-actions-container">
                <h4 class="date">{{ formattedDate }}</h4>
                <div v-if="isHover" > 
                    <a @click.stop="goToEdit(todo._id)">
                        <img src="./assets/img/edit.png" alt="" />
                    </a>
                    <button @click.stop="deleteTodo" class="clear-btn delete-action">
                        <img src="./assets/img/bin (1).png" alt="" />
                    </button>
                </div>
           </div>
        </section>

    `,
    data() {
        return {
            isHover: false
        }
    },
    computed: {
        todoStyle() {
            let color;

            switch (this.todo.importance) {
                case 1: 
                    color = 'var(--clr-primary)'
                    break
                case 2: 
                    color = 'var(--clr-secondary)'
                    break
                case 3: 
                    color = 'var(--clr-1)'
                    break
            }
            return { backgroundColor: color }
        },

        todoMarkStyle() {
            return {textDecoration: (this.todo.isActive) ? 'none': 'line-through'}
        },
        formattedDate() {
            const d = new Date(this.todo.createdAt)
            const cd = num => num.toString().padStart(2, 0)
            return d.getFullYear()+"/"+cd(d.getMonth() + 1)+"/"+cd(d.getDate())
        }
    },
    methods: {
        routeToDetails() {
            this.$router.push(`/todo/details/${this.todo._id}`)
        },
        deleteTodo() {
            eventBus.emit('delete-todo', this.todo._id)
        },   
        goToEdit(todoId) {
            this.$router.push('/todo/edit/' + todoId)
        }     
    },
}