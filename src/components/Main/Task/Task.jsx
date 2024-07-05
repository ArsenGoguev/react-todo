import React, { useEffect, useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import PropTypes from 'prop-types'

import EditTask from './EditTask/EditTask.jsx'

import './task.css'

export default function Task({ task, tasks, setTasks, onDeleted, onCompleted, onEdit }) {
  const [date, setDate] = useState(() => formatDistanceToNowStrict(task.date, { includeSeconds: true }))

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(() => formatDistanceToNowStrict(task.date, { includeSeconds: true }))
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <li className={task.taskStatus}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCompleted} defaultChecked={task.checked} />
        <label>
          <span className="description">{task.description}</span>
          <span className="created">created {date} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEdit} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <EditTask task={task} tasks={tasks} setTasks={setTasks} />
    </li>
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
  }).isRequired,
}