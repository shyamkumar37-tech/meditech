import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: any;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    appName: 'MediTech',
    welcome: 'Welcome to MediTech',
    selectRole: 'Select Your Role',
    patient: 'Patient',
    doctor: 'Doctor',
    healthWorker: 'Health Worker',
    pharmacist: 'Pharmacist',
    login: 'Login',
    username: 'Username',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    loginButton: 'Sign In',
    dashboard: 'Dashboard',
    bookAppointment: 'Book Appointment',
    chatbot: 'Health Assistant',
    medicalHistory: 'Medical History',
    prescriptions: 'Prescriptions',
    emergency: 'Emergency',
    patientQueue: 'Patient Queue',
    videoCall: 'Video Call',
    prescription: 'Write Prescription',
    registerPatient: 'Register Patient',
    assignDoctor: 'Assign Doctor',
    viewPrescription: 'View Prescription',
    dispense: 'Dispense Medicine',
    offline: 'You are offline',
    voiceNavigation: 'Voice Navigation',
    speakToNavigate: 'Speak to Navigate',
    listening: 'Listening...',
    language: 'Language'
  },
  hi: {
    appName: 'मेडीटेक',
    welcome: 'मेडीटेक में आपका स्वागत है',
    selectRole: 'अपनी भूमिका चुनें',
    patient: 'मरीज़',
    doctor: 'डॉक्टर',
    healthWorker: 'स्वास्थ्य कर्मचारी',
    pharmacist: 'फार्मासिस्ट',
    login: 'लॉगिन',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    forgotPassword: 'पासवर्ड भूल गए?',
    loginButton: 'साइन इन करें',
    dashboard: 'डैशबोर्ड',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    chatbot: 'स्वास्थ्य सहायक',
    medicalHistory: 'चिकित्सा इतिहास',
    prescriptions: 'नुस्खे',
    emergency: 'आपातकाल',
    patientQueue: 'मरीज़ों की कतार',
    videoCall: 'वीडियो कॉल',
    prescription: 'नुस्खा लिखें',
    registerPatient: 'मरीज़ का पंजीकरण',
    assignDoctor: 'डॉक्टर नियुक्त करें',
    viewPrescription: 'नुस्खा देखें',
    dispense: 'दवा दें',
    offline: 'आप ऑफ़लाइन हैं',
    voiceNavigation: 'वॉयस नेवीगेशन',
    speakToNavigate: 'नेवीगेट करने के लिए बोलें',
    listening: 'सुन रहे हैं...',
    language: 'भाषा'
  },
  ta: {
    appName: 'மெடிடெக்',
    welcome: 'மெடிடெக்கில் வரவேற்கிறோம்',
    selectRole: 'உங்கள் பாத்திரத்தைத் தேர்ந்தெடுக்கவும்',
    patient: 'நோயாளி',
    doctor: 'மருத்துவர்',
    healthWorker: 'சுகாதார பணியாளர்',
    pharmacist: 'மருந்தாளர்',
    login: 'உள்நுழைவு',
    username: 'பயனர் பெயர்',
    password: 'கடவுச்சொல்',
    forgotPassword: 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?',
    loginButton: 'உள்நுழைக',
    dashboard: 'முகப்புப் பலகை',
    bookAppointment: 'சந்திப்பு முன்பதிவு',
    chatbot: 'சுகாதார உதவியாளர்',
    medicalHistory: 'மருத்துவ வரலாறு',
    prescriptions: 'மருந்துச் சீட்டுகள்',
    emergency: 'அவசரநிலை',
    patientQueue: 'நோயாளிகள் வரிசை',
    videoCall: 'வீடியோ அழைப்பு',
    prescription: 'மருந்துச் சீட்டு எழுதவும்',
    registerPatient: 'நோயாளி பதிவு',
    assignDoctor: 'மருத்துவரை நியமிக்கவும்',
    viewPrescription: 'மருந்துச் சீட்டுகளைப் பார்க்கவும்',
    dispense: 'மருந்து வழங்கவும்',
    offline: 'நீங்கள் ஆஃப்லைனில் இருக்கிறீர்கள்',
    voiceNavigation: 'குரல் வழிசெலுத்தல்',
    speakToNavigate: 'செல்ல பேசவும்',
    listening: 'கேட்டுக்கொண்டிருக்கிறது...',
    language: 'மொழி'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('meditech-language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('meditech-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      translations: translations[language as keyof typeof translations],
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};