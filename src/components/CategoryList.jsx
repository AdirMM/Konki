import { useEffect, useRef } from 'react'
import { useCategoryContext } from '../context/CategoryContext'
import { useUIContext } from '../context/UIContext'
import { iconMap } from '../../utils/icons'
import { Plus } from 'lucide-react'
import { useHandleClickOutside } from '../hooks/useHandleClickOutside'

export function CategoryList({ setShowCategories, setSelectedCategory }) {
  const { categories } = useCategoryContext()
  const { toggleModal } = useUIContext()

  const handleClick = (cat) => {
    if (setSelectedCategory) {
      setSelectedCategory(cat)
    }
    setShowCategories(false)
  }

  const categoryRef = useRef(null)

  useHandleClickOutside(categoryRef, () => setShowCategories(false))

  return (
    <div ref={categoryRef} className="bg-white rounded-lg">
      <button
        className="flex items-center justify-center w-full pt-2 pb-2 cursor-pointer hover:opacity-50"
        onClick={() => toggleModal('category')}
      >
        <Plus />
      </button>
      {[{ name: 'Todas', icon: 'GalleryVerticalEnd' }, ...categories].map(
        (cat) => {
          const IconComponent = iconMap[cat.icon] // Buscamos el ícono usando su nombre
          return (
            <li
              key={cat.name}
              className="relative py-2 transition-all border-blue-200 cursor-pointer hover:opacity-50 last-of-type:rounded-b-lg group border-y-1"
              onClick={() => handleClick(cat)}
            >
              <span className="flex items-center justify-center gap-2">
                {cat.name}
                {IconComponent && <IconComponent size={18} />}
              </span>
            </li>
          )
        }
      )}
    </div>
  )
}
