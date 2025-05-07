import { useTaskContext } from '../../context/TaskContext'
import { useUIContext } from '../../context/UIContext'
import { Modal } from './Modal'

export function MessageModal() {
  const { modals, toggleModal } = useUIContext()
  const { hasCompletedTasks, deleteCompletedTask } = useTaskContext()

  return (
    <Modal
      isOpen={modals?.message?.isOpen || false}
      onClose={() => toggleModal('message')}
      title="Mensaje..."
    >
      <p className="mb-5 text-lg">
        {hasCompletedTasks
          ? 'Estas seguro de eliminar todas las tareas completadas?'
          : 'No existen tareas completadas'}
      </p>
      <div className="flex justify-center gap-x-5">
        <button
          className="px-2 py-2 border-2 rounded-lg cursor-pointer"
          onClick={() => toggleModal('message')}
        >
          Volver
        </button>
        {hasCompletedTasks && (
          <>
            <button
              className="px-2 py-2 text-white bg-red-600 rounded-lg cursor-pointer"
              onClick={() => {
                deleteCompletedTask()
                toggleModal('message')
              }}
            >
              Estoy seguro
            </button>
          </>
        )}
      </div>
    </Modal>
  )
}
