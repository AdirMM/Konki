import { motion } from 'framer-motion'

export function EmptyState({ src }) {
  return (
    <motion.img
      key="empty"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="absolute w-[20rem] top-3/8 left-1/2 -translate-x-1/2"
      src={src}
    />
  )
}
