import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

interface VoiceContextType {
  isListening: boolean;
  isVoiceEnabled: boolean;
  toggleVoice: () => void;
  speak: (text: string) => void;
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }

    // Initialize speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = getLanguageCode(language);
      
      recognitionInstance.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        handleVoiceCommand(result);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [language]);

  const getLanguageCode = (lang: string) => {
    const languageCodes: { [key: string]: string } = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'ml': 'ml-IN',
      'pa': 'pa-IN'
    };
    return languageCodes[lang] || 'en-US';
  };

  const speak = (text: string) => {
    if (synthesis && isVoiceEnabled) {
      synthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode(language);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      synthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.lang = getLanguageCode(language);
      recognition.start();
      setIsListening(true);
      speak(t('listening'));
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleVoice = () => {
    const newState = !isVoiceEnabled;
    setIsVoiceEnabled(newState);
    if (newState) {
      speak(t('voiceNavigation') + ' ' + t('enabled'));
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Basic navigation commands
    if (lowerCommand.includes('home') || lowerCommand.includes('होम') || lowerCommand.includes('வீடு')) {
      window.location.href = '/';
    } else if (lowerCommand.includes('login') || lowerCommand.includes('लॉगिन') || lowerCommand.includes('உள்நுழைவு')) {
      // Handle login navigation
    } else if (lowerCommand.includes('help') || lowerCommand.includes('मदद') || lowerCommand.includes('உதவி')) {
      speak(t('speakToNavigate'));
    }
  };

  return (
    <VoiceContext.Provider value={{
      isListening,
      isVoiceEnabled,
      toggleVoice,
      speak,
      startListening,
      stopListening,
      transcript
    }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};