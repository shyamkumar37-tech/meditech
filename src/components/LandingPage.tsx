import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useVoice } from '../contexts/VoiceContext';
import { 
  Heart, 
  Users, 
  UserCheck, 
  Pill,
  Mic,
  ArrowRight
} from 'lucide-react';
import VoiceButton from './VoiceButton';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { speak } = useVoice();

  useEffect(() => {
    speak(t('welcome'));
  }, []);

  const roles = [
    {
      id: 'patient',
      name: t('patient'),
      icon: Heart,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Book appointments, consult doctors, manage health records'
    },
    {
      id: 'doctor',
      name: t('doctor'),
      icon: UserCheck,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Manage patients, conduct consultations, write prescriptions'
    },
    {
      id: 'health-worker',
      name: t('healthWorker'),
      icon: Users,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Register patients, coordinate care, manage queues'
    },
    {
      id: 'pharmacist',
      name: t('pharmacist'),
      icon: Pill,
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'View prescriptions, dispense medicines, manage inventory'
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    speak(`${t('login')} ${t(roleId)}`);
    navigate(`/login/${roleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="text-center py-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-12 h-12 text-red-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t('appName')}
          </h1>
        </div>
        <p className="text-xl text-gray-300 mb-2">{t('welcome')}</p>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Rural Healthcare Made Simple - Accessible, Voice-Enabled, Multilingual
        </p>
      </header>

      {/* Role Selection */}
      <main className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{t('selectRole')}</h2>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Mic className="w-5 h-5" />
              <span className="text-sm">{t('speakToNavigate')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`
                  ${role.color} 
                  rounded-xl p-6 cursor-pointer transform transition-all duration-300
                  hover:scale-105 hover:shadow-2xl
                  min-h-[200px] flex flex-col justify-between
                  border border-gray-600 relative overflow-hidden
                  group
                `}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-12 translate-y-12"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <role.icon className="w-12 h-12 text-white" />
                    <VoiceButton
                      onVoiceClick={() => handleRoleSelect(role.id)}
                      ariaLabel={`Voice select ${role.name}`}
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{role.name}</h3>
                  <p className="text-gray-200 text-sm mb-4 opacity-90">
                    {role.description}
                  </p>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-white font-medium">{t('login')}</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Voice Navigation</h3>
              <p className="text-gray-400 text-sm">Speak to navigate, no typing needed</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Offline Support</h3>
              <p className="text-gray-400 text-sm">Works with slow internet connections</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Multilingual</h3>
              <p className="text-gray-400 text-sm">Available in multiple Indian languages</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;