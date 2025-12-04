<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMsg = ref('')

function handleLogin() {
  errorMsg.value = ''
  
  try {
    userStore.login(email.value, password.value)
    // Если всё успешно — идем на главную
    router.push('/')
  } catch (e) {
    errorMsg.value = e.message
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Вход</h1>
    <form @submit.prevent="handleLogin" class="auth-form">

      <input v-model="email" type="email" placeholder="email" required />

      <input v-model="password" type="password" placeholder="пароль" required />

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

      <button type="submit" class="btn-auth">Войти</button>
      
      <p class="link-text">
        Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/components/auth"
</style>