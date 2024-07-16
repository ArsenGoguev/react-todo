import React, { useEffect, useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'
import { TodoListContext } from '../../Context/TodoContext.js'

import EditTask from './EditTask/EditTask.jsx'
import TaskTimer from './TaskTimer/TaskTimer.jsx'

export default function Task({
  task, tasks, setTasks, onDeleted, onCompleted, onEdit,
}) {
  const [date, setDate] = useState(() => {
    formatDistanceToNowStrict(task.date, { includeSeconds: true })
  })
  const [timerState, setTimerState] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(() => formatDistanceToNowStrict(task.date, { includeSeconds: true }))
    }, 1000)
    return () => clearInterval(interval)
  })

  function handleCheckbox() {
    setTimerState(false)
    onCompleted()
  }

  function handleDeleteButton() {
    setTimerState(false)
    onDeleted()
  }

  const taskContextValue = {
    task,
    tasks,
    setTasks,
    timerState,
    setTimerState,
  }

  return (
    <TodoListContext.Provider value={taskContextValue}>
      <li className={task.taskStatus}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={handleCheckbox} defaultChecked={task.checked} />
          <label>
            <span className="title">{task.description}</span>
            <TaskTimer time={task.time} taskID={task.id} />
            <span className="description">
              created
              {date}
              {' '}
              ago
            </span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEdit} />
          <button type="button" className="icon icon-destroy" onClick={handleDeleteButton} />
        </div>
        <EditTask />
      </li>
    </TodoListContext.Provider>
  )
}

Task.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTasks: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    taskStatus: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    checked: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired,
}
