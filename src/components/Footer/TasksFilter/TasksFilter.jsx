import React, { useContext, useState } from 'react'

import './tasksFilter.css'
import { TodoAppContext } from '../../Context/TodoContext.js'

export default function TasksFilter() {
  const { setActiveShowButton } = useContext(TodoAppContext)

  const [selectedButton, setSelectedButton] = useState({
    all: 'selected',
    active: '',
    completed: '',
  })

  function onShowAll() {
    setSelectedButton({
      all: 'selected',
      active: '',
      completed: '',
    })
    setActiveShowButton('All')
  }

  function onShowActive() {
    setSelectedButton({
      all: '',
      active: 'selected',
      completed: '',
    })
    setActiveShowButton('Active')
  }

  function onShowCompleted() {
    setSelectedButton({
      all: '',
      active: '',
      completed: 'selected',
    })
    setActiveShowButton('Completed')
  }

  return (
    <ul className="filters">
      <li>
        <button type='button' className={selectedButton.all} onClick={onShowAll}>
          All
        </button>
      </li>
      <li>
        <button type='button' className={selectedButton.active} onClick={onShowActive}>
          Active
        </button>
      </li>
      <li>
        <button type='button' className={selectedButton.completed} onClick={onShowCompleted}>
          Completed
        </button>
      </li>
    </ul>
  )
}
