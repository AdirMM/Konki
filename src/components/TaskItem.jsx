import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useTaskContext } from '../context/TaskContext'

export function TaskItem({
  task,
  IconComponent,
  handleToggleCompleted,
  setSelectedTask,
  toggleModal,
  clickTimeoutRef,
  showCompleted,
  hasMounted,
}) {
  const { removeTask } = useTaskContext()
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [isHiding, setIsHiding] = useState(false) // Nuevo estado para la animación de salida
  const longPressTimeoutRef = useRef(null)
  const autoHideTimeoutRef = useRef(null)

  const handleLongPress = () => {
    setSelectedTask(task)
    setShowDeleteButton(true)
    autoHideTimeoutRef.current = setTimeout(() => {
      setShowDeleteButton(false)
    }, 2000)
  }

  const handleTouchStart = () =>
    (longPressTimeoutRef.current = setTimeout(handleLongPress, 500))

  const handleTouchMove = () => {
    clearTimeout(longPressTimeoutRef.current) // Cancela el temporizador si el usuario mueve el dedo
  }

  const handleTouchEnd = () => {
    clearTimeout(longPressTimeoutRef.current)
  }

  const handleDeleteClick = () => {
    setIsHiding(true) // Inicia la animación de salida
    setTimeout(() => {
      removeTask(task.id) // Elimina la tarea después de la animación
      setShowDeleteButton(false) // Oculta el botón
      setIsHiding(false) // Resetea el estado de salida
    }, 300) // Duración de la animación (300ms)
  }

  const handleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
      clickTimeoutRef.current = null
      setSelectedTask(task)
      toggleModal('editTask')
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        handleToggleCompleted(task)
        clickTimeoutRef.current = null
      }, 250)
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(autoHideTimeoutRef.current)
      clearTimeout(longPressTimeoutRef.current)
    }
  }, [])

  return (
    <motion.li
      key={task.id}
      initial={hasMounted ? { opacity: 0, y: 10 } : false}
      animate={hasMounted ? { opacity: 1, y: 0 } : false}
      exit={hasMounted ? { opacity: 0, y: -10 } : false}
      transition={{ duration: 0.15 }}
      className={`transition-all duration-700 overflow-hidden ${
        !showCompleted && task.completed
          ? 'opacity-0 scale-y-0 max-h-0'
          : 'opacity-100 max-h-20 pb-7'
      }`}
    >
      <div className="flex items-center transition-all duration-500 gap-x-4">
        <span
          className={`backdrop-blur-lg flex justify-center select-none text-center items-center gap-x-4 cursor-pointer border-b-2 px-2 shadow-lg md:px-5 leading-5 rounded-lg md:hover:px-7 transition-all duration-500 text-xl ${
            task.completed ? 'line-through text-zinc-500 shadow-none' : 'pb-1'
          }`}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {IconComponent && <IconComponent size={18} />}
          {task.text.length > 30 ? `${task.text.slice(0, 30)}...` : task.text}
        </span>
        <button
          className={`absolute rounded-full left-1/2 -translate-x-1/2 size-32 text-lg text-white bg-red-600 transition-all duration-300 ease-in-out select-none ${
            isHiding
              ? 'opacity-0 scale-50 pointer-events-none' // Animación de salida
              : showDeleteButton
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-50 pointer-events-none'
          }`}
          onClick={handleDeleteClick}
        >
          Borrar
        </button>
      </div>
    </motion.li>
  )
}
