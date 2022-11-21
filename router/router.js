const { createRouter, createWebHashHistory } = VueRouter

import todoApp from "../pages/todo-app.cmp.js"
import todoEdit from "../pages/todo-edit.cmp.js"
import todoDetails from "../pages/todo-details.cmp.js"
import userProfile from "../pages/user-profile.cmp.js"

const routes = [
    {
        path: '/',
        redirect: '/todo',
    },
    {
        path: '/todo',
        component: todoApp,
        children: [
            {
                path: '/todo',
                component: todoEdit,
            },
            {
                path: '/todo/edit/:id',
                component: todoEdit,
            },
        ]
    },
    {
        path: '/todo/details/:id',
        component: todoDetails
    },
    {
        path: '/user',
        component: userProfile,
    }
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})


