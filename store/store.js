import { showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'
import { todoService } from '../services/todo.service.js'

import { userModule } from './user.store.js'
import {todosModule} from './todo.store.js'


const { createStore } = Vuex

const storeOptions = {
  strict: true,
  modules: {
      userModule,
      todosModule
  }
}

export const store = createStore(storeOptions)
