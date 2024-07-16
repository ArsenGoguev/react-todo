import React, { useContext } from 'react'
import './footer.css'

import { TodoAppContext } from "../Context/TodoContext.js"

import TasksFilter from './TasksFilter/TasksFilter.jsx'

export default function Footer() {
  const { activeCount, tasks, setTasks } = useContext(TodoAppContext)

  function onClear() {
    const result = tasks.filter((item) => item.taskStatus !== 'completed')
    setTasks(result)
  }

  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <TasksFilter />
      <button type='button' className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  )
}
