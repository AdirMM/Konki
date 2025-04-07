import { createContext, useState, useContext, useEffect } from 'react'
import { useCategoryContext } from './CategoryContext'

const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [selectedTask, setSelectedTask] = useState({})
  const { category } = useCategoryContext()

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: taskInput,
          category: category,
          completed: false,
        },
      ])
      setTaskInput('')
    }
  }

  const editTask = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    )
  }

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const removeTask = (id) => {
    const updateTasks = tasks.filter((task) => task.id !== id)
    setTasks(updateTasks)

    if (updateTasks.length === 0) localStorage.removeItem('tasks')
  }

  const deleteCompletedTask = () => {
    setTasks((prevTask) => prevTask.filter((task) => !task.completed))

    localStorage.setItem(
      'tasks',
      JSON.stringify(tasks.filter((task) => !task.completed))
    )
  }

  // Local Storage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) setTasks(JSON.parse(savedTasks))
  }, [setTasks])

  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <TaskContext.Provider
      value={{
        addTask,
        removeTask,
        editTask,
        taskInput,
        setTaskInput,
        selectedTask,
        setSelectedTask,
        toggleCompleted,
        tasks,
        setTasks,
        deleteCompletedTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
export function useTaskContext() {
  const context = useContext(TaskContext)
  return context
}
