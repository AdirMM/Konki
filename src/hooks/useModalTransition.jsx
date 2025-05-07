import { useEffect, useState } from 'react'
import { useUIContext } from '../context/UIContext'

export function useModalTransition(modalName, isOpen, duration = 300) {
  const { modals, setModals } = useUIContext()
  const [showModal, setShowModal] = useState(false)

  const isAnimating = modals[modalName]?.isAnimating

  useEffect(() => {
    if (isOpen) {
      setShowModal(true)

      // Activar animación tras montaje
      setTimeout(() => {
        setModals((prev) => ({
          ...prev,
          [modalName]: { ...prev[modalName], isAnimating: true },
        }))
      }, 50)
    } else {
      // Desactivar animación
      setModals((prev) => ({
        ...prev,
        [modalName]: { ...prev[modalName], isAnimating: false },
      }))

      // Ocultar modal tras animación
      setTimeout(() => {
        setShowModal(false)
      }, duration)
    }
  }, [isOpen, modalName, duration, setModals])

  return { showModal, isAnimating }
}
