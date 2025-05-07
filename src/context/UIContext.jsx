import { createContext, useState, useContext, useEffect } from 'react'
import { useTaskContext } from './TaskContext'
const UIContext = createContext()

export function UIProvider({ children }) {
  const [showCompleted, setShowCompleted] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [isTop, setIsTop] = useState(true)

  const { tasks } = useTaskContext()

  const drawingsExists = tasks.length === 0
  const firstTask = tasks.length === 1
  const secondTask = tasks.length === 2

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0)
    }

    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  // Estado unificado para modales
  const [modals, setModals] = useState({
    addTaskMobile: { isOpen: false, isAnimating: false },
    editTask: { isOpen: false, isAnimating: false },
    category: { isOpen: false, isAnimating: false },
    categories: { isOpen: false, isAnimating: false },
    message: { isOpen: false, isAnimating: false },
  })

  // Funcion para abrir/cerrar modales con animacion
  const toggleModal = (name) => {
    setModals((prev) => ({
      ...prev,
      [name]: {
        isOpen: !prev[name]?.isOpen,
        isAnimating: prev[name]?.isOpen, // ← se desactiva al cerrar
      },
    }))
  }

  return (
    <UIContext.Provider
      value={{
        modals,
        setModals,
        toggleModal,
        showCompleted,
        setShowCompleted,
        selectedCategory,
        setSelectedCategory,
        isTop,
        drawingsExists,
        firstTask,
        secondTask,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUIContext() {
  return useContext(UIContext)
}
