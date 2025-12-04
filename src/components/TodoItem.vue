<template>
  <li :class="[{ 'is-done': task.completed }, { 'is-selected': selected }]">
    <input
      type="checkbox"
      class="task-check"
      v-model="task.completed"
      @change="onToggle"
    />
    <span class="task-title">{{ task.title }}</span>
    <button class="remove-btn" aria-label="Remove item" @click.stop="onRemove">
      &times;
    </button>
  </li>
</template>

<script setup lang="ts">
import type { Task } from '../types/todo' 

const props = defineProps<{
  task: Task
  selected: boolean
}>()

const emit = defineEmits<{
  (e: 'remove', id: number): void
  (e: 'toggle', id: number): void
}>()

const onRemove = () => {
  emit('remove', props.task.id)
}

const onToggle = () => {
  emit('toggle', props.task.id)
}
</script>


<style scoped>
@import "../scss/components/_todo.scss";
</style>