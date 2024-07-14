import React, { useState } from 'react'

import TaskList from './Main/TaskList/TaskList.jsx'
import Footer from './Footer/Footer.jsx'
import Header from './Header/Header.jsx'

import './app.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [activeShowButton, setActiveShowButton] = useState('All')
  const activeCount = tasks.filter((el) => el.taskStatus === '').length

  return (
    <section className="todoapp">
      <Header tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} activeShowButton={activeShowButton} />
      <Footer activeCount={activeCount} tasks={tasks} setTasks={setTasks} setActiveShowButton={setActiveShowButton} />
    </section>
  )
}
