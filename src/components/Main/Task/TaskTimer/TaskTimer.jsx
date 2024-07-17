import React, {
  useContext, useEffect, useState, useCallback
} from 'react'
import PropTypes from 'prop-types'

import './taskTimer.css'
import { TodoListContext } from '../../../Context/TodoContext.js'

export default function TaskTimer({ time, taskID }) {
  const {
    timerState, setTimerState, setTasks, tasks
  } = useContext(TodoListContext)
  const [minutes, setMinutes] = useState(Number(time / 60).toFixed())
  const [seconds, setSeconds] = useState(time % 60)

  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) setTimerState(false)
    if (!timerState) return

    const timer = setInterval(() => {
      decrementSeconds()
    }, 1000)
    saveTime(taskID, minutes, seconds)
    return () => clearInterval(timer) // eslint-disable-line consistent-return
  }, [timerState, minutes, seconds]) // eslint-disable-line

  const decrementMinutes = useCallback(() => {
    setSeconds(59)
    setMinutes((prevMinutes) => prevMinutes - 1)
  }, [])

  const decrementSeconds = useCallback(() => {
    if (seconds > 0) {
      setSeconds((prevSeconds) => prevSeconds - 1)
    } else {
      decrementMinutes()
    }
  }, [seconds, decrementMinutes])

  const saveTime = useCallback(
    (id, min, sec) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const item = tasks[idx]
      item.time = Number(min) * 60 + Number(sec)
      setTasks([...tasks.slice(0, idx), item, ...tasks.slice(idx + 1)])
    },
    [tasks, setTasks]
  )

  return (
    <span className="description timer">
      <button type="button" onClick={() => setTimerState(true)} className="icon-play" />
      <button type="button" onClick={() => setTimerState(false)} className="icon-pause" />
      <span className="description">{`${minutes}:${seconds}`}</span>
    </span>
  )
}

TaskTimer.propTypes = {
  taskID: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired
}
