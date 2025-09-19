import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { VoiceProvider } from './contexts/VoiceContext';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import PatientDashboard from './components/dashboards/PatientDashboard';
import DoctorDashboard from './components/dashboards/DoctorDashboard';
import HealthWorkerDashboard from './components/dashboards/HealthWorkerDashboard';
import PharmacistDashboard from './components/dashboards/PharmacistDashboard';
import VoiceOverlay from './components/VoiceOverlay';
import LanguageSwitcher from './components/LanguageSwitcher';
import './App.css';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="App min-h-screen bg-gray-900 text-white">
      <AuthProvider>
        <LanguageProvider>
          <VoiceProvider>
            <Router>
              <div className="relative">
                {!isOnline && (
                  <div className="bg-red-600 text-white text-center py-2 px-4 text-sm">
                    You're offline. Some features may be limited.
                  </div>
                )}
                
                <LanguageSwitcher />
                <VoiceOverlay />
                
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login/:role" element={<LoginPage />} />
                  <Route path="/patient-dashboard" element={<PatientDashboard />} />
                  <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                  <Route path="/health-worker-dashboard" element={<HealthWorkerDashboard />} />
                  <Route path="/pharmacist-dashboard" element={<PharmacistDashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                
                {installPrompt && (
                  <div className="fixed bottom-4 left-4 right-4 bg-blue-600 p-4 rounded-lg shadow-lg z-50">
                    <p className="text-white mb-2">Install MediTech for easier access</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          installPrompt.prompt();
                          setInstallPrompt(null);
                        }}
                        className="bg-white text-blue-600 px-4 py-2 rounded font-medium"
                      >
                        Install
                      </button>
                      <button
                        onClick={() => setInstallPrompt(null)}
                        className="bg-transparent border border-white text-white px-4 py-2 rounded"
                      >
                        Later
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Router>
          </VoiceProvider>
        </LanguageProvider>
      </AuthProvider>
    </div>
  );
}

export default App;