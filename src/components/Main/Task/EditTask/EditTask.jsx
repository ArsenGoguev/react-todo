import React, {
  useContext, useState, useEffect, useRef, useCallback
} from 'react'

import './editTask.css'
import { TodoAppContext, TodoListContext } from '../../../Context/TodoContext.js'

export default function EditTask() {
  const { tasks, setTasks } = useContext(TodoAppContext)
  const { task } = useContext(TodoListContext)

  const [description, setDescription] = useState(task.description)
  const inputRef = useRef(null)

  const updateTaskInList = useCallback((updatedTask) => {
    const idx = tasks.findIndex((el) => el.id === task.id)
    setTasks([...tasks.slice(0, idx), updatedTask, ...tasks.slice(idx + 1)])
  }, [tasks, task.id, setTasks])

  const onSubmitDescription = (event) => {
    event.preventDefault()
    const item = { ...task, description: description.length > 0 ? description : task.description }
    item.taskStatus = item.taskStatus.replace(' editing', '')
    updateTaskInList(item)
  }

  const onChangeDescription = (event) => {
    setDescription(event.target.value)
  }

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
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
