import React, { useState, useMemo } from 'react'

import TaskList from './Main/TaskList/TaskList.jsx'
import Footer from './Footer/Footer.jsx'
import Header from './Header/Header.jsx'
import { TodoAppContext } from './Context/TodoContext.js'
import './app.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [activeShowButton, setActiveShowButton] = useState('All')
  const [timers, setTimers] = useState({})

  const activeCount = useMemo(() => tasks.filter((el) => el.taskStatus === '').length, [tasks])

  const contextValue = useMemo(
    () => ({
      tasks,
      activeShowButton,
      setTasks,
      setActiveShowButton,
      activeCount,
      timers,
      setTimers
    }),
    [tasks, activeShowButton, activeCount, timers]
  )

  return (
    <TodoAppContext.Provider value={contextValue}>
      <section className="todoapp">
        <Header />
        <TaskList />
        <Footer />
      </section>
    </TodoAppContext.Provider>
  )
}
