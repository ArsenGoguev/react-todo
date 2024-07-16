import React, { useState, useContext } from 'react'
import './newTaskForm.css'

import { TodoAppContext } from '../../Context/TodoContext.js'

export default function NewTaskForm() {
  const { tasks, setTasks } = useContext(TodoAppContext)
  const [taskName, setTaskName] = useState('')
  const [minValue, setMinValue] = useState('')
  const [secValue, setSecValue] = useState('')

  function onChangeName(e) {
    setTaskName(e.target.value)
  }

  function onChangeMin(e) {
    setMinValue(e.target.value)
  }

  function onChangeSec(e) {
    setSecValue(e.target.value)
  }

  function onSubmit(event) {
    event.preventDefault()

    if (taskName && minValue && secValue) {
      const newTask = {
        id: new Date().getTime(),
        description: taskName,
        taskStatus: '',
        checked: false,
        date: new Date(),
        time: Number(minValue) * 60 + Number(secValue)
      }
      const result = [...tasks, newTask]
      setTasks(result)
    } else return

    setTaskName('')
    setMinValue('')
    setSecValue('')
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input className="new-todo" placeholder="Task" onChange={onChangeName} value={taskName} autoFocus />
      <input className="new-todo-form__timer" min={0} max={999} onChange={onChangeMin} value={minValue} placeholder="Min" type='number' />
      <input className="new-todo-form__timer" min={1} max={60} onChange={onChangeSec} value={secValue} placeholder="Sec" type='number' />
      <button type="submit" />
    </form>
  )
}
