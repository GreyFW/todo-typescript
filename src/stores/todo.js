import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user' 

export const useTodoStore = defineStore('todo', () => {
  const userStore = useUserStore()
  
  // Храним задачи ВСЕХ пользователей в одной куче (имитация БД)
  const allTasks = ref([]) 


  // Возвращают задачи только текущего залогиненного пользователя
  const tasks = computed(() => {
    if (!userStore.currentUser) return []
    return allTasks.value.filter(t => t.userId === userStore.currentUser.id && !t.completed)
  })
  const completed = computed(() => {
    if (!userStore.currentUser) return []
    return allTasks.value.filter(t => t.userId === userStore.currentUser.id && t.completed)
  })


  function addTask(title) {
    if (!userStore.currentUser) return null

    const newTask = {
      id: Date.now(),
      userId: userStore.currentUser.id, // !!! Привязываем задачу к юзеру
      title,
      completed: false,
      subtasks: [],
      notes: [],
      timeSpent: 0
    }
    
    allTasks.value.push(newTask)
    return newTask.id
  }

  function deleteTask(id) {
    // Ищем задачу в общем массиве и удаляем
    const idx = allTasks.value.findIndex(t => t.id === id)
    if (idx !== -1) allTasks.value.splice(idx, 1)
  }

  function toggleComplete(id) {
    const task = allTasks.value.find(t => t.id === id)
    if (task) {
      task.completed = true
    }
  }

  function uncompleteTask(id) {
    const task = allTasks.value.find(t => t.id === id)
    if (task) {
      task.completed = false
    }
  }

  return { 
    allTasks,
    tasks, completed, // используем в компонентах
    addTask, deleteTask, toggleComplete, uncompleteTask 
  }
}, {
  persist: true // автосохр
})