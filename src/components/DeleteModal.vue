<template>
  <div class="modal" v-if="isOpen" :class="{ 'is-open': isOpen }" @click.self="close">
    <div class="modal-content">
      <h3>Delete Task</h3>
      <p>Information about the task cannot be restored. Are you sure?</p>
      <div class="modal-buttons">
        <button class="btn btn--danger" @click="confirmDelete">Delete</button>
        <button class="btn btn--ghost" @click="close">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean
});
const emit = defineEmits(['confirm', 'close']);

function confirmDelete() {
  emit('confirm');
}

function close() {
  emit('close');
}
</script>

<style scoped>
@import "../scss/components/_modal.scss";
</style>