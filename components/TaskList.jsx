import { useTaskContext } from '../context/TaskContext'
import { useUIContext } from '../context/UIContext'
import { useCategoryContext } from '../context/CategoryContext'
import { iconMap } from '../utils/icons'

export function TaskList() {
  const { tasks, toggleCompleted, setSelectedTask } = useTaskContext()
  const { showCompleted, toggleModal } = useUIContext()
  const { categories } = useCategoryContext()

  const getCategoryIcon = (categoryName) => {
    const foundCategory = categories.find((cat) => cat.name === categoryName)
    return foundCategory ? iconMap[foundCategory.icon] : null
  }

  return (
    <div>
      <ul className="relative flex flex-col items-center w-11/12 mx-auto mt-50 md:mt-38 pb-50 md:pb-0">
        {tasks.map((task) => {
          const IconComponent = getCategoryIcon(task.category.name)

          return (
            <li
              key={task.id}
              className={` transition-all duration-700 overflow-hidden 
${
  !showCompleted && task.completed
    ? 'opacity-0 scale-y-0 max-h-0' // Ocultar con transición
    : 'opacity-100 max-h-20 pb-7' // Mostrar con transición
}  
`}
            >
              <div className="flex items-center gap-x-4">
                <span
                  className={`flex justify-center select-none text-center items-center gap-x-4 cursor-pointer border-b-2 px-2 shadow-lg md:px-5 leading-5 rounded-lg md:hover:px-7 transition-all duration-500 text-lg ${
                    task.completed
                      ? 'line-through text-zinc-500 shadow-none'
                      : 'pb-1'
                  }`}
                  onDoubleClick={() => {
                    setSelectedTask(task)
                    toggleModal('editTask')
                  }}
                  onClick={() => toggleCompleted(task.id)}
                >
                  {IconComponent && <IconComponent size={18} />}
                  {task.text.length > 30
                    ? `${task.text.slice(0, 30)}...`
                    : task.text}{' '}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
