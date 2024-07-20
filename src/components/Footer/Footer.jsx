import React, { useContext, useCallback } from 'react'
import './footer.css'

import { TodoAppContext } from '../Context/TodoContext.js'
import { removeItemsFromStorage } from '../../service/SessionStorage.js'

import TasksFilter from './TasksFilter/TasksFilter.jsx'

export default function Footer() {
  const { activeCount, tasks, setTasks } = useContext(TodoAppContext)

  const onClear = useCallback(() => {
    if (tasks.length === 0) return

    const completedTasks = tasks.filter((item) => item.taskStatus === 'completed')
    completedTasks.forEach((task) => removeItemsFromStorage(task.id, ['status', 'saved', 'remainingTime']))

    const result = tasks.filter((item) => item.taskStatus !== 'completed')
    setTasks(result)
  }, [tasks, setTasks])

  return (
    <footer className="footer">
      <span className="todo-count">{`${activeCount} items left`}</span>
      <TasksFilter />
      <button type="button" className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  )
}
