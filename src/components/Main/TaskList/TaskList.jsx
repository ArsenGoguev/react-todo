import React, { useContext } from 'react'

import './taskList.css'
import Task from '../Task/Task.jsx'
import { TodoAppContext } from '../../Context/TodoContext.js'
import { removeItemsFromStorage } from '../../../service/SessionStorage.js'

export default function TaskList() {
  const { tasks, setTasks, activeShowButton } = useContext(TodoAppContext)

  const onDeleted = (id) => {
    const removeTimeout = setTimeout(() => {
      removeItemsFromStorage(id, ['status', 'remainingTime', 'saved'])
      clearTimeout(removeTimeout)
    }, 100)
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const onCompleted = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id
      ? { ...task, taskStatus: task.checked ? '' : 'completed', checked: !task.checked }
      : task)))
  }

  const onEdit = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id
      ? { ...task, taskStatus: `${task.taskStatus} editing` }
      : task)))
  }

  const getComponent = (todo) => (
    <Task
      key={todo.id}
      id={todo.id}
      task={todo}
      onDeleted={() => onDeleted(todo.id)}
      onCompleted={() => onCompleted(todo.id)}
      onEdit={() => onEdit(todo.id)}
      tasks={tasks}
      setTasks={setTasks}
    />
  )

  const filterTasks = () => {
    switch (activeShowButton) {
    case 'active':
      return tasks.filter((el) => el.taskStatus === '').map(getComponent)
    case 'completed':
      return tasks.filter((el) => el.taskStatus === 'completed').map(getComponent)
    default:
      return tasks.map(getComponent)
    }
  }

  return (
    <section className="main">
      <ul className="todo-list">{filterTasks()}</ul>
    </section>
  )
}
