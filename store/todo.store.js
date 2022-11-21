import { todoService } from '../services/todo.service.js'

export const todosModule = {
    state() {
        return {
            todos: null,
            filterBy: { 
                txt: '',
                importance: 3,
            },
            sort: {
                isDesc: false
            },
            currTodo: null,
        }
    },
    mutations: {
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
            this.dispatch('loadTodos')
        },

        setSort(state) {
            state.sort.isDesc = !state.sort.isDesc
            this.dispatch('loadTodos')
        },
 
        setTodos(state, {todos}) {
            state.todos = todos
        },

        setCurrTodo(state, { todo }) {
            state.currTodo = todo
        },

        toggleState(state, {todo}) {
            todo.isActive = !todo.isActive
        }

    },
    getters: {
        // getTodosToShow(state) {
        //     if (!state.todos) return null
        //     const filter = state.filterBy
        //     const regex = new RegExp(filter.txt, 'i')
        //     let filteredTodos = state.todos.filter(todo => regex.test(todo.txt) && todo.importance <= filter.importance)

        //     if (filter.state) {
        //         const isActive = (filter.state === 'Active') ? true : false
        //         filteredTodos = filteredTodos.filter(todo => todo.isActive === isActive)
        //     }

        //     filteredTodos.sort((todo1, todo2) => {

        //         const sortOrder = (state.sort.isDesc) ? [todo1, todo2] : [todo2, todo1]
        //         return sortOrder[0].txt.localeCompare(sortOrder[1].txt)

        //     })

        //     return filteredTodos
        // },

        getCurrTodo(state) {
            return state.currTodo
        },

        getTodos(state) {
            return state.todos
        },

        getSortDirection(state) {
            return state.sort.isDesc
        }
    },
    actions: {
        loadTodos(context) {
            todoService.query(context.state.filterBy, context.state.sort)
                .then(todos => {
                    context.commit({ type: 'setTodos', todos })
                    return Promise.resolve()
                })
                .catch(err => {
                    throw err
                })
        },
        addTodo(context, { todo }) {
            return todoService.save(todo)
                .then(todo => {
                    context.dispatch({ type: 'loadTodos'})
                        .then(() => Promise.resolve())
                        .catch(err => {throw err})
                })
                .catch(err => {throw err})
        },
        getTodo(context, {todoId}) {
            return todoService.getTodoById(todoId)
                .then(todo => {
                    todo = JSON.parse(JSON.stringify(todo))
                    context.commit('setCurrTodo', {todo})
                    return todo
                })
                .catch(err => {throw new Error(err)})
        },
        toggleTodoState(context, { todo }) {
            context.commit({type: 'toggleState', todo})
            todo = JSON.parse(JSON.stringify(todo))
            return context.dispatch({type: 'addTodo', todo})
        },
        deleteTodo(context, { id }) {
            return todoService.remove(id)
                .then(() => {
                    context.dispatch({type: 'loadTodos'})
                })
            
        },
    }
}

