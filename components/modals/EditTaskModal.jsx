import { useState, useEffect } from 'react'

import { iconMap } from '../../utils/icons'

import { Modal } from './Modal'
import { useUIContext } from '../../context/UIContext'
import { useTaskContext } from '../../context/TaskContext'
import { useCategoryContext } from '../../context/CategoryContext'

export function EditTaskModal() {
  const { selectedTask, editTask, removeTask } = useTaskContext()
  const { modals, toggleModal } = useUIContext()
  const { categories } = useCategoryContext()

  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

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
      title="Tu Tarea"
    >
      {/* Contador de caracteres */}
      <div className="flex justify-end text-sm text-gray-500">
        <span>
          {editedTask.length}/{maxLength} caracteres
        </span>
      </div>

      <div className="flex flex-col pb-5 gap-y-2">
        <textarea
          name=""
          className="h-32 px-2 mx-auto text-lg border-2 rounded-lg w-2xs opacity-80 focus:opacity-100"
          value={editedTask}
          maxLength={maxLength}
          onKeyDown={handleKeyDown}
          onChange={(e) => setEditedTask(e.target.value)}
          onFocus={() => setIsEditing((prev) => !prev)}
        ></textarea>
      </div>

      <div>
        {/* El consejo siempre se muestra */}
        {!isEditing && <p>Consejo: Intenta escribir en el recuadro ;)</p>}

        {/* Contenido que se muestra solo cuando isEditing es true */}
        <div
          className={`transition-all duration-300 ${
            isEditing
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden'
          }`}
        >
          <p className="pb-4 text-xl">Selecciona una categoria</p>

          <ul
            className={`md:w-32 mx-auto flex flex-wrap items-center justify-center gap-3 md:gap-3
      ${categories.length < 7 ? 'grid-cols-1' : 'grid-cols-2'}`}
          >
            {categories.length > 0 ? (
              categories.map((cat, index) => {
                const IconComponent = iconMap[cat.icon]

                return (
                  <li key={index}>
                    <span
                      className="flex flex-row items-center justify-center px-3 py-2 rounded-lg cursor-pointer md:py-1 md:px-2 text-zinc-200 gap-x-2"
                      style={{ backgroundColor: cat.color }}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat.name}
                      {IconComponent && <IconComponent size={18} />}
                    </span>
                  </li>
                )
              })
            ) : (
              <p>No hay categorias disponibles</p>
            )}
          </ul>
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-2">
          <button
            className="px-4 py-2 mt-10 text-white bg-blue-500 border-2 rounded-lg cursor-pointer"
            onClick={handleSaveTask}
          >
            Guardar tarea
          </button>
          <button
            className="px-2 py-3 mt-10 text-white bg-red-500 border-2 rounded-lg cursor-pointer md:py-2 md:px-4"
            onClick={handleRemoveTask}
          >
            Eliminar Tarea
          </button>
        </div>
      )}
    </Modal>
  )
}
