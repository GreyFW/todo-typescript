import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

import TodoPage from '../pages/TodoPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import AboutPage from '../pages/AboutPage.vue'

const routes = [
    { // главная (тудушка)
        path: '/',
        name: 'Todo',
        component: TodoPage,
        meta: { requiresAuth: true }
    },
    { // логин
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: { guestOnly: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage,
        meta: { guestOnly: true }
    },
    { 
        path: '/about', 
        name: 'About',
        component: AboutPage
        // Без меток == пустим любого
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    // == если нужно быть залогиненым и юзер не залогинен -> логин
    if (to.meta.requiresAuth && !userStore.currentUser) {
        return next('/login')
    }
    // == если только для незалогин., а юзер залогин., -> главная
    if (to.meta.guestOnly && userStore.currentUser) {
        return next('/')
    }
    // пускаем куда кликнули
    next()
})

export default router