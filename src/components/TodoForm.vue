<template>
  <div class="add-task">
    <input
      v-model="newTaskTitle"
      class="inputtask"
      type="text"
      placeholder="New task"
      @keyup.enter="onAdd"
    />
    <button class="barbtn-add" title="Add" @click="onAdd">
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="currentColor"/>
            <path d="M24 16C24 15.4477 24.4477 15 25 15C25.5523 15 26 15.4477 26 16V22H32C32.5523 22 33 22.4477 33 23C33 23.5523 32.5523 24 32 24H26V30C26 30.5523 25.5523 31 25 31C24.4477 31 24 30.5523 24 30V24H18C17.4477 24 17 23.5523 17 23C17 22.4477 17.4477 22 18 22H24V16Z" fill="currentColor"/>
        </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';

const emit = defineEmits(['add']);
const newTaskTitle = ref('');

function onAdd() {
  const title = newTaskTitle.value.trim();
  if (!title) return;
  emit('add', title);
  newTaskTitle.value = '';
}
</script>

<style scoped>
@import "../scss/components/_buttons.scss";
</style>
