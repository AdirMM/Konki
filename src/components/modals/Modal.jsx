import { X } from 'lucide-react'
import { useRef } from 'react'
import { useHandleClickOutside } from '../../hooks/useHandleClickOutside'
import { useModalTransition } from '../../hooks/useModalTransition'
export function Modal({ modalName, isOpen, onClose, title, children }) {
  const { showModal, isAnimating } = useModalTransition(modalName, isOpen)
  const modalRef = useRef()
  useHandleClickOutside(modalRef, onClose)
  if (!showModal) return null

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center text-center bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300
      ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        ref={modalRef}
        className={`relative bg-image shadow-lg rounded-xl w-11/12 md:w-[32rem] py-10 px-9 transition-all duration-300
          ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
      >
        <button
          className="absolute cursor-pointer top-3 right-3"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {title && <h2 className="mb-2 text-4xl font-semibold">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  )
}
