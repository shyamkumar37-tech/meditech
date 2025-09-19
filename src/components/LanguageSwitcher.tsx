import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useVoice } from '../contexts/VoiceContext';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { speak } = useVoice();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    const selectedLang = languages.find(lang => lang.code === langCode);
    speak(`Language changed to ${selectedLang?.name}`);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            bg-gray-800/80 backdrop-blur-sm border border-gray-600
            hover:bg-gray-700/80 transition-colors duration-200
            text-white px-3 py-2 rounded-lg
            flex items-center gap-2 text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-blue-400
          "
          aria-label="Change language"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage?.native}</span>
          <span className="sm:hidden">{currentLanguage?.code.toUpperCase()}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="
            absolute top-full left-0 mt-2
            bg-white rounded-lg shadow-lg border border-gray-200
            min-w-[200px] py-2 z-50
          ">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`
                  w-full text-left px-4 py-2 hover:bg-gray-100
                  transition-colors duration-200
                  ${language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                `}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{lang.native}</span>
                  <span className="text-xs opacity-60">{lang.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;