import todoPreview from "./todo-preview.cmp.js"


export default {
    name: 'TodoList',
    props: ['todos'],
    template:`
            <ul class="todo-list-container">
            <p @click="$emit('set-sort')">Todo's List {{getArrow}}</p> 
                <li v-for="todo in todos">
                    <todo-preview @click="$emit('toggle-todo-state', todo)" :todo="todo"/>
                </li>
            </ul>
    `,
    components: {
        todoPreview
    },
    computed: {
        isDesc() {
            return (!this.$store.getters.getSortDirection)
        },
        getArrow() {
            return (this.isDesc) ? '↓' : '↑'
        }
    }
}