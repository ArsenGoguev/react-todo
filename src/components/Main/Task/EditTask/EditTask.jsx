import React, { useContext, useState } from 'react'

import './editTask.css'
import { TodoListContext } from '../../../Context/TodoContext.js'

export default function EditTask() {
  const { task, tasks, setTasks } = useContext(TodoListContext)
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
