<template>
  <div
    v-if="isOpen"
    class="modal"
    :class="{ 'is-open': isOpen }"
    @click.self="close"
  >
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

<script setup lang="ts">
defineProps<{ isOpen: boolean }>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'close'): void
}>()

const confirmDelete = () => {
  emit('confirm')
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
@import '../scss/components/_modal.scss';
</style>
