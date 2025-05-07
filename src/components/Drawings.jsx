import { useState, useEffect } from 'react'
import options from '../assets/options.png'
import filter from '../assets/filter.png'
import addtask from '../assets/addtask.png'
import phrase from '../assets/phrase.png'
import draw from '../assets/draw.png'
import drawCategory from '../assets/drawCategory.png'
export function Drawings() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Simula un retraso para aplicar la transición
    const timeout = setTimeout(() => {
      setLoaded(true)
    }, 100) // Puedes ajustar el tiempo si es necesario

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div>
      <img
        className={`hidden md:block absolute w-[22rem] top-15 left-17 transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={draw}
        alt=""
      />
      <img
        className={`hidden md:block absolute w-[22rem] top-8 right-27 transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={drawCategory}
        alt=""
      />
      <img
        className={`block md:hidden absolute scale-80 top-[50%] left-[50%] translate-[-50%] transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={phrase}
        alt=""
      />
      <img
        className={`block md:hidden absolute scale-60 top-[68%] left-[65%] translate-[-50%] transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={addtask}
        alt=""
      />
      <img
        className={`block md:hidden absolute scale-55 top-1/17 left-[-13%] transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={options}
        alt=""
      />
      <img
        className={`absolute right-[-18%] block md:hidden scale-55 top-1/15 transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={filter}
        alt=""
      />
    </div>
  )
}
