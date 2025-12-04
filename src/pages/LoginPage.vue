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

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')
const errorMsg = ref<string>('')

async function handleLogin() {
  errorMsg.value = ''

  try {
    await userStore.login(email.value, password.value)
    router.push('/')
  } catch (e: unknown) {
    if (e instanceof Error) {
      errorMsg.value = e.message
    } else {
      errorMsg.value = 'Неизвестная ошибка при входе'
    }
  }
}
</script>

<style scoped lang="scss">
@import '../scss/components/auth';
</style>
