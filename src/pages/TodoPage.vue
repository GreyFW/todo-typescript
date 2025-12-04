<script setup>
import Header from '../components/Header.vue'
import TodoList from '../components/TodoList.vue'
import TodoDetails from '../components/TodoDetails.vue'
import DeleteModal from '../components/DeleteModal.vue'

import { ref, reactive, computed } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()

const selectedTaskId = ref(null)
const modal = reactive({ open: false, id: null })

function handleAddTask(title) {
    const newId = todoStore.addTask(title)
    if (newId) selectedTaskId.value = newId
}

function selectTask(id) {
    selectedTaskId.value = id
}

function showDeleteModal(id) {
    modal.open = true
    modal.id = id
}

function confirmDelete() {
    todoStore.deleteTask(modal.id)

    if (selectedTaskId.value === modal.id) {
        selectedTaskId.value = null
    }

    closeDeleteModal()
}

function closeDeleteModal() {
    modal.open = false
    modal.id = null
}

// переключаем задачу сделано/не сделано (check)
function handleToggle(id) {
    todoStore.toggleComplete(id)
    if (selectedTaskId.value === id) selectedTaskId.value = null
}
function handleUncomplete(id) {
    todoStore.uncompleteTask(id)
}

const currentTask = computed(() => {
    return todoStore.allTasks.find(t => t.id === selectedTaskId.value) || null
})

function handleAutoSave() {
    // пустота тк pinia сама всё делает с помощью persist
}
</script>

<template>
  <Header @add="handleAddTask" />
  
  <div class="board">
    <!-- Tasks -->
    <div class="card" id="todo-list">
      <h2 class="card__title">Tasks</h2>
      <!-- Берем задачи из стора -->
      <TodoList
        :tasks="todoStore.tasks"
        :selectedTaskId="selectedTaskId"
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
      <div v-else class="no-task-selected" id="no-task-selected">
        Choose or create a task
      </div>
    </div>

    <!-- Done Tasks -->
    <div class="card" id="done-list">
      <h2 class="card__title">Done</h2>
      <!-- Берем выполненные из стора -->
      <TodoList
        :tasks="todoStore.completed"
        :selectedTaskId="selectedTaskId"
        @select="selectTask"
        @remove="showDeleteModal"
        @toggle="handleUncomplete"
      />
    </div>

    <!-- Modal -->
    <DeleteModal
      :isOpen="modal.open"
      @confirm="confirmDelete"
      @close="closeDeleteModal"
    />
  </div>
</template>

<style>
@import "../scss/main.scss";
</style>