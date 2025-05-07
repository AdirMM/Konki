import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useUIContext } from '../context/UIContext'

export function CountMarks({ completedTasks }) {
  const { drawingsExists } = useUIContext()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasMounted(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  const groups = useMemo(() => {
    const count = Math.floor(completedTasks / 5)
    const remainder = completedTasks % 5
    return { count, remainder }
  }, [completedTasks])

  return (
    <div
      className={`z-10 flex flex-col items-center justify-center w-10/12 mt-20 md:mt-60 opacity-60 md:absolute md:w-32 md:left-6 transition-all duration-500 ${
        completedTasks > 0 ? 'max-h-20 md:max-h-max' : 'max-h-0 overflow-hidden'
      }`}
    >
      {!drawingsExists && (
        // Contador numérico
        <motion.span
          key={completedTasks}
          initial={hasMounted ? { scale: 0.8, opacity: 0 } : false}
          animate={hasMounted ? { scale: 1, opacity: 1 } : false}
          transition={{ duration: 0.3, delay: 0.2 }} // 800ms de retraso
          className="text-3xl font-bold text-black md:top-0"
        >
          {completedTasks}
        </motion.span>
      )}

      {/* Grupos de marcas */}
      <div className="relative flex md:flex-col flex-wrap md:justify-start items-center justify-center w-full gap-x-10 gap-y-1 min-h-[50px] md:min-h-screen md:top-0 md:mt-5">
        {[...Array(groups.count)].map((_, i) => (
          <motion.div
            key={i}
            initial={hasMounted ? { opacity: 0, y: 10, scale: 0.8 } : false}
            animate={hasMounted ? { opacity: 1, y: 0, scale: 1 } : false}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }} // 800ms de retraso
            className="flex flex-row items-center justify-center h-10 scale-150 gap-x-1 md:h-16"
          >
            {[...Array(4)].map((_, j) => (
              <motion.div
                key={j}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1.2 }}
                transition={{ duration: 0.3, delay: 0.2 + j * 0.1 }} // 800ms de retraso y luego 100ms por marca
                className="w-0.5 h-4 bg-black"
              />
            ))}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1.2 }}
              transition={{ duration: 0.3, delay: 0.2 + 0.4 }} // 800ms de retraso y luego 400ms
              className="w-6 h-0.5 bg-black absolute rotate-45"
            />
          </motion.div>
        ))}

        {/* Resto de marcas */}
        {groups.remainder > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }} // 800ms de retraso
            className="flex flex-row gap-2"
          >
            {[...Array(groups.remainder)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }} // 800ms de retraso y luego 100ms por marca
                className="w-0.5 h-8 bg-black"
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
