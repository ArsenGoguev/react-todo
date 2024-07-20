import React, { useEffect, useState, useCallback } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'
import { getArrayFromStorage, setArrayInStorage, setItemInStorage } from '../../../service/SessionStorage.js'

import EditTask from './EditTask/EditTask.jsx'
import TaskTimer from './TaskTimer/TaskTimer.jsx'

export default function Task({
  task, onDeleted, onCompleted, onEdit
}) {
  const [date, setDate] = useState(formatDistanceToNowStrict(task.date, { includeSeconds: true }))

  useEffect(() => {
    const updateDate = () => setDate(formatDistanceToNowStrict(task.date, { includeSeconds: true }))
    const interval = setInterval(updateDate, 1000)
    return () => clearInterval(interval)
  }, [task.date])

  const manageTask = useCallback((func) => {
    const startedTasks = getArrayFromStorage('startedTasks')
    const index = startedTasks.indexOf(task.id)

    if (index !== -1) {
      startedTasks.splice(index, 1)
      setArrayInStorage('startedTasks', startedTasks)
    }
    setItemInStorage(`${task.id}_status`, '')
    func()
  }, [task.id])

  return (
    <li className={task.taskStatus}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={() => manageTask(onCompleted)}
          defaultChecked={task.checked}
        />
        <label>
          <span className="title">{task.description}</span>
          <TaskTimer task={task} />
          <span className="description">{date ? `created ${date} ago` : 'loading...'}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEdit} />
        <button type="button" className="icon icon-destroy" onClick={() => manageTask(onDeleted)} />
      </div>
      <EditTask task={task} />
    </li>
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
