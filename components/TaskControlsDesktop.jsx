import { useTaskContext } from '../context/TaskContext'
import { useState } from 'react'
import { CategoryList } from './CategoryList'
import { useCategoryContext } from '../context/CategoryContext'
import { useUIContext } from '../context/UIContext'
import { Check, Plus } from 'lucide-react'
import { iconMap } from '../utils/icons'

export function TaskControlsDesktop() {
  const { addTask, taskInput, setTaskInput } = useTaskContext()
  const { category } = useCategoryContext()
  const {
    showCompleted,
    setShowCompleted,
    showCategoryOptions,
    isTop,
    drawingsExists,
  } = useUIContext()
  const [showCategories, setShowCategories] = useState(false)

  // Componente para mostrar el icono de la categoria
  const IconComponent = category?.icon && iconMap[category.icon]

  return (
    <div
      className={`w-full fixed grid-container z-10 pt-5 pb-7  ${
        isTop ? 'shadow-none' : 'backdrop-blur-xs shadow-lg'
      }`}
    >
      <div className="flex flex-col ">
        {!drawingsExists && (
          <h1
            className={`text-center text-5xl font-semibold mb-2 transition-all overflow-hidden ${
              isTop
                ? 'opacity-100 max-h-20 duration-500 ease-in'
                : 'opacity-0 max-h-0 duration-400 ease-out'
            }`}
          >
            Konki
          </h1>
        )}

        <div className="grid-container ml-13">
          {/* Toggle Completadas */}
          <div className="toggle">
            <button
              className="flex justify-center py-2 border-2 rounded-lg shadow-lg cursor-pointer gap-x-1 w-28 shadow-black"
              onClick={() => setShowCompleted(!showCompleted)}
            >
              {showCompleted ? 'Ocultar ' : 'Mostrar '}
              <Check size={23} />
            </button>
          </div>

          {/* Categoría */}
          <div className="relative category">
            <button
              className="flex items-center justify-center w-32 gap-1 py-2 border-2 rounded-lg shadow-lg cursor-pointer md:py-2 shadow-black"
              onClick={(e) => {
                e.stopPropagation() // Evita que el evento de <main> lo cierre
                setShowCategories((prev) => !prev)
              }}
            >
              {category.name}
              {IconComponent && <IconComponent size={18} />}
            </button>

            <ul
              className={`absolute w-32 border-2 rounded-lg top-0 shadow-lg z-10 transition-all duration-300
    ${
      showCategories || showCategoryOptions
        ? 'opacity-100  translate-y-11'
        : 'opacity-0 translate-y-3 pointer-events-none'
    }
  `}
            >
              <CategoryList setShowCategories={setShowCategories} />
            </ul>
          </div>

          {/* Agregar tarea */}
          <div className="flex flex-row justify-center gap-x-4 addTask">
            <input
              type="text"
              value={taskInput}
              maxLength={55}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              className="px-2 border-2 rounded-lg shadow-lg shadow-black"
              placeholder="Añade una tarea"
            />
            <button
              className="px-4 py-2 border-2 rounded-lg shadow-lg cursor-pointer md:py-1 md:px-3 shadow-black"
              onClick={addTask}
            >
              <Plus size={14} className="font-bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
