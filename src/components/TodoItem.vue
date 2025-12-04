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

<script setup>
import { reactive, watch, ref, computed } from 'vue';

defineProps({
  task: Object,
  selected: Boolean
});
const emit = defineEmits(['remove', 'toggle']);

function onRemove() {
  emit('remove', task.id);
}
function onToggle() {
  emit('toggle', task.id);
}
</script>

<style scoped>
@import "../scss/components/_todo.scss";
</style>