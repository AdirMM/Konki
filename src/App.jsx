import './App.css'

// Hooks
import { useTaskContext } from '../context/TaskContext'
import { useUIContext } from '../context/UIContext'
import { useIsMobile } from './hooks/useIsMobile'
import { useMemo } from 'react'

// UI Components
import { TaskControlsDesktop } from '../components/TaskControlsDesktop'
import { TaskControlsMobile } from '../components/TaskControlsMobile'
import { TaskList } from '../components/TaskList'
import { ActionMenu } from '../components/ActionMenu'
import { FilterCategory } from '../components/FilterCategory'
import { CountMarks } from '../components/CountsMark'

// Modals
import { CategoryModal } from '../components/modals/CategoryModal'
import { CategoriesModal } from '../components/modals/CategoriesModal'
import { EditTaskModal } from '../components/modals/EditTaskModal'
import { MessageModal } from '../components/modals/MessageModal'
import { AddTaskMobileModal } from '../components/modals/AddTaskMobileModal'

// Visuals
import { Drawings } from '../components/Drawings'
import { DrawingsBg } from '../components/DrawingsBg'

function App() {
  const { tasks } = useTaskContext()
  const { drawingsExists } = useUIContext()
  const isMobile = useIsMobile()

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  )

  return (
    <div>
      {/* Modals */}
      <CategoryModal />
      <CategoriesModal />
      <EditTaskModal />
      <MessageModal />
      <AddTaskMobileModal />

      {/* Conteo */}
      <CountMarks completedTasks={completedTasks} />

      {/* Dibujo de fondo (opcional) */}
      {drawingsExists && <Drawings />}
      <DrawingsBg />

      <header>
        <ActionMenu />
        <FilterCategory />
      </header>

      <main>
        {drawingsExists && (
          <h1 className="absolute text-6xl max-w-[90%] top-[35%] md:top-[46%] flex justify-center">
            Konki
          </h1>
        )}

        {isMobile ? <TaskControlsMobile /> : <TaskControlsDesktop />}
        <TaskList />
      </main>
    </div>
  )
}

export default App
