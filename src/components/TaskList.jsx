import { useTaskContext } from '../context/TaskContext'
import { useUIContext } from '../context/UIContext'
import { useCategoryContext } from '../context/CategoryContext'
import { iconMap } from '../../utils/icons'
import notasks from '../assets/notasks.png'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { TaskGroup } from './TaskGroup'
import { EmptyState } from './EmptyState'
import { Alert } from './Alert'

export function TaskList() {
  const { tasks, toggleCompleted, setSelectedTask } = useTaskContext()
  const { showCompleted, toggleModal } = useUIContext()
  const { category, categories } = useCategoryContext()

  const [recentlyCompleted, setRecentlyCompleted] = useState(null)

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasMounted(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  // Ref para detectar el tiempo de un click
  const clickTimeoutRef = useRef(null)
  // Ref para detectar la ultima tarea completada
  const recentlyCompletedTimeout = useRef(null)

  // Filtrar tareas por categoria seleccionada
  const filteredTask =
    category?.name === 'Todas'
      ? tasks
      : tasks.filter((task) => task.category?.name === category?.name)

  // Fitrar tareas por categoria
  const noTasksInCategory =
    filteredTask.length === 0 && category.name !== 'Todas'

  // Renderizamos iconos para su respectiva categoria
  const getCategoryIcon = (categoryName) => {
    const foundCategory = categories.find((cat) => cat.name === categoryName)
    return foundCategory ? iconMap[foundCategory.icon] : null
  }

  const handleToggleCompleted = (task) => {
    toggleCompleted(task.id)

    // Si está en recentlyCompleted y la tarea fue destachada, borra la alerta
    if (recentlyCompleted?.id === task.id && task.completed) {
      clearTimeout(recentlyCompletedTimeout.current)
      setRecentlyCompleted(null)
      return
    }

    // Si se está completando (no estaba completada), lanza la alerta
    if (!task.completed) {
      setRecentlyCompleted({
        id: task.id,
        text: task.text.slice(0, 25),
      })

      // Guarda el timeout para poder limpiarlo luego
      recentlyCompletedTimeout.current = setTimeout(() => {
        setRecentlyCompleted(null)
      }, 2000)
    }
  }

  const getRelativeDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()

    const diffInTime = now - date
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24))

    if (diffInDays === 0) return 'Hoy'
    if (diffInDays === 1) return 'Ayer'
    return `Hace ${diffInDays} dias`
  }

  const groupedTasks = filteredTask.reduce((acc, task) => {
    const relativeDate = getRelativeDate(task.createAt)

    if (!acc[relativeDate]) acc[relativeDate] = []
    acc[relativeDate].push(task)
    return acc
  }, {})

  return (
    <div>
      <Alert
        message={`Tarea completada: ${recentlyCompleted?.text}`}
        isVisible={!!recentlyCompleted}
        onClose={() => setRecentlyCompleted(null)}
        duration={3000} // Duración de la alerta en milisegundos
      />

      <AnimatePresence>
        {noTasksInCategory && tasks.length >= 1 ? (
          <EmptyState src={notasks} />
        ) : (
          <motion.ul
            key="task-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center w-11/12 mx-auto mt-8 text-center md:mt-38 pb-50 md:pb-0"
          >
            {Object.entries(groupedTasks).map(([relativeDate, tasks]) => (
              <TaskGroup
                key={relativeDate}
                relativeDate={relativeDate}
                tasks={tasks}
                getCategoryIcon={getCategoryIcon}
                handleToggleCompleted={handleToggleCompleted}
                setSelectedTask={setSelectedTask}
                toggleModal={toggleModal}
                clickTimeoutRef={clickTimeoutRef}
                showCompleted={showCompleted}
                hasMounted={hasMounted}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
