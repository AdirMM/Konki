import { Menu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useUIContext } from '../context/UIContext'

export function ActionMenu() {
  const [actionMenu, setActionMenu] = useState(false)
  const { toggleModal } = useUIContext()

  const handleActions = () => setActionMenu((prev) => !prev)

  const menuRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActionMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [actionMenu, setActionMenu])

  return (
    <div ref={menuRef}>
      <Menu
        className={`
          absolute size-9 transition-all duration-500 cursor-pointer 
          top-5 md:fixed md:top-11 left-5
          md:left-auto md:translate-x-0 md:right-22
          z-20 hover:opacity-55 
          ${actionMenu ? 'rotate-90' : 'rotate-0'}
          `}
        onClick={handleActions}
      />

      <div
        className={`relative leading-4.5 flex md:flex-col gap-y-5 p-2 gap-x-4 md:w-32 md:fixed top-5 mx-auto md:top-13 md:right-10 transition-all duration-300 z-20 backdrop-blur-xs
          
        ${
          actionMenu
            ? 'translate-y-10 opacity-100'
            : 'translate-y-2 opacity-0 pointer-events-none'
        }
        `}
      >
        <button
          className="px-4 py-3 bg-white border-2 border-black rounded-lg shadow-lg cursor-pointer md:py-2 hover:opacity-55 shadow-black"
          onClick={() => {
            toggleModal('categories')
            setActionMenu((prev) => !prev)
          }}
        >
          Categorias
        </button>
        <button
          className="px-2 py-3 text-red-600 bg-white border-2 border-black rounded-lg shadow-lg cursor-pointer md:py-1 hover:opacity-55 shadow-black"
          onClick={() => {
            toggleModal('message')
            setActionMenu((prev) => !prev)
          }}
        >
          Eliminar todas las tareas completadas
        </button>
      </div>
    </div>
  )
}
