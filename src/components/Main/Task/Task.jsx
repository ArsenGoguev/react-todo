import React, { useEffect, useState, useMemo } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'
import { TodoListContext } from '../../Context/TodoContext.js'

import EditTask from './EditTask/EditTask.jsx'
import TaskTimer from './TaskTimer/TaskTimer.jsx'

export default function Task({
  task, onDeleted, onCompleted, onEdit
}) {
  const [timerStatus, setTimerStatus] = useState(sessionStorage.getItem(`${task.id}_status`) ? sessionStorage.getItem(`${task.id}_status`) : false)
  const [date, setDate] = useState(() => {
    formatDistanceToNowStrict(task.date, { includeSeconds: true })
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(() => formatDistanceToNowStrict(task.date, { includeSeconds: true }))
    }, 1000)
    return () => clearInterval(interval)
  }, [task.date])

  const taskContextValue = useMemo(
    () => ({
      task,
      timerStatus,
      setTimerStatus
    }),
    [task, timerStatus]
  )

  const onDestroyTask = () => {
    onDeleted()
  }

  const onCompleteTask = () => {
    onCompleted()
  }

  return (
    <TodoListContext.Provider value={taskContextValue}>
      <li className={task.taskStatus}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={onCompleteTask}
            defaultChecked={task.checked}
          />
          <label>
            <span className="title">{task.description}</span>
            <TaskTimer time={task.time} taskID={task.id} />
            <span className="description">{`created ${date} ago`}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEdit} />
          <button type="button" className="icon icon-destroy" onClick={onDestroyTask} />
        </div>
        <EditTask />
      </li>
    </TodoListContext.Provider>
  )
}

Task.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    taskStatus: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    checked: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired
  }).isRequired
}
