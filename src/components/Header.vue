<template>
  <header class="header">
    <h1 class="header__title">TODO LIST</h1>
    <div class="header__bar">
      <button class="btn btn__toggle-theme" title="Toggle theme" @click="toggleTheme">
        <!-- Light: moon -->
        <svg v-if="theme === 'light'" class="toggle__moon-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
        <!-- Dark: sun -->
        <svg class="toggle__sun-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="5" />
            <g stroke-linecap="round">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
        </svg>
      </button>
      <div class="header__bar__add-task">
        <input
          class="input__task"
          type="text"
          placeholder="New task"
          v-model="newTaskTitle"
          @keyup.enter="onAdd"
        />
        <button class="bar__btn-add" title="Add" @click="onAdd">
          <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="currentColor"/>
            <path d="M24 16C24 15.4477 24.4477 15 25 15C25.5523 15 26 15.4477 26 16V22H32C32.5523 22 33 22.4477 33 23C33 23.5523 32.5523 24 32 24H26V30C26 30.5523 25.5523 31 25 31C24.4477 31 24 30.5523 24 30V24H18C17.4477 24 17 23.5523 17 23C17 22.4477 17.4477 22 18 22H24V16Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const theme = ref('light');
const newTaskTitle = ref('');

const emit = defineEmits(['add']);

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme.value);
  localStorage.setItem('theme', theme.value);
}

function onAdd() {
  const title = newTaskTitle.value.trim();
  if (!title) return;
  emit('add', title);
  newTaskTitle.value = '';
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  theme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
});
</script>

<style scoped>
@import "../scss/components/_header.scss";
</style>