import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: number
  email: string
  password?: string
}

export const useUserStore = defineStore(
  'user',
  () => {
    const users = ref<User[]>([])

    const currentUser = ref<User | null>(null)

    function register(email: string, password: string) {
      const existing = users.value.find((u) => u.email === email)
      if (existing) {
        throw new Error('Пользователь с таким email уже зарегистрирован')
      }

      const newUser: User = {
        id: Date.now(),
        email,
        password
      }

      users.value.push(newUser)
      // авторизовываем сразу после регистрации:
      currentUser.value = newUser
    }

    function login(email: string, password: string) {
      const user = users.value.find(
        (u) => u.email === email && u.password === password
      )

      if (!user) {
        if (users.value.find((u) => u.email === email)) {
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
  },
  {
    persist: true // автосохр. состояния в LocalStorage
  }
)
