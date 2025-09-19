import React from 'react';
import { useVoice } from '../contexts/VoiceContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Mic, MicOff, Volume2 } from 'lucide-react';

const VoiceOverlay: React.FC = () => {
  const { isListening, isVoiceEnabled, toggleVoice, transcript } = useVoice();
  const { t } = useLanguage();

  return (
    <>
      {/* Voice Toggle Button */}
      <button
        onClick={toggleVoice}
        className={`
          fixed top-4 right-4 z-50 w-12 h-12 rounded-full
          flex items-center justify-center
          transition-all duration-300 shadow-lg
          ${isVoiceEnabled 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-600 hover:bg-gray-700 text-white/60'
          }
          focus:outline-none focus:ring-2 focus:ring-blue-400
        `}
        aria-label={isVoiceEnabled ? 'Disable voice' : 'Enable voice'}
        title={isVoiceEnabled ? 'Voice Enabled' : 'Enable Voice'}
      >
        {isVoiceEnabled ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <MicOff className="w-6 h-6" />
        )}
      </button>

      {/* Listening Indicator */}
      {isListening && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Mic className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('listening')}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Speak clearly into your device
              </p>
              {transcript && (
                <div className="bg-gray-100 rounded-lg p-3 mt-4">
                  <p className="text-gray-800 text-sm">{transcript}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceOverlay;