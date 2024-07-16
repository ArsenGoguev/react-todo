import React, { useState, useEffect, useContext } from 'react'

import './taskList.css'
import Task from '../Task/Task.jsx'
import { TodoAppContext } from '../../Context/TodoContext.js'

export default function TaskList() {
  const { tasks, setTasks, activeShowButton } = useContext(TodoAppContext)
  const [showedTasks, setShowedTasks] = useState(tasks)

  useEffect(() => {
    if (activeShowButton === 'All') {
      setShowedTasks(tasks)
    } else if (activeShowButton === 'Active') {
      const arr = tasks.filter((el) => el.taskStatus === '')
      setShowedTasks(arr)
    } else if (activeShowButton === 'Completed') {
      const arr = tasks.filter((el) => el.taskStatus === 'completed')
      setShowedTasks(arr)
    }
  }, [tasks, activeShowButton])

  function onDeleted(id) {
    const idx = tasks.findIndex((el) => el.id === id)
    const result = tasks.toSpliced(idx, 1)

    setTasks(result)
  }

  function onCompleted(id) {
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
  }

  function onEdit(id) {
    const idx = tasks.findIndex((el) => el.id === id)
    const item = tasks[idx]

    item.taskStatus += ' editing'

    setTasks([...tasks.slice(0, idx), item, ...tasks.slice(idx + 1)])
  }

  const todos = showedTasks.map((todo) => (
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
  ))

  return (
    <section className="main">
      <ul className="todo-list">{todos}</ul>
    </section>
  )
}
