import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useVoice } from '../../contexts/VoiceContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users,
  Video,
  FileText,
  Calendar,
  Activity,
  UserCheck,
  Clock,
  Phone,
  LogOut,
  AlertCircle
} from 'lucide-react';
import VoiceButton from '../VoiceButton';

const DoctorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { speak } = useVoice();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      speak(`Welcome Dr. ${user.name}, doctor dashboard loaded`);
    }
  }, [user]);

  const quickActions = [
    {
      id: 'queue',
      title: t('patientQueue'),
      icon: Users,
      color: 'bg-blue-600 hover:bg-blue-700',
      count: '8',
      description: 'Patients waiting'
    },
    {
      id: 'video',
      title: t('videoCall'),
      icon: Video,
      color: 'bg-green-600 hover:bg-green-700',
      count: '2',
      description: 'Active calls'
    },
    {
      id: 'prescription',
      title: t('prescription'),
      icon: FileText,
      color: 'bg-purple-600 hover:bg-purple-700',
      count: '12',
      description: 'Pending prescriptions'
    },
    {
      id: 'appointments',
      title: 'Today\'s Schedule',
      icon: Calendar,
      color: 'bg-orange-600 hover:bg-orange-700',
      count: '15',
      description: 'Appointments today'
    }
  ];

  const patientQueue = [
    {
      id: '1',
      name: 'Ramesh Kumar',
      age: 45,
      condition: 'Hypertension follow-up',
      priority: 'high',
      waitTime: '15 min',
      status: 'waiting'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      age: 32,
      condition: 'Diabetes consultation',
      priority: 'medium',
      waitTime: '8 min',
      status: 'in-progress'
    },
    {
      id: '3',
      name: 'Mohan Singh',
      age: 58,
      condition: 'Chest pain',
      priority: 'urgent',
      waitTime: '2 min',
      status: 'urgent'
    }
  ];

  const todayStats = [
    { label: 'Patients Seen', value: '12', change: '+3' },
    { label: 'Consultations', value: '8', change: '+2' },
    { label: 'Prescriptions', value: '15', change: '+5' },
    { label: 'Video Calls', value: '6', change: '+1' }
  ];

  const handleLogout = () => {
    speak('Logging out');
    logout();
    navigate('/');
  };

  const handlePatientSelect = (patient: any) => {
    speak(`Selected patient ${patient.name}, age ${patient.age}, condition ${patient.condition}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MediTech</h1>
              <p className="text-gray-400 text-sm">Doctor Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-white font-medium">Dr. {user?.name}</p>
              <p className="text-gray-400 text-sm">General Medicine</p>
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
        {/* Stats Overview */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Today's Overview</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {todayStats.map((stat, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <span className="text-green-400 text-xs">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <div
                key={action.id}
                className={`
                  ${action.color} rounded-xl p-6 cursor-pointer
                  transform transition-all duration-300 hover:scale-105
                  text-white relative overflow-hidden group
                `}
              >
                <div className="flex items-center justify-between mb-3">
                  <action.icon className="w-8 h-8" />
                  <VoiceButton 
                    size="sm"
                    ariaLabel={`Voice activate ${action.title}`}
                  />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-1">{action.count}</div>
                    <h4 className="font-semibold text-sm">{action.title}</h4>
                  </div>
                </div>
                <p className="text-white/70 text-xs mt-2">{action.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Queue & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patient Queue */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Patient Queue</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {patientQueue.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => handlePatientSelect(patient)}
                  className="bg-gray-700/50 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{patient.name}</p>
                        <p className="text-gray-400 text-sm">Age: {patient.age}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${patient.status === 'urgent' ? 'bg-red-600 text-white' : ''}
                        ${patient.status === 'in-progress' ? 'bg-green-600 text-white' : ''}
                        ${patient.status === 'waiting' ? 'bg-yellow-600 text-white' : ''}
                      `}>
                        {patient.status}
                      </span>
                      <p className="text-gray-400 text-xs mt-1">{patient.waitTime}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{patient.condition}</p>
                  
                  {patient.priority === 'urgent' && (
                    <div className="flex items-center gap-1 mt-2 text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs">Urgent priority</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Schedule & Alerts */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">10:00 AM - 12:00 PM</p>
                    <p className="text-gray-400 text-sm">General Consultations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-600/20 rounded-lg border-l-4 border-green-600">
                  <Video className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">2:00 PM - 3:00 PM</p>
                    <p className="text-gray-400 text-sm">Video Consultations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <Activity className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-white font-medium">4:00 PM - 6:00 PM</p>
                    <p className="text-gray-400 text-sm">Follow-up Reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">System Alerts</h3>
              <div className="space-y-3">
                <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 font-medium text-sm">Critical</span>
                  </div>
                  <p className="text-white text-sm">Patient Mohan Singh requires immediate attention</p>
                </div>
                <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium text-sm">Reminder</span>
                  </div>
                  <p className="text-white text-sm">5 prescriptions pending approval</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;