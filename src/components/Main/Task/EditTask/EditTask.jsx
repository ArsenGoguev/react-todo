import React, {
  useContext, useState, useEffect, useRef, useCallback
} from 'react'
import PropTypes from 'prop-types'

import './editTask.css'
import { TodoAppContext } from '../../../Context/TodoContext.js'

export default function EditTask({ task }) {
  const { tasks, setTasks } = useContext(TodoAppContext)
  const [description, setDescription] = useState(task.description)
  const inputRef = useRef(null)

  const updateTaskInList = useCallback((updatedTask) => {
    const idx = tasks.findIndex((el) => el.id === task.id)
    setTasks([...tasks.slice(0, idx), updatedTask, ...tasks.slice(idx + 1)])
  }, [tasks, task.id, setTasks])

  const onSubmitDescription = (e) => {
    e.preventDefault()
    const item = { ...task, description: description.length > 0 ? description : task.description }
    item.taskStatus = item.taskStatus.replace(' editing', '')
    updateTaskInList(item)
  }

  const onChangeDescription = (e) => setDescription(e.target.value)

  const onCanceled = (e) => {
    if (e.key === 'Escape') {
      const item = { ...task, taskStatus: task.taskStatus.replace(' editing', '') }
      updateTaskInList(item)
      setDescription(task.description)
    }
  }

  const handleClickOutside = useCallback((event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      const item = { ...task, taskStatus: task.taskStatus.replace(' editing', '') }
      updateTaskInList(item)
      setDescription(task.description)
    }
  }, [task, updateTaskInList])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  return (
    <form onSubmit={onSubmitDescription}>
      <input
        ref={inputRef}
        className="edit"
        value={description}
        onChange={onChangeDescription}
        onKeyDown={onCanceled}
        autoFocus
      />
    </form>
  )
}

EditTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    taskStatus: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    checked: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired
  }).isRequired
}
