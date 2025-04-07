import './App.css'
import { TaskControlsDesktop } from '../components/TaskControlsDesktop'
import { TaskList } from '../components/TaskList'
import { ActionMenu } from '../components/ActionMenu'
import { CategoryModal } from '../components/modals/CategoryModal'
import { CategoriesModal } from '../components/modals/CategoriesModal'
import { EditTaskModal } from '../components/modals/EditTaskModal'
import { MessageModal } from '../components/modals/MessageModal'
import { Drawings } from '../components/Drawings'
import { useTaskContext } from '../context/TaskContext'
import { DrawingsBg } from '../components/DrawingsBg'
import { CountMarks } from '../components/CountsMark'
import { useUIContext } from '../context/UIContext'
import { useIsMobile } from './hooks/useIsMobile'
import { TaskControlsMobile } from '../components/TaskControlsMobile'
import { AddTaskMobileModal } from '../components/modals/AddTaskMobileModal'

function App() {
  const { tasks } = useTaskContext()
  const isMobile = useIsMobile()

  const completedTasks = tasks.filter((task) => task.completed).length

  const { drawingsExists } = useUIContext()

  return (
    <>
      <CountMarks completedTasks={completedTasks} />
      <CategoryModal />
      <CategoriesModal />
      <EditTaskModal />
      <MessageModal />
      <AddTaskMobileModal />

      {drawingsExists ? <Drawings /> : null}

      <header>
        <ActionMenu />
      </header>

      <main>
        {drawingsExists && (
          <h1 className="absolute text-6xl max-w-[90%] top-[35%] md:top-[46%] flex justify-center">
            Konki
          </h1>
        )}
        <DrawingsBg />
        {isMobile ? <TaskControlsMobile /> : <TaskControlsDesktop />}
        <TaskList />
      </main>
    </>
  )
}

export default App
