import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    // state
    const users = ref([]) // массив всех зареганных юзеров
    const currentUser = ref(null) 

    // actions
    function register(email, password) {
        const existing = users.value.find(u => u.email === email)
        if (existing) {
            throw new Error('Пользователь с таким email уже зарегистрирован')
        }
        const newUser = {
            id: Date.now(),
            email,
            password
        }
        users.value.push(newUser)
        // авторизовываем сразу после регистрации:
        currentUser.value = newUser
    } 

    function login(email, password) {
        const user = users.value.find(u => u.email === email && u.password === password)
        if (!user) {
            if (users.value.find(u => u.email === email)) {
                throw new Error('Неверный пароль')
            } else {
                throw new Error('Нет пользователя с таким email')
            }
        }
        currentUser.value = user
    }

    function logout() {
        currentUser.value = null
    }

    return { users, currentUser, register, login, logout }
    
}, {
    persist: true // автосохр. состояния в LocalStorage
})