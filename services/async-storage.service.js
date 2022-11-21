import { utilService } from './util.service.js'
const TODOS_KEY = 'todosDB'

let gTodos = _createTodos()

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, filterBy, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         let todos = entities
    //         if (filterBy.txt || filterBy.importance || filterBy.state !== 'All') todos = _getFilterData(filterBy, todos)
    //         resolve(todos)
    //     }, delay)
    // })
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity) {
    newEntity = {...newEntity}
    newEntity.id = _makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _getFilterData(filterBy, todos) {
    const filter = filterBy
    const regex = new RegExp(filter.txt, 'i')
    let filteredTodos = todos.filter(todo => regex.test(todo.txt) && todo.importance <= filter.importance)

    if (filter.state) {
        const isActive = (filter.state === 'Active') ? true : false
        filteredTodos = filteredTodos.filter(todo => todo.isActive === isActive)
    }
    return filteredTodos
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}


function _createTodos() {

    let todos = utilService.loadFromStorage(TODOS_KEY)

    if (!todos || !todos.length) {
        todos = [
            _createTodo('Get New Screen'),
            _createTodo('Cook Shabe\'s Food'),
            _createTodo('Finish CA Homework')
        ]

        utilService.saveToStorage(TODOS_KEY, todos)
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