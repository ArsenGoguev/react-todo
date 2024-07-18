import React, { useContext, useState } from 'react'

import './tasksFilter.css'
import { TodoAppContext } from '../../Context/TodoContext.js'

export default function TasksFilter() {
  const { setActiveShowButton, tasks, setTasks } = useContext(TodoAppContext)
  const [selectedButton, setSelectedButton] = useState('all')

  const onFilterChange = (filter) => {
    setSelectedButton(filter)
    setActiveShowButton(filter.charAt(0).toUpperCase() + filter.slice(1))

    if ((filter === 'all' || filter === 'active') && sessionStorage.getItem('taskIDs')) {
      JSON.parse(sessionStorage.getItem('taskIDs')).forEach((element) => {
        const idx = tasks.findIndex((el) => el.id === element)
        const item = tasks[idx]

        const lastTime = item.time
        const currentTime = Date.parse(new Date()) / 1000
        const savedTime = Number(sessionStorage.getItem(element)) / 1000
        item.time = lastTime - (currentTime - savedTime)

        setTasks([...tasks.slice(0, idx), item, ...tasks.slice(idx + 1)])
      })
    }
  }

  return (
    <ul className="filters">
      {['all', 'active', 'completed'].map((filter) => (
        <li key={filter}>
          <button
            type="button"
            className={selectedButton === filter ? 'selected' : ''}
            onClick={() => onFilterChange(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        </li>
      ))}
    </ul>
  )
}
