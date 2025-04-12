import { Check, Plus } from 'lucide-react'
import { useUIContext } from '../context/UIContext'

export function TaskControlsMobile() {
  const { toggleModal, showCompleted, setShowCompleted } = useUIContext()

  return (
    <div className={`fixed bottom-0 z-20 flex flex-col items-center gap-y-5`}>
      {/* Botón flotante para agregar tarea */}
      <button
        className="z-10 p-5 bg-white border-2 rounded-full shadow-lg cursor-pointer shadow-black backdrop-blur-lg"
        onClick={() => toggleModal('addTaskMobile')}
      >
        <Plus />
      </button>

      <div className="flex items-center justify-center w-full pb-10 gap-x-10">
        {/* Toggle Completadas */}
        <div className="toggle">
          <button
            className="flex justify-center px-2 py-2 border-2 rounded-lg shadow-lg cursor-pointer gap-x-1 shadow-black backdrop-blur-lg"
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? 'Ocultar ' : 'Mostrar '}
            <Check size={23} />
          </button>
        </div>
      </div>
    </div>
  )
}
