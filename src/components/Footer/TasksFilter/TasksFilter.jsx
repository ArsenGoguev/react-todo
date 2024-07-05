import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './tasksFilter.css'

export default function TasksFilter({ setActiveShowButton }) {
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
        <button className={selectedButton.all} onClick={onShowAll}>
          All
        </button>
      </li>
      <li>
        <button className={selectedButton.active} onClick={onShowActive}>
          Active
        </button>
      </li>
      <li>
        <button className={selectedButton.completed} onClick={onShowCompleted}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  setActiveShowButton: PropTypes.func.isRequired,
}
