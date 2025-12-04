<template>
  <ul class="todo-list">
    <li
      v-for="task in tasks"
      :key="task.id"
      :class="[
        { 'is-done': task.completed },
        { 'is-selected': task.id === selectedTaskId }
      ]"
      @click="$emit('select', task.id)"
    >
      <input
        type="checkbox"
        class="task-check"
        :checked="task.completed"
        @change="$emit('toggle', task.id)"
        @click.stop
      />
      <span class="task-title">{{ task.title }}</span>
      <button
        class="remove-btn"
        aria-label="Remove item"
        @click.stop="$emit('remove', task.id)"
      ></button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Task } from '../types/todo'

defineProps<{
  tasks: Task[]
  selectedTaskId?: number | null
}>()

defineEmits<{
  (e: 'remove', id: number): void
  (e: 'toggle', id: number): void
  (e: 'select', id: number): void
}>()
</script>

<style scoped>
@import '../scss/components/_lists.scss';
@import '../scss/components/_done-tasks.scss';
</style>
