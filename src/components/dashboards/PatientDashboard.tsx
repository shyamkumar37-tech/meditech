import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useVoice } from '../../contexts/VoiceContext';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar,
  MessageCircle,
  FileText,
  Pill,
  Phone,
  Heart,
  User,
  LogOut,
  Clock,
  MapPin
} from 'lucide-react';
import VoiceButton from '../VoiceButton';

const PatientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { speak } = useVoice();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      speak(`Welcome ${user.name}, patient dashboard loaded`);
    }
  }, [user]);

  const quickActions = [
    {
      id: 'appointment',
      title: t('bookAppointment'),
      icon: Calendar,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Schedule consultation with doctors',
      action: () => speak('Book appointment feature coming soon')
    },
    {
      id: 'chatbot',
      title: t('chatbot'),
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Get instant health advice',
      action: () => speak('Health assistant activated')
    },
    {
      id: 'history',
      title: t('medicalHistory'),
      icon: FileText,
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'View your medical records',
      action: () => speak('Medical history loading')
    },
    {
      id: 'prescriptions',
      title: t('prescriptions'),
      icon: Pill,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'View and download prescriptions',
      action: () => speak('Prescriptions loading')
    },
    {
      id: 'emergency',
      title: t('emergency'),
      icon: Phone,
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Call emergency services',
      action: () => speak('Emergency call initiated')
    }
  ];

  const recentActivity = [
    {
      type: 'appointment',
      title: 'Consultation with Dr. Sharma',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      type: 'prescription',
      title: 'Prescription received',
      time: '1 day ago',
      status: 'active'
    },
    {
      type: 'test',
      title: 'Blood test results available',
      time: '3 days ago',
      status: 'new'
    }
  ];

  const handleLogout = () => {
    speak('Logging out');
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MediTech</h1>
              <p className="text-gray-400 text-sm">Patient Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-gray-400 text-sm">Patient ID: {user?.id.slice(-6)}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
              <p className="text-blue-100 mb-4">How are you feeling today?</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Rural Health Center</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Next appointment: Today 2:00 PM</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {quickActions.map((action) => (
              <div
                key={action.id}
                onClick={action.action}
                className={`
                  ${action.color} rounded-xl p-6 cursor-pointer
                  transform transition-all duration-300 hover:scale-105
                  text-white relative overflow-hidden group
                  min-h-[140px] flex flex-col justify-between
                `}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <action.icon className="w-8 h-8" />
                    <VoiceButton 
                      onVoiceClick={action.action}
                      size="sm"
                      ariaLabel={`Voice activate ${action.title}`}
                    />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{action.title}</h4>
                </div>
                <p className="text-white/80 text-sm">{action.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity & Health Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    {activity.type === 'appointment' && <Calendar className="w-5 h-5 text-white" />}
                    {activity.type === 'prescription' && <Pill className="w-5 h-5 text-white" />}
                    {activity.type === 'test' && <FileText className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${activity.status === 'completed' ? 'bg-green-600 text-white' : ''}
                    ${activity.status === 'active' ? 'bg-blue-600 text-white' : ''}
                    ${activity.status === 'new' ? 'bg-orange-600 text-white' : ''}
                  `}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Health Summary */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Health Summary</h3>
            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Blood Pressure</span>
                  <span className="text-green-400 font-medium">Normal</span>
                </div>
                <div className="text-white font-bold">120/80 mmHg</div>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Heart Rate</span>
                  <span className="text-blue-400 font-medium">Good</span>
                </div>
                <div className="text-white font-bold">72 BPM</div>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Temperature</span>
                  <span className="text-green-400 font-medium">Normal</span>
                </div>
                <div className="text-white font-bold">98.6°F</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;