import { storageService } from "./async-storage.service.js"
import {  utilService} from "./util.service.js"

const TODOS_KEY = 'todosDB'
let gTodos = _createTodos()

export const todoService = {
    query,
    getTodoById,
    getEmptyTodo,
    save,
    remove
}

function query(filter, sortBy) {
    return storageService.query(TODOS_KEY)
                .then(todos => {
                    const regex = new RegExp(filter.txt, 'i')
                    let filteredTodos = todos.filter(todo => regex.test(todo.txt) && todo.importance <= filter.importance)

                    if (filter.state) {
                        const isActive = (filter.state === 'Active') ? true : false
                        filteredTodos = filteredTodos.filter(todo => todo.isActive === isActive)
                    }

                    filteredTodos.sort((todo1, todo2) => {

                        const sortOrder = (sortBy.isDesc) ? [todo1, todo2] : [todo2, todo1]
                        return sortOrder[0].txt.localeCompare(sortOrder[1].txt)

                    })

                    return filteredTodos
                })
}

function getTodoById(todoId) {
    return storageService.get(TODOS_KEY, todoId)
}

function getEmptyTodo() {
    return {
        txt: '',
        importance: 'Importance',
        isActive: true,
    }
}

function save(todo) {
    const todoToSave = JSON.parse(JSON.stringify(todo))

    return (todoToSave._id) ? _update(todoToSave) : _create(todoToSave)
}

function remove(todoId) {
    // const todoIdx = gTodos.findIndex(todo => todo._id === todoId)
    // gTodos.splice(todoIdx, 1)
    // utilService.saveToStorage(TODOS_KEY, gTodos)
    // return JSON.parse(JSON.stringify(gTodos))
    return storageService.remove(TODOS_KEY, todoId)
}


function _update(todoToUpdate) {
    const todoIdx = gTodos.findIndex(todo => todo._id === todoToUpdate._id)
    gTodos[todoIdx] = todoToUpdate

    utilService.saveToStorage(TODOS_KEY, gTodos)
    return Promise.resolve(todoToUpdate)
}

function _create(todo) {
    todo._id = utilService.makeId()
    todo.createdAt = Date.now()
    gTodos.push(todo)

    utilService.saveToStorage(TODOS_KEY, gTodos)
    return Promise.resolve(todo)
}




function _createTodos() {

    let todos = utilService.loadFromStorage(TODOS_KEY)

    if (!todos || !todos.length) {
        todos = [
            _createTodo('Get New Screen'),
            _createTodo('Cook Shabe\'s Food'),
            _createTodo('Finish CA Homework')
        ]

        storageService.store(TODOS_KEY, todos)
    }

    return todos
}

function _createTodo(txt, importance = utilService.getRandomIntInclusive(1, 3)) {
    return {
        txt,
        _id: utilService.makeId(),
        importance,
        isActive: true,
        createdAt: Date.now()
    }
}