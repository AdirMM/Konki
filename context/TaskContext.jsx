import { createContext, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCategoryContext } from './CategoryContext'

const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [selectedTask, setSelectedTask] = useState({})
  const { category } = useCategoryContext()

  const hasCompletedTasks = tasks.some((task) => task.completed)

  const addTask = async (customCategory = category) => {
    if (taskInput.trim() === '') return

    // Validar que la categoría tenga un nombre
    if (!customCategory?.name) {
      console.warn('No se puede crear una tarea sin categoría válida.')
      return
    }

    const { id, name, iconName, color } = customCategory

    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      category: {
        id: id ?? Date.now(), // por si el id de categoría no viene
        name,
        iconName,
        color,
      },
      completed: false,
      createAt: new Date().toISOString(),
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    setTaskInput('')

    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
    } catch (error) {
      console.error('Error guardando tareas:', error)
    }
  }

  const editTask = async (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    )
    setTasks(updatedTasks)
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
    } catch (error) {
      console.error('Error editando tareas:', error)
    }
  }

  const toggleCompleted = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
    } catch (error) {
      console.error('Error completando la tarea:', error)
    }
  }

  const removeTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)

    if (updatedTasks.length === 0) {
      try {
        await AsyncStorage.removeItem('tasks')
      } catch (error) {
        console.log('Error al eliminar la tarea:', error)
      }
    } else {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
      } catch (error) {
        console.error(error)
      }
    }
  }

  const deleteCompletedTask = async () => {
    const updatedTasks = tasks.filter((task) => !task.completed)
    setTasks(updatedTasks)
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
    } catch (error) {
      console.error('Error eliminando tareas completadas:', error)
    }
  }

  // Cargar tareas desde almacenamiento al iniciar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks')
        if (savedTasks) {
          const parsed = JSON.parse(savedTasks)
          if (Array.isArray(parsed)) {
            setTasks(parsed)
          } else {
            console.warn('⚠️ Tareas guardadas no son válidas:', parsed)
          }
        }
      } catch (error) {
        console.warn('❌ Error cargando tareas desde AsyncStorage:', error)
      }
    }
    loadTasks()
  }, [])

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
        hasCompletedTasks,
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
