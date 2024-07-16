import React, { useState } from 'react'

import TaskList from './Main/TaskList/TaskList.jsx'
import Footer from './Footer/Footer.jsx'
import Header from './Header/Header.jsx'
import { TodoAppContext } from './Context/TodoContext.js'
import './app.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [activeShowButton, setActiveShowButton] = useState('All')
  const activeCount = tasks.filter((el) => el.taskStatus === '').length

  const contextValue = {
    tasks,
    activeShowButton,
    setTasks,
    setActiveShowButton,
    activeCount,
  }

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
