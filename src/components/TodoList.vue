<template>
  <ul class="todo-list">
    <li v-for="task in tasks" :key="task.id"
        :class="[{ 'is-done': task.completed }, { 'is-selected': task.id === selectedTaskId }]"
        @click="$emit('select', task.id)">
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
        @click.stop="$emit('remove', task.id)">
      </button>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  tasks: {type: Array, required: true},
  selectedTaskId: {type: [Number, String]}
});
defineEmits(['remove','toggle','select']);
</script>

<style scoped>
@import "../scss/components/_lists.scss";
@import "../scss/components/_done-tasks.scss";
</style>