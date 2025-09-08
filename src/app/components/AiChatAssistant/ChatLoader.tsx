import { motion } from "framer-motion";

export const ChatLoader = () => {
  return (
    // <div className="border text-white">Loading Response</div>
    <div className="px-3 py-2 inline-flex items-center gap-2">
      <motion.span
        className="inline-block w-3 h-3 rounded-full bg-amber-50"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
