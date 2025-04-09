import { useState, useEffect } from 'react'
import { Modal } from './Modal'
import { useUIContext } from '../../context/UIContext'
import { useCategoryContext } from '../../context/CategoryContext'
import { iconMap } from '../../utils/icons'

export function CategoriesModal() {
  const { modals, toggleModal, selectedCategory, setSelectedCategory } =
    useUIContext()
  const { updateCategory, deleteCategory } = useCategoryContext()
  const [categories, setCategories] = useState([])

  // Conseguir las categorias guardadas en localstorage
  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem('categories')) || []
    setCategories(storedCategories)
  }, [toggleModal, updateCategory, deleteCategory])

  const handleEditCategory = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category)
    }

    // Cerramos el modal de categorías
    toggleModal('categories')

    // Esperamos a que termine la animación antes de abrir el otro modal
    setTimeout(() => {
      toggleModal('category')
    }, 300) // El mismo tiempo que la animación en toggleModal
  }

  return (
    <Modal
      isOpen={modals?.categories?.isOpen || false}
      onClose={() => toggleModal('categories')}
      title="Categorias"
    >
      <p className="mt-3 text-sm">
        Nota: Si quieres editar una categoria da click sobre ella ;)
      </p>
      <ul
        className={`w-60 md:w-64 max-h-64 mx-auto grid mt-5 gap-y-5 md:gap-y-2 gap-x-5 overflow-y-auto
    ${categories.length < 7 ? ' grid-cols-1' : 'grid-cols-2'}
  `}
      >
        {categories.length > 0 ? (
          categories.map((cat, index) => {
            const IconComponent = iconMap[cat.icon] // Buscamos el ícono usando su

            return (
              <li key={index}>
                <span
                  className="flex flex-row items-center justify-center py-2 leading-5 text-black border-b-2 rounded-lg cursor-pointer gap-x-2"
                  style={{ borderColor: cat.color }}
                  onClick={() => handleEditCategory(cat)}
                >
                  {cat.name}
                  {IconComponent && <IconComponent size={22} />}
                </span>
              </li>
            )
          })
        ) : (
          <p>No hay categorias disponibles</p>
        )}
      </ul>
    </Modal>
  )
}
