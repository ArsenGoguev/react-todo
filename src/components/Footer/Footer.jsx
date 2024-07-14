import PropTypes from 'prop-types'
import React from 'react'

import TasksFilter from './TasksFilter/TasksFilter.jsx'

import './footer.css'

export default function Footer({ activeCount, tasks, setTasks, setActiveShowButton }) {
  function onClear() {
    const result = tasks.filter((item) => item.taskStatus !== 'completed')
    setTasks(result)
  }

  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <TasksFilter setActiveShowButton={setActiveShowButton} />
      <button type='button' className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  setTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeCount: PropTypes.number.isRequired,
  setActiveShowButton: PropTypes.func.isRequired,
}
