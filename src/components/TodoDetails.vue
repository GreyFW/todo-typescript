<template>
  <div class="task-details" v-if="task">
    <h1 class="card__title" id="current-task-header">{{ task.title }}</h1>

    <div class="subtasks">
      <h3 class="card__inner-title">Subtasks</h3>
      <ul>
        <li v-for="(subtask, idx) in task.subtasks" :key="idx">
          <input 
            type="checkbox" 
            class="subtask-check" 
            :checked="subtask.completed" 
            @change="toggleSubtask(idx)"
          />
          <span class="subtask-title">{{ subtask.text }}</span>
          <button class="remove-btn" @click="removeSubtask(idx)" aria-label="Remove subtask"></button>
        </li>
      </ul>
      <input v-model="newSubtask" class="input__inner" style="margin-top:12px;" type="text" placeholder="Add a subtask" @keyup.enter="addSubtask"/>
    </div>

    <div class="notes-section">
      <h3 class="card__inner-title">Notes</h3>
      <ul>
        <li v-for="(note, idx) in task.notes" :key="idx">
          <span class="note-title">{{ note }}</span>
          <button class="remove-btn" @click="removeNote(idx)" aria-label="Remove note"></button>
        </li>
      </ul>
      <input v-model="newNote" class="input__inner" style="margin-top:12px;" type="text" placeholder="Add a note" @keyup.enter="addNote"/>
    </div>

    <!-- TIMER -->
    <div class="timer">
      <h3 class="card__inner-title-timer">Timer</h3>
      <div class="timer__display">{{ fmtHMS(timerSeconds) }}</div>
      <div class="timer-controls">
        <button class="btn" @click="startTimer" :disabled="isRunning">
          <i class="fas fa-play"></i>
        </button>
        <button class="btn" @click="pauseTimer" :disabled="!isRunning">
          <i class="fas fa-pause"></i>
        </button>
        <button class="btn" @click="resetTimer">
          <i class="fas fa-redo"></i>
        </button>
        <button class="btn" @click="stopTimer">
          <i class="fas fa-square"></i>
        </button>
      </div>
      <div class="time-taken">
        <h4>Time taken:</h4>
        <span id="total-time-taken">{{ fmtHMS(task.timeSpent || 0) }}</span>
      </div>
    </div>
  </div>
  <div v-else class="no-task-selected">Choose or create a task</div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({ task: Object });
const emit = defineEmits(['update']);

const timerSeconds = ref(0);
const isRunning = ref(false);
let timerInterval = null;

// Сбрасываем таймер при смене задачи
watch(
  () => props.task?.id,
  () => {
    resetTimer();
  }
);

// Очищаем интервал при размонтировании
onUnmounted(() => {
  clearInterval(timerInterval);
});

// --- Timer ---
function fmtHMS(s) {
  s = Number.isFinite(s) ? s : 0;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning.value || !props.task) return;
  isRunning.value = true;
  timerInterval = setInterval(() => {
    timerSeconds.value++;
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning.value = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerSeconds.value = 0;
  isRunning.value = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning.value = false;
  if (props.task && timerSeconds.value > 0) {
    if (!Number.isFinite(props.task.timeSpent)) props.task.timeSpent = 0;
    props.task.timeSpent += timerSeconds.value;
    emit('update');
  }
  timerSeconds.value = 0;
}

const newSubtask = ref('');
const newNote = ref('');

function toggleSubtask(index) {
  if (!props.task) return;
  props.task.subtasks[index].completed = !props.task.subtasks[index].completed;
  
  if (props.task.subtasks[index].completed) {
    setTimeout(() => {
      props.task.subtasks.splice(index, 1);
      emit('update');
    }, 300);
  } else {
    emit('update');
  }
}

function addSubtask() {
  if (!newSubtask.value.trim() || !props.task) return;
  props.task.subtasks.push({ text: newSubtask.value, completed: false });
  newSubtask.value = '';
  emit('update');
}

function removeSubtask(index) {
  if (!props.task) return;
  props.task.subtasks.splice(index, 1);
  emit('update');
}

function addNote() {
  if (!newNote.value.trim() || !props.task) return;
  props.task.notes.push(newNote.value);
  newNote.value = '';
  emit('update');
}

function removeNote(index) {
  if (!props.task) return;
  props.task.notes.splice(index, 1);
  emit('update');
}
</script>

<style scoped>
@import "../scss/components/_todo.scss";
@import "../scss/components/_timer.scss";
</style>