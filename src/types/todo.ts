export interface Subtask {
  text: string
  completed: boolean
}

export interface Task {
  id: number
  userId: number
  title: string
  completed: boolean
  subtasks: Subtask[]
  notes: string[]
  timeSpent?: number
}
