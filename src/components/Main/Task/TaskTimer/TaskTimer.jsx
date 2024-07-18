import React, {
  useContext, useEffect, useState, useCallback
} from 'react'
import PropTypes from 'prop-types'

import './taskTimer.css'
import { TodoAppContext, TodoListContext } from '../../../Context/TodoContext.js'

export default function TaskTimer({ time, taskID }) {
  const { setTasks, tasks } = useContext(TodoAppContext)
  const { timerStatus, setTimerStatus } = useContext(TodoListContext)

  const [minutes, setMinutes] = useState(Math.floor(time / 60))
  const [seconds, setSeconds] = useState(time % 60)

  useEffect(() => {
    setTimerStatus(sessionStorage.getItem(`${taskID}_status`) === 'true')
    if (!timerStatus) {
      sessionStorage.removeItem(taskID)

      if (sessionStorage.getItem('taskIDs')) {
        if (JSON.parse(sessionStorage.getItem('taskIDs').includes(taskID))) {
          let arr = JSON.parse(sessionStorage.getItem('taskIDs'))
          const idx = arr.indexOf(taskID)
          arr = arr.toSpliced(idx, 1)
          sessionStorage.setItem('taskIDs', arr)
        }
      }
    }

    return () => {
      if (timerStatus) {
        saveTime(minutes, seconds)
        sessionStorage.setItem(`${taskID}`, Date.parse(new Date()))

        if (sessionStorage.getItem('taskIDs')) {
          if (!JSON.parse(sessionStorage.getItem('taskIDs').includes(taskID))) {
            const arr = JSON.parse(sessionStorage.getItem('taskIDs'))
            sessionStorage.setItem('taskIDs', JSON.stringify([...arr, taskID]))
          }
        } else {
          sessionStorage.setItem('taskIDs', JSON.stringify([taskID]))
        }
      }
    }
  }, [timerStatus]) // eslint-disable-line

  useEffect(() => {
    if (minutes <= 0 && seconds <= 0) {
      setTimerStatus(false)
      sessionStorage.setItem(`${taskID}_status`, false)
    }
    if (!timerStatus) return

    const timer = setInterval(() => {
      decrementSeconds()
    }, 1000)

    return () => clearInterval(timer) // eslint-disable-line
  }, [timerStatus, minutes, seconds]) // eslint-disable-line

  const decrementMinutes = () => {
    setSeconds(59)
    setMinutes(minutes - 1)
  }

  const decrementSeconds = () => {
    if (seconds <= 0) {
      decrementMinutes()
    } else {
      setSeconds(seconds - 1)
    }

    if (timerStatus) {
      requestAnimationFrame(decrementSeconds)
    }
  }

  const startTimer = () => {
    setTimerStatus(true)
    sessionStorage.setItem(`${taskID}_status`, true)
    requestAnimationFrame(decrementSeconds)
  }

  const pauseTimer = () => {
    setTimerStatus(false)
    sessionStorage.setItem(`${taskID}_status`, false)
  }

  const saveTime = useCallback(
    (min, sec) => {
      const idx = tasks.findIndex((el) => el.id === taskID)
      const item = tasks[idx]
      item.time = Number(min) * 60 + Number(sec)
      setTasks([...tasks.slice(0, idx), item, ...tasks.slice(idx + 1)])
    },
    [tasks, setTasks]
  )

  return (
    <span className="description timer">
      <button type="button" onClick={startTimer} className="icon-play" />
      <button type="button" onClick={pauseTimer} className="icon-pause" />
      <span className="description">{`${minutes}:${seconds}`}</span>
    </span>
  )
}

TaskTimer.propTypes = {
  taskID: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired
}
