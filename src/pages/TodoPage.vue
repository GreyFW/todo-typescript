<template>
  <Header @add="handleAddTask" />

  <div class="board">
    <!-- Tasks -->
    <div id="todo-list" class="card">
      <h2 class="card__title">Tasks</h2>
      <!-- Берем задачи из стора -->
      <TodoList
        :tasks="todoStore.tasks"
        :selected-task-id="selectedTaskId"
        @select="selectTask"
        @remove="showDeleteModal"
        @toggle="handleToggle"
      />
    </div>

    <!-- Current Task Details -->
    <div class="card">
      <TodoDetails
        v-if="currentTask"
        :task="currentTask"
        @update="handleAutoSave"
      />
      <div v-else id="no-task-selected" class="no-task-selected">
        Choose or create a task
      </div>
    </div>

    <!-- Done Tasks -->
    <div id="done-list" class="card">
      <h2 class="card__title">Done</h2>
      <!-- Берем выполненные из стора -->
      <TodoList
        :tasks="todoStore.completed"
        :selected-task-id="selectedTaskId"
        @select="selectTask"
        @remove="showDeleteModal"
        @toggle="handleUncomplete"
      />
    </div>

    <!-- Modal -->
    <DeleteModal
      :is-open="modal.open"
      @confirm="confirmDelete"
      @close="closeDeleteModal"
    />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import TodoList from '../components/TodoList.vue'
import TodoDetails from '../components/TodoDetails.vue'
import DeleteModal from '../components/DeleteModal.vue'

import { ref, reactive, computed } from 'vue'
import { useTodoStore } from '../stores/todo'
import type { Task } from '../types/todo'

const todoStore = useTodoStore()

const selectedTaskId = ref<number | null>(null)

interface ModalState {
  open: boolean
  id: number | null
}
const modal = reactive<ModalState>({ open: false, id: null })

function handleAddTask(title: string) {
  const newId = todoStore.addTask(title)
  if (newId) selectedTaskId.value = newId
}

function selectTask(id: number) {
  selectedTaskId.value = id
}

function showDeleteModal(id: number) {
  modal.open = true
  modal.id = id
}

function confirmDelete() {
  if (modal.id !== null) {
    todoStore.deleteTask(modal.id)

    if (selectedTaskId.value === modal.id) {
      selectedTaskId.value = null
    }
  }
  closeDeleteModal()
}

function closeDeleteModal() {
  modal.open = false
  modal.id = null
}

// переключаем задачу сделано/не сделано (check)
function handleToggle(id: number) {
  todoStore.toggleComplete(id)
  if (selectedTaskId.value === id) selectedTaskId.value = null
}

function handleUncomplete(id: number) {
  todoStore.uncompleteTask(id)
}

const currentTask = computed<Task | undefined>(() => {
  return todoStore.allTasks.find((t) => t.id === selectedTaskId.value)
})

function handleAutoSave() {}
</script>

<style>
@import '../scss/main.scss';
</style>
