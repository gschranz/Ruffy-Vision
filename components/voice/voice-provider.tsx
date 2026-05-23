import React, { createContext, useContext, useState, ReactNode } from 'react';

type VoiceStatus = 'idle' | 'listening' | 'speaking' | 'thinking';

interface VoiceContextType {
  status: VoiceStatus;
  isActive: boolean;
  toggleActive: () => void;
  setStatusUpdate: (status: VoiceStatus) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<VoiceStatus>('idle');

  const toggleActive = () => {
    const nextActive = !isActive;
    setIsActive(nextActive);
    setStatus(nextActive ? 'listening' : 'idle');
  };

  const setStatusUpdate = (newStatus: VoiceStatus) => {
    setStatus(newStatus);
  };

  return (
    <VoiceContext.Provider value={{ isActive, status, toggleActive, setStatusUpdate }}>
      {children}
    </VoiceContext.Provider>
  );
}

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};
