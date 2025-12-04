<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')

function handleRegister() {
    errorMsg.value = ''

    if (!email.value || !password.value) {
        errorMsg.value = 'Заполните все поля'
        return
    }
    if (password.value.length < 4) {
        errorMsg.value = 'Пароль слишком короткий'
        return
    }
    if (password.value !== confirmPassword.value) {
        errorMsg.value = 'Пароли не совпадают'
        return
    }

    try {
        userStore.register(email.value, password.value)
        router.push('/login')
    } catch (e) {
        errorMsg.value = e.message
    }
}
</script>

<template>
    <div class="auth-container">
        <h1>Регистрация</h1>
        <form @submit.prevent="handleRegister" class="auth-form">

            <div class="inputs-required">
                <div class="label-plus-input">
                    <label>Email</label>
                    <input v-model="email" type="email" placeholder="example@mail.com" required />
                </div>

                <div class="label-plus-input">
                    <label>Пароль</label>
                    <input v-model="password" type="password" placeholder="******" required />
                </div>

                <div class="label-plus-input">
                    <label>Повторите пароль</label>
                    <input v-model="confirmPassword" type="password" placeholder="******" required />
                </div>
            </div>

            <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
            <button type="submit" class="btn-auth">Создать аккаунт</button>
            <p class="link-text">
                Уже есть аккаунт? <router-link to="/login">Войти</router-link>
            </p>
        </form>
    </div>
</template>

<style scoped lang="scss">
@import "../scss/components/auth";
</style>