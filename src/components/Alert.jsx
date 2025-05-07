import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export function Alert({ message, isVisible, onClose, duration = 2000 }) {
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timeout)
    }
  }, [isVisible, onClose, duration])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="fixed z-50 px-.5 py-1 text-center text-white transform -translate-x-1/2 bg-green-500 rounded-lg shadow-lg top-4 left-1/2"
        >
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
