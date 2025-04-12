import { useTaskContext } from '../../context/TaskContext'
import { useUIContext } from '../../context/UIContext'
import { Modal } from './Modal'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useCategoryContext } from '../../context/CategoryContext'
import { iconMap } from '../../utils/icons'
import { CategoryListMobile } from '../CategoryListMobile'

export function AddTaskMobileModal() {
  const { addTask, taskInput, setTaskInput } = useTaskContext()
  const { modals, toggleModal } = useUIContext()
  const { category } = useCategoryContext()

  const [showCategories, setShowCategories] = useState(true)

  const IconComponent = iconMap[category.icon]

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask()
      toggleModal('addTaskMobile')
    }
  }

  const handleAddTask = () => {
    if (taskInput.trim() === '') return
    addTask()
    toggleModal('addTaskMobile')
  }

  const maxLength = 130

  return (
    <Modal
      isOpen={modals?.addTaskMobile?.isOpen || false}
      onClose={() => toggleModal('addTaskMobile')}
      title={'Agregar Tarea'}
    >
      <div>
        {/* Contador de caracteres */}
        <div className="flex justify-end text-sm text-gray-500">
          <span>
            {taskInput.length}/{maxLength} caracteres
          </span>
        </div>
        <textarea
          type="text"
          value={taskInput}
          maxLength={130}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 text-xl border-2 rounded-lg shadow-lg h-30 shadow-black"
          placeholder="Añade una tarea"
        />

        {/* Categoría */}
        <div className="relative mt-4 category">
          <p className="font-semibold ">
            Elige la categoria o agrega una nueva
          </p>
          <div className="flex items-center justify-center w-full py-2 gap-x-6">
            <button className="flex items-center justify-center px-2 py-2 border-2 border-dashed rounded-lg shadow-lg cursor-pointer max-w-32 gap-x-1 md:py-2 backdrop-blur-lg">
              {category.name}
              {IconComponent && <IconComponent size={18} />}
            </button>

            {/* Botón de agregar categoría */}
            <button
              className="px-2 py-2 text-black border-2 border-dotted rounded-lg shadow-lg cursor-pointer hover:opacity-50"
              onClick={() => {
                toggleModal('addTaskMobile') // Cierra el modal actual

                setTimeout(() => {
                  toggleModal('category') // Abre el nuevo modal
                }, 300)
              }}
            >
              <Plus />
            </button>
          </div>

          <CategoryListMobile
            showCategories={showCategories}
            setShowCategories={setShowCategories}
          />
        </div>

        <button
          className="px-3 py-2.5 mx-auto mt-5 text-white bg-blue-500 border-2 rounded-lg cursor-pointer hover:opacity-50"
          onClick={handleAddTask}
        >
          Agregar tarea
        </button>
      </div>
    </Modal>
  )
}
