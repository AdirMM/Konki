import { useCategoryContext } from '../context/CategoryContext'
import { useTaskContext } from '../context/TaskContext'
import { iconMap } from '../../utils/icons'

export function CategoryListMobile({
  isAbsolute = false,
  showCategories = false,
  selectedCategory,
  setSelectedCategory,
  allowFilter = true,
  allowSelection = false,
}) {
  const { tasks } = useTaskContext()
  const { category, setCategory, categories } = useCategoryContext()

  const hasTasks = tasks.length > 0
  const effectiveCategories = isAbsolute
    ? [{ name: 'Todas', icon: 'GalleryVerticalEnd' }, ...categories]
    : categories

  const handleClick = (cat) => {
    if (!hasTasks && !allowSelection) return // 🚫 Si no hay tareas, no permitas cambiar la categoría

    if (setSelectedCategory) {
      setSelectedCategory(cat) // Si se proporciona setSelectedCategory, actualiza la categoría seleccionada
    }

    if (allowFilter) {
      setCategory(cat) // Actualiza la categoría en el contexto
    }
  }

  return (
    <div
      className={`max-w-fit
        transition-all backdrop-blur-xs duration-300 ease-in-out z-40
        ${isAbsolute ? 'absolute top-8 left-6 w-full scale-110' : ''}
        ${showCategories ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        ${
          isAbsolute
            ? showCategories
              ? 'translate-y-10 '
              : 'translate-y-0'
            : ''
        }
      `}
    >
      <div className="p-2 overflow-x-auto rounded-lg">
        <ul className="flex flex-row max-w-xs px-2 overflow-x-auto md:max-w-md lg:max-w-lg gap-x-2 scrollbar-thin scrollbar-thumb-gray-300">
          {effectiveCategories.map((cat) => {
            const IconComponent = iconMap[cat.icon]
            const isSelected =
              (!hasTasks && cat.name === 'Todas') ||
              (selectedCategory || category).name === cat.name

            return (
              <li
                key={cat.name}
                className={`px-3 py-2 border-2 rounded-lg cursor-pointer min-w-fit whitespace-nowrap select-none
                  ${isSelected ? 'border-dashed' : 'bg-gray-50'}
                  ${
                    !hasTasks && !allowSelection && cat.name !== 'Todas'
                      ? ' cursor-not-allowed'
                      : 'hover:opacity-80'
                  }
                `}
                onClick={() => handleClick(cat)}
              >
                <span className="flex items-center gap-2">
                  {cat.name}
                  {IconComponent && <IconComponent size={18} />}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
