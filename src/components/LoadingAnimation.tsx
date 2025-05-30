
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2 } from 'lucide-react';

const LoadingAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <div className="relative">
        {/* Spinning outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-4 border-purple-500/20 border-t-purple-500 rounded-full"
        />
        
        {/* Pulsing inner circle */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center"
        >
          <Wand2 className="w-8 h-8 text-white" />
        </motion.div>
        
        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
              left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
          </motion.div>
        ))}
      </div>
      
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="mt-8 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-2">Creating Your Masterpiece</h3>
        <p className="text-gray-400">AI is working its magic...</p>
        
        {/* Progress steps */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          {['Understanding', 'Creating', 'Enhancing'].map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 1, duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-sm text-gray-400">{step}</span>
              {index < 2 && <div className="w-8 h-px bg-gray-600 mx-2" />}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation;
