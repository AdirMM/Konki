import { useState, useEffect } from 'react'
import { iconMap } from '../../utils/icons'
import { Plus } from 'lucide-react'
import { CategoryListMobile } from '../CategoryListMobile'
import { Modal } from './Modal'
import { useUIContext } from '../../context/UIContext'
import { useTaskContext } from '../../context/TaskContext'
import { useCategoryContext } from '../../context/CategoryContext'

export function EditTaskModal() {
  const { selectedTask, editTask, removeTask } = useTaskContext()
  const [showCategories, setShowCategories] = useState(true)

  const { modals, toggleModal } = useUIContext()
  const { category } = useCategoryContext()

  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const IconComponent = iconMap[category.icon]

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // evita salto de línea
      handleSaveTask()
    }
  }

  useEffect(() => {
    setEditedTask(selectedTask.text || '') // Asegúrate de que no sea undefined
    setSelectedCategory(selectedTask.category)
  }, [selectedTask])

  const handleSaveTask = () => {
    if (!editedTask.trim()) return

    editTask(selectedTask.id, {
      text: editedTask,
      category: selectedCategory,
    })

    toggleModal('editTask')
  }

  const handleRemoveTask = () => {
    removeTask(selectedTask.id)
    toggleModal('editTask')
  }

  // Esta función se ejecuta cuando se cierra el modal
  const handleCloseModal = () => {
    toggleModal('editTask') // Cierra el modal
    setIsEditing(false) // Restablece isEditing a false cuando se cierra
  }

  const maxLength = 130

  return (
    <Modal
      isOpen={modals?.editTask?.isOpen || false}
      onClose={handleCloseModal}
      title={!isEditing ? 'Tu tarea' : 'Editar tarea'}
    >
      {/* Contador de caracteres */}
      {isEditing && (
        <div className="flex justify-end text-sm text-gray-500">
          <span>
            {editedTask.length}/{maxLength} caracteres
          </span>
        </div>
      )}

      {/* Input para actualizar tarea */}
      <div className="flex flex-col pb-5 gap-y-2">
        <textarea
          name=""
          className="h-32 px-2 mx-auto text-xl border-2 rounded-lg w-2xs opacity-80 focus:opacity-100"
          value={editedTask}
          maxLength={maxLength}
          onKeyDown={handleKeyDown}
          onChange={(e) => setEditedTask(e.target.value)}
          onFocus={() => setIsEditing((prev) => !prev)}
        ></textarea>
      </div>

      <div>
        {/* El consejo se muestra si no se esta editando la tarea*/}
        {!isEditing && <p>Consejo: Intenta escribir en el recuadro ;)</p>}
        {/* Categoría */}
        <div
          className={`transition-all duration-300 ${
            isEditing
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden'
          }`}
        >
          <p className="font-semibold ">Categoria actual</p>
          <div className="flex w-1/2 gap-5 py-2 mx-auto">
            <span className="flex items-center justify-center px-4 py-1 mx-auto border-2 border-dashed rounded-lg shadow-lg cursor-pointer gap-x-1 md:py-2 backdrop-blur-lg ">
              {category.name}
              {IconComponent && <IconComponent size={18} />}
            </span>

            {/* Botón de agregar categoría */}
            <button
              className="px-2 py-2 mx-auto text-black border-2 border-dotted rounded-lg cursor-pointer hover:opacity-50"
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
      </div>

      {isEditing && (
        <div className="flex items-center justify-center gap-2 mt-3">
          <button
            className="px-2 py-2 text-white bg-blue-500 border-2 rounded-lg cursor-pointer"
            onClick={handleSaveTask}
          >
            Guardar tarea
          </button>
          <button
            className="px-2 py-2 text-white bg-red-500 border-2 rounded-lg cursor-pointer md:py-2 md:px-4"
            onClick={handleRemoveTask}
          >
            Eliminar Tarea
          </button>
        </div>
      )}
    </Modal>
  )
}
