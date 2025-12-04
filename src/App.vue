<script setup>
import { useUserStore } from './stores/user'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const router = useRouter()

const { currentUser } = storeToRefs(userStore)

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header>
    <nav>
      <router-link to="/">todo</router-link>
      <router-link to="/about">about</router-link>

      <!-- Не авторизован: -->
      <template v-if="!currentUser">
        <router-link to="/login">log-in</router-link>
        <router-link to="/register">register</router-link>
      </template>
      <template v-else>
        <span class="user-email">{{ currentUser.email }}</span>
        <a href="#" @click.prevent="handleLogout" class="logout-btn">logout</a>
      </template>
    </nav>
  </header>

  <main>
    <!-- подстановка страниц -->
    <router-view />
  </main>
</template>

<style lang="scss">
@import "./scss/components/nav";
</style>