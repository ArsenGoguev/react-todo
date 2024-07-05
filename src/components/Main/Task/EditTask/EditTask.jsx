import PropTypes from 'prop-types'
import React, { useState } from 'react'

import './editTask.css'

export default function EditTask({ task, tasks, setTasks }) {
  const [description, setDescription] = useState(task.description)

  function onSubmitDescription(event) {
    event.preventDefault()

    const idx = tasks.findIndex((el) => el.id === task.id)
    const item = tasks[idx]

    if (description.length > 0) {
      item.description = description
    } else {
      item.description = task.description
      setDescription(task.description)
    }

    item.taskStatus = item.taskStatus.replace(' editing', '')

    setTasks([...tasks.slice(0, idx), item, ...tasks.slice(idx + 1)])
  }

  function onChangeDescription(event) {
    setDescription(event.target.value)
  }

  return (
    <form onSubmit={onSubmitDescription}>
      <input className="edit" value={description} onChange={onChangeDescription} autoFocus />
    </form>
  )
}

EditTask.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTasks: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    taskStatus: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
}
