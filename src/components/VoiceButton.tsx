import React from 'react';
import { Mic } from 'lucide-react';
import { useVoice } from '../contexts/VoiceContext';

interface VoiceButtonProps {
  onVoiceClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ 
  onVoiceClick, 
  className = '', 
  size = 'md',
  ariaLabel = 'Voice input'
}) => {
  const { isListening, startListening, isVoiceEnabled } = useVoice();

  const sizeClasses = {
    sm: 'w-8 h-8 p-1',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-3'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleClick = () => {
    if (onVoiceClick) {
      onVoiceClick();
    } else {
      startListening();
    }
  };

  if (!isVoiceEnabled) return null;

  return (
    <button
      onClick={handleClick}
      className={`
        ${sizeClasses[size]}
        ${isListening ? 'bg-red-500 animate-pulse' : 'bg-white/20 hover:bg-white/30'}
        rounded-full flex items-center justify-center
        transition-all duration-200 border border-white/30
        focus:outline-none focus:ring-2 focus:ring-white/50
        ${className}
      `}
      aria-label={ariaLabel}
      title={isListening ? 'Listening...' : 'Click to use voice input'}
    >
      <Mic className={`${iconSizes[size]} text-white`} />
    </button>
  );
};

export default VoiceButton;