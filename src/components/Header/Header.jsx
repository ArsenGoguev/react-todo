import React from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from './NewTaskForm/NewTaskForm.jsx'

import './header.css'

export default function Header({ tasks, setTasks }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm tasks={tasks} setTasks={setTasks} />
      <div className="toggle-all" />
    </header>
  )
}

Header.propTypes = {
  setTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
}
