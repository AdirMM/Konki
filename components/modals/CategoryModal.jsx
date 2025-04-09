import { useEffect, useState } from 'react'

import { Modal } from './Modal'
import { iconList } from '../../utils/icons'
import { useUIContext } from '../../context/UIContext'
import { useCategoryContext } from '../../context/CategoryContext'

const icons = iconList // Usa la lista de íconos centralizada

export function CategoryModal() {
  const { addCategory, updateCategory, deleteCategory } = useCategoryContext()
  const { modals, toggleModal, selectedCategory, setSelectedCategory } =
    useUIContext()

  const [newCategory, setNewCategory] = useState('')
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [selectedIcon, setSelectedIcon] = useState('House') // Guardamos el nombre del ícono

  useEffect(() => {
    if (selectedCategory) {
      setNewCategory(selectedCategory.name)
      setSelectedColor(selectedCategory.color)
      setSelectedIcon(selectedCategory.icon)
    } else {
      setNewCategory('')
      setSelectedColor('#3b82f6')
      setSelectedIcon('House')
    }
  }, [selectedCategory])

  const handleCategory = () => {
    if (newCategory.trim() !== '') {
      if (selectedCategory) {
        // Editar categoria existente
        updateCategory(
          selectedCategory.name,
          newCategory,
          selectedColor,
          selectedIcon
        )
        toggleModal('category')
      } else {
        // Agregar nueva categoria
        addCategory(newCategory, selectedColor, selectedIcon)
        setNewCategory('')
        setSelectedColor('#3b82f6')
        setSelectedIcon('House') // Restauramos el estado con el nombre
        toggleModal('category')
        setSelectedCategory(null)
      }
    }
  }

  const handleDelete = () => {
    deleteCategory(selectedCategory.name)
    toggleModal()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCategory()
    }
  }

  const colors = ['#3b82f6', '#22c55e', '#ef4444']

  return (
    <Modal
      isOpen={modals?.category?.isOpen || false}
      onClose={() => toggleModal('category')}
      title="Categoria"
    >
      <div className="flex flex-col items-center gap-y-2">
        <p className="text-xl">Nombre de Categoría</p>
        <input
          type="text"
          className="w-64 px-2 py-1 text-center border-2 rounded-lg"
          placeholder="Ej. Compras, Familia..."
          value={newCategory}
          maxLength={10}
          onChange={(e) => {
            setNewCategory(e.target.value)
          }}
          onKeyDown={handleKeyDown}
        />

        <p className="text-xl">Elige un color</p>
        <div className="flex gap-2">
          {colors.map((color) => (
            <div
              key={color}
              className={`size-6 rounded-full cursor-pointer border-2 ${
                selectedColor === color ? 'border-black' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></div>
          ))}
        </div>

        <p className="text-xl">Elige un ícono</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {icons.map(({ name, component: IconComponent }) => (
            <div
              key={name}
              className={`p-2 rounded-lg cursor-pointer border-2 flex items-center justify-center w-10 h-10
                      ${
                        selectedIcon === name
                          ? 'border-black'
                          : 'border-transparent'
                      }`}
              onClick={() => setSelectedIcon(name)}
            >
              <IconComponent size={24} />
            </div>
          ))}
        </div>

        <div className="flex gap-x-5">
          <button
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg cursor-pointer"
            onClick={handleCategory}
          >
            Guardar Categoría
          </button>

          {selectedCategory && (
            <>
              <button
                className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg cursor-pointer"
                onClick={handleDelete}
              >
                Eliminar Categoria
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
