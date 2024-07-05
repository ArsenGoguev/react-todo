import PropTypes from 'prop-types'
import React, { useState } from 'react'

import './newTaskForm.css'

export default function NewTaskForm({ tasks, setTasks }) {
  const [taskName, setTaskName] = useState('')

  function onChange(e) {
    setTaskName(e.target.value)
  }

  function onSubmit(event) {
    event.preventDefault()

    if (taskName) {
      const newTask = {
        id: new Date().getTime(),
        description: taskName,
        taskStatus: '',
        checked: false,
        date: new Date(),
      }

      const result = [...tasks, newTask]

      setTasks(result)
    }

    setTaskName('')
  }

  return (
    <form onSubmit={onSubmit}>
      <input className="new-todo" placeholder="What needs to be done?" onChange={onChange} value={taskName} autoFocus />
    </form>
  )
}

NewTaskForm.propTypes = {
  setTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
}
