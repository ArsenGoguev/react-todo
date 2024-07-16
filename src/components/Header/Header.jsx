import React, { useContext } from 'react'
import './header.css'

import { TodoAppContext } from '../Context/TodoContext.js'

import NewTaskForm from './NewTaskForm/NewTaskForm.jsx'

export default function Header() {
  const { tasks, setTasks } = useContext(TodoAppContext)

  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm tasks={tasks} setTasks={setTasks} />
      <div className="toggle-all" />
    </header>
  )
}
