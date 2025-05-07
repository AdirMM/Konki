import { useState, useEffect } from 'react'
import dayMarks from '../assets/daymarks.png'
import consejo1 from '../assets/consejo1.png'
import consejo2 from '../assets/consejo2.png'
import todelete from '../assets/todelete.png'
import { useUIContext } from '../context/UIContext'

export function DrawingsBg({ completedTasks }) {
  const { firstTask, secondTask, drawingsExists } = useUIContext()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true)
    }, 100) // Retraso de 100ms para aplicar la transición

    return () => clearTimeout(timeout)
  }, [completedTasks])

  return (
    <div
      className={`transition-opacity duration-700 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {!drawingsExists && (
        <img
          className="absolute w-[10rem] top-20 -translate-x-1/2 left-1/2 md:top-40 md:left-22"
          src={dayMarks}
          alt=""
        />
      )}

      {firstTask && (
        <>
          <img
            className={`md:hidden absolute w-[9.5rem] top-2/5 left-7 transition-all duration-500 ease-in-out
        ${
          completedTasks === 0
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
            src={consejo1}
            alt=""
          />
          <img
            className={`md:hidden absolute w-[10rem] top-2/5 right-3 transition-all duration-500 ease-in-out
        ${
          completedTasks === 0
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
            src={consejo2}
            alt=""
          />
        </>
      )}

      {secondTask && (
        <img
          className="md:hidden absolute w-[11rem] top-4/6 left-1/2 translate-x-[-50%]"
          src={todelete}
          alt=""
        />
      )}
    </div>
  )
}
