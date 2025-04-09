import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUIContext } from '../../context/UIContext'

export function Modal({ modalName, isOpen, onClose, title, children }) {
  const { modals, setModals } = useUIContext()
  const isAnimating = modals[modalName]?.isAnimating

  // Estado interno para controlar la visibilidad en el DOM
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowModal(true) // Mostrar el modal en el DOM

      // Pequeño delay para activar la animación después de montar
      setTimeout(() => {
        setModals((prev) => ({
          ...prev,
          [modalName]: { ...prev[modalName], isAnimating: true },
        }))
      }, 50) // Delay corto para que el DOM monte antes de animar
    } else {
      // Quita la animación primero
      setModals((prev) => ({
        ...prev,
        [modalName]: { ...prev[modalName], isAnimating: false },
      }))

      // Luego quita el modal del DOM
      setTimeout(() => {
        setShowModal(false)
      }, 300) // Coincidir con la duración de la animación
    }
  }, [isOpen, modalName, setModals])

  if (!showModal) return null // No renderiza el modal si está oculto

  return (
    // Fondo negro con animación de opacidad
    <div
      className={`fixed inset-0 flex items-center justify-center text-center bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300
      ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`relative bg-image shadow-lg rounded-xl w-11/12 md:w-[32rem] py-10 px-9 transition-all duration-300
          ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
      >
        {/* Botón de cierre */}
        <button
          className="absolute cursor-pointer top-3 right-3"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Título */}
        {title && <h2 className="mb-2 text-4xl font-semibold">{title}</h2>}

        {/* Contenido dinámico */}
        <div>{children}</div>
      </div>
    </div>
  )
}
