import { TaskItem } from './TaskItem'

export function TaskGroup({
  relativeDate,
  tasks,
  getCategoryIcon,
  handleToggleCompleted,
  setSelectedTask,
  toggleModal,
  clickTimeoutRef,
  showCompleted,
  hasMounted,
}) {
  const hasIncompleteTasks = tasks.some((task) => !task.completed)

  return (
    <div
      key={relativeDate}
      className="flex flex-col items-center justify-center w-full"
    >
      <span
        className={`block px-2.5 py-0.5 ml-1 text-md rounded-md text-zinc-500 bg-zinc-200 select-none transition-all duration-500
        ${
          showCompleted || hasIncompleteTasks
            ? 'opacity-100 max-h-20 mb-5'
            : 'opacity-0 scale-y-0 max-h-0'
        }
        `}
      >
        {relativeDate}
      </span>

      {tasks.map((task) => {
        const IconComponent = getCategoryIcon(task.category?.name)

        return (
          <TaskItem
            key={task.id}
            task={task}
            IconComponent={IconComponent}
            handleToggleCompleted={handleToggleCompleted}
            setSelectedTask={setSelectedTask}
            toggleModal={toggleModal}
            clickTimeoutRef={clickTimeoutRef}
            showCompleted={showCompleted}
            hasMounted={hasMounted}
          />
        )
      })}
    </div>
  )
}
