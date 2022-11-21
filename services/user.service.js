import { utilService} from './util.service.js'

let gUser;
const USER_KEY = 'userDB'

export const userService = {
    save,
    query
}

_createUser()

function query() {
    const user = JSON.parse(JSON.stringify(gUser))
    return Promise.resolve(user)
}

function save(user) {
    const newUser = JSON.parse(JSON.stringify(user))

    utilService.saveToStorage(USER_KEY, newUser)
    gUser = newUser
    const userCopy = JSON.parse(JSON.stringify(gUser))
    return Promise.resolve(userCopy)
}

function _createUser() {
    let user = utilService.loadFromStorage(USER_KEY)
    if (!user) {
        user = {
            fullName: 'Puki Ben David',
            activities: [
                {
                txt: 'Added a Todo',
                at: 1523873242735,
                },
            ],
            pref: {
                colorTheme: '#1076DA',
            }
        }
    }
    gUser = user

    utilService.saveToStorage(USER_KEY, gUser)
}