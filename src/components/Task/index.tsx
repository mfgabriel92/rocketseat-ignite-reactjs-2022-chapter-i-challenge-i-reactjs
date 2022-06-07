import { Trash } from 'phosphor-react'
import styles from './Task.module.scss'

interface TaskProps {
  task: {
    id: string,
    title: string;
    isCompleted: boolean;
  },
  onCompleteTask: (id: string) => void
  onDeleteTask: (id: string) => void
}

function Task({ task, onCompleteTask, onDeleteTask }: TaskProps) {
  return (
    <div className={styles.task}>
      <input type="checkbox" onChange={() => onCompleteTask(task.id)} />
      <p className={task.isCompleted ? styles.completed : ''}>{task.title}</p>
      <Trash size={24} onClick={() => onDeleteTask(task.id)} />
    </div>
  )
}

export { Task }