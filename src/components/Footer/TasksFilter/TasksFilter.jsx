import React, { useContext, useState } from 'react'

import './tasksFilter.css'
import { TodoAppContext } from '../../Context/TodoContext.js'

export default function TasksFilter() {
  const { setActiveShowButton } = useContext(TodoAppContext)
  const [selectedButton, setSelectedButton] = useState('all')

  const onFilterChange = (filter) => {
    setSelectedButton(filter)
    setActiveShowButton(filter)
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
