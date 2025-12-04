import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import type { Task } from '../types/todo'

export const useTodoStore = defineStore(
  'todo',
  () => {
    const userStore = useUserStore()

    const allTasks = ref<Task[]>([])

    // Возвращают задачи только текущего залогиненного пользователя
    const tasks = computed<Task[]>(() => {
      if (!userStore.currentUser) return []
      return allTasks.value.filter(
        (t) => t.userId === userStore.currentUser!.id && !t.completed
      )
    })

    const completed = computed<Task[]>(() => {
      if (!userStore.currentUser) return []
      return allTasks.value.filter(
        (t) => t.userId === userStore.currentUser!.id && t.completed
      )
    })

    function addTask(title: string): number | null {
      if (!userStore.currentUser) return null

      const newTask: Task = {
        id: Date.now(),
        userId: userStore.currentUser.id,
        title,
        completed: false,
        subtasks: [],
        notes: [],
        timeSpent: 0
      }

      allTasks.value.push(newTask)
      return newTask.id
    }

    function deleteTask(id: number) {
      // Ищем задачу в общем массиве и удаляем
      const idx = allTasks.value.findIndex((t) => t.id === id)
      if (idx !== -1) allTasks.value.splice(idx, 1)
    }

    function toggleComplete(id: number) {
      const task = allTasks.value.find((t) => t.id === id)
      if (task) {
        task.completed = true
      }
    }

    function uncompleteTask(id: number) {
      const task = allTasks.value.find((t) => t.id === id)
      if (task) {
        task.completed = false
      }
    }

    return {
      allTasks,
      tasks,
      completed,
      addTask,
      deleteTask,
      toggleComplete,
      uncompleteTask
    }
  },
  {
    persist: true // автосохр
  }
)
