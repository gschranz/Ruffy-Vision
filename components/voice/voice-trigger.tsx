import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { useVoice } from './voice-provider';

export function VoiceTrigger() {
  const { isActive, toggleActive, status } = useVoice();

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2">
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-background/80 backdrop-blur-sm border px-3 py-1 rounded-full text-xs font-medium shadow-sm"
          >
            {status === 'listening' ? 'Listening...' : status === 'speaking' ? 'Speaking...' : 'Thinking...'}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleActive}
        className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-all duration-500 focus:outline-none ${
          isActive 
          ? 'bg-primary text-primary-foreground scale-110 shadow-primary/50' 
          : 'bg-secondary text-secondary-foreground hover:bg-accent'
        }`}
        aria-label={isActive ? "Deactivate Voice" : "Activate Voice"}
      >
        {/* Pulsing Rings when active */}
        {isActive && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut", delay: 0.5 }}
            />
          </>
        )}

        {/* Icon with subtle scale animation */}
        <motion.div
          animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          {isActive ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
        </motion.div>
      </button>
    </div>
  );
}
