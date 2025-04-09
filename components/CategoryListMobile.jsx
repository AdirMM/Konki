import { useCategoryContext } from '../context/CategoryContext'
import { iconMap } from '../utils/icons'

export function CategoryListMobile({ showCategories, setShowCategories }) {
  const { category, setCategory, categories } = useCategoryContext()

  return (
    <>
      <div className="p-2 mt-2 overflow-x-auto rounded-lg">
        {/* Lista de categorías animada */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            showCategories
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <ul className="flex flex-row max-w-xs px-2 overflow-x-auto md:max-w-md lg:max-w-lg gap-x-2 scrollbar-thin scrollbar-thumb-gray-300">
            {categories.map((cat) => {
              const IconComponent = iconMap[cat.icon]
              const isSelected = category.name === cat.name
              return (
                <li
                  key={cat.name}
                  className={`px-3 py-2 border rounded-lg cursor-pointer min-w-fit hover:opacity-50 whitespace-nowrap
                    ${
                      isSelected
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-50'
                    }
                    `}
                  onClick={() => {
                    setCategory(cat)
                  }}
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
    </>
  )
}
