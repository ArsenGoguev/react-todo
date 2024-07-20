import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import './taskTimer.css'
import {
  setItemInStorage, setArrayInStorage, getItemFromStorage, getArrayFromStorage
} from '../../../../service/SessionStorage.js'

export default function TaskTimer({ task }) {
  const getTime = useCallback(() => Math.ceil(performance.now() / 1000), [])
  const status = getItemFromStorage(`${task.id}_status`)

  const [remainingTime, setRemainingTime] = useState(() => {
    const savedTime = getItemFromStorage(`${task.id}_remainingTime`)
    const lastNow = getItemFromStorage(`${task.id}_saved`)

    if (getItemFromStorage('startedTasks')) {
      const startedTasks = getArrayFromStorage('startedTasks')
      if (startedTasks.includes(task.id)) {
        const result = savedTime - (getTime() - lastNow)
        return result > 0 ? result : 0
      }
    }
    return savedTime ? Number(savedTime) : task.time
  })

  useEffect(() => {
    if (remainingTime <= 0) return setItemInStorage(`${task.id}_status`, '')
    if (!status) return

    const startTime = getTime()
    const timer = setInterval(() => {
      const elapsedTime = getTime() - startTime
      setRemainingTime((prevTime) => prevTime - elapsedTime)
    }, 1000)

    return () => {
      setItemInStorage(`${task.id}_remainingTime`, remainingTime)
      setItemInStorage(`${task.id}_saved`, getTime())
      clearInterval(timer)
    }
  }, [status, remainingTime]) // eslint-disable-line

  const toggleTimer = useCallback((value) => {
    if (remainingTime > 0) {
      setItemInStorage(`${task.id}_status`, value)

      if (value) {
        setItemInStorage(`${task.id}_remainingTime`, remainingTime - getTime())
        setItemInStorage(`${task.id}_saved`, getTime())

        if (Number(getItemFromStorage(`${task.id}_remainingTime`)) <= 0) return
        if (getItemFromStorage('startedTasks')) {
          const startedTasks = getArrayFromStorage('startedTasks')
          if (startedTasks.includes(task.id)) return
          setArrayInStorage('startedTasks', [...startedTasks, task.id])
        } else {
          setArrayInStorage('startedTasks', [task.id])
        }
      }

      if (!value && remainingTime > 0) {
        const startedTasks = getArrayFromStorage('startedTasks')
        if (!startedTasks.includes(task.id)) return
        setArrayInStorage('startedTasks', startedTasks.toSpliced(startedTasks.indexOf(task.id), 1))
      }
    }
  }, [getTime, remainingTime, task.id])

  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60
  let disabled = false
  if (task.taskStatus === 'completed') disabled = true

  return (
    <span className="description timer">
      <button type="button" disabled={disabled} onClick={() => toggleTimer('started')} className="icon-play" />
      <button type="button" disabled={disabled} onClick={() => toggleTimer('')} className="icon-pause" />
      <span className="description">{`${minutes}:${seconds}`}</span>
    </span>
  )
}

TaskTimer.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    taskStatus: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    checked: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired
  }).isRequired
}
