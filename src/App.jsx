import './App.css'

// Hooks
import { useTaskContext } from './context/TaskContext'
import { useUIContext } from './context/UIContext'
import { useIsMobile } from './hooks/useIsMobile'
import { useEffect, useMemo, useState } from 'react'

// UI Components
import { TaskControlsDesktop } from './components/TaskControlsDesktop'
import { TaskControlsMobile } from './components/TaskControlsMobile'
import { TaskList } from './components/TaskList'
import { ActionMenu } from './components/ActionMenu'
import { FilterCategory } from './components/FilterCategory'
import { CountMarks } from './components/CountsMark'

// Modals
import { CategoryModal } from './components/modals/CategoryModal'
import { CategoriesModal } from './components/modals/CategoriesModal'
import { EditTaskModal } from './components/modals/EditTaskModal'
import { MessageModal } from './components/modals/MessageModal'
import { AddTaskMobileModal } from './components/modals/AddTaskMobileModal'

// Visuals
import { Drawings } from './components/Drawings'
import { DrawingsBg } from './components/DrawingsBg'

function App() {
  const { tasks } = useTaskContext()
  const { drawingsExists } = useUIContext()
  const isMobile = useIsMobile()
  const [loaded, setLoaded] = useState(false)

  // Contar tareas completadas
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  )

  // Aplicar animacion al cargar la app para evitar parpadeo de imagenes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true)
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div>
      {/* Modals */}
      <CategoryModal />
      <CategoriesModal />
      <EditTaskModal />
      <MessageModal />
      <AddTaskMobileModal />

      {/* Dibujo de fondo (opcional) */}
      {drawingsExists && <Drawings />}
      <DrawingsBg completedTasks={completedTasks} />

      <header>
        <ActionMenu />
        <FilterCategory />
      </header>

      <main>
        <h1
          className={`absolute select-none text-6xl max-w-[90%] md:top-[46%] flex justify-center transition-opacity duration-700
            ${!drawingsExists && 'md:hidden'}
              ${tasks.length > 0 ? 'top-2' : 'top-[35%] '}
          ${loaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          Konki
        </h1>

        {/* Conteo */}
        <CountMarks completedTasks={completedTasks} />
        {isMobile ? <TaskControlsMobile /> : <TaskControlsDesktop />}
        <TaskList />
      </main>
    </div>
  )
}

export default App
