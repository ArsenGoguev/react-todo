import React, { useContext, useCallback } from 'react'

import './taskList.css'
import Task from '../Task/Task.jsx'
import { TodoAppContext } from '../../Context/TodoContext.js'

export default function TaskList() {
  const { tasks, setTasks, activeShowButton } = useContext(TodoAppContext)

  const onDeleted = useCallback(
    (id) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const result = tasks.toSpliced(idx, 1)

      setTasks(result)
    },
    [tasks, setTasks]
  )

  const onCompleted = useCallback(
    (id) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const item = tasks[idx]

      if (item.checked !== true) {
        item.taskStatus = 'completed'
        item.checked = true
      } else {
        item.taskStatus = ''
        item.checked = false
      }

      setTasks([...tasks.slice(0, idx), item, ...tasks.slice(idx + 1)])
    },
    [tasks, setTasks]
  )

  const onEdit = useCallback(
    (id) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const item = tasks[idx]

      item.taskStatus += ' editing'

      setTasks([...tasks.slice(0, idx), item, ...tasks.slice(idx + 1)])
    },
    [tasks, setTasks]
  )

  const getComponent = (todo) => (
    <Task
      key={todo.id}
      id={todo.id}
      task={todo}
      onDeleted={() => onDeleted(todo.id)}
      onCompleted={() => onCompleted(todo.id)}
      onEdit={() => onEdit(todo.id)}
      tasks={tasks}
      setTasks={setTasks}
    />
  )

  const filterTasks = () => {
    switch (activeShowButton) {
    case 'Active':
      return tasks.filter((el) => el.taskStatus === '').map((todo) => getComponent(todo))
    case 'Completed':
      return tasks.filter((el) => el.taskStatus === 'completed').map((todo) => getComponent(todo))
    default:
      return tasks.map((todo) => getComponent(todo))
    }
  }

  return (
    <section className="main">
      <ul className="todo-list">{filterTasks()}</ul>
    </section>
  )
}
