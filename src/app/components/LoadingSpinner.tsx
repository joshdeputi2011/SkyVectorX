import { motion } from 'motion/react';
import { Plane } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Plane className="w-12 h-12 text-cyan-400" />
      </motion.div>
    </div>
  );
}
