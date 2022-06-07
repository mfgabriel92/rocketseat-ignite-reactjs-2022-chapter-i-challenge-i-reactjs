import { FormEvent, useEffect, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { Task } from '../Task'
import styles from './Todos.module.scss'
import clipboardImg from '../../assets/clipboard.svg'

interface TaskProps {
  id: string,
  title: string;
  isCompleted: boolean;
  createdAt: Date
}

function EmptyTasksList() {
  return (
    <div className={styles.empty}>
      <img src={clipboardImg} alt="" />
      <strong>You still don't have any tasks created</strong>
      <p>Create tasks and organize your todo items</p>
    </div>
  )
}

function Todos() {
  const [tasks, setTasks] = useState<TaskProps[]>([
    {
      id: "64d14df3-2709-463e-a6fa-edae722f7148",
      title: "Lorem ipsum dolor sit amet.",
      isCompleted: false,
      createdAt: new Date("2022-05-20 23:00:00")
    }
  ])
  const [todo, setTodo] = useState<string>('')

  async function handleAddNewTask(e: FormEvent) {
    e.preventDefault();

    if (!todo) {
      return;
    }

    const newTask: TaskProps = {
      id: uuid(),
      title: todo,
      isCompleted: false,
      createdAt: new Date()
    }

    setTodo('')
    setTasks([ ...tasks, newTask ])
  }

  function handleCompleteTask(id: string) {
    const allTasks = [...tasks]
    const index = allTasks.findIndex((task) => task.id === id)
    const taskToComplete = allTasks[index]

    taskToComplete.isCompleted = !taskToComplete.isCompleted;

    setTasks(allTasks)
  }

  function handleDeleteTask(id: string) {
    const allTasks = [...tasks]
    const index = allTasks.findIndex((task) => task.id === id)

    allTasks.splice(index, 1)

    setTasks(allTasks)
  }

  const isTodoInputEmpty = todo === '';
  const numberOfTasks = tasks.reduce((acc, task) => {
    acc.inTotal = tasks.length

    if (task.isCompleted) {
      acc.completed += 1
    }

    return acc; 
  }, {
    inTotal: 0,
    completed: 0
  })

  return (
    <main className={styles.todos}>
      <form className={styles.form} onSubmit={handleAddNewTask}>
        <input 
          value={todo} 
          placeholder="Add a new task" 
          onChange={(e) => setTodo(e.target.value)}
          required
        />
        <button type="submit" disabled={isTodoInputEmpty}>Create <PlusCircle size={21} /></button>
      </form>
      <div className={styles.tasks}>
        <header className={styles.summary}>
          <strong className={styles.createdTasksLabel}>
            Tasks created <span>{numberOfTasks.inTotal}</span>
          </strong>
          <strong className={styles.completedTasksLabel}>
            Completed <span>{`${numberOfTasks.completed} of ${numberOfTasks.inTotal}`}</span>
          </strong>
        </header>
        <div className={styles.tasksList}>
          {
            !tasks.length 
              ? <EmptyTasksList /> 
              : tasks.map(task => (
                <Task 
                  key={task.id} 
                  task={task} 
                  onCompleteTask={handleCompleteTask}
                  onDeleteTask={handleDeleteTask}
                />
              ))
          }
        </div>
      </div>
    </main>
  )
}

export { Todos }