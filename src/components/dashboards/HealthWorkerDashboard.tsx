import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useVoice } from '../../contexts/VoiceContext';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus,
  Users,
  UserCheck,
  AlertTriangle,
  Activity,
  MapPin,
  Phone,
  Clock,
  LogOut,
  CheckCircle,
  XCircle
} from 'lucide-react';
import VoiceButton from '../VoiceButton';

const HealthWorkerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { speak } = useVoice();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      speak(`Welcome ${user.name}, health worker dashboard loaded`);
    }
  }, [user]);

  const quickActions = [
    {
      id: 'register',
      title: t('registerPatient'),
      icon: UserPlus,
      color: 'bg-blue-600 hover:bg-blue-700',
      count: '24',
      description: 'New registrations today'
    },
    {
      id: 'assign',
      title: t('assignDoctor'),
      icon: UserCheck,
      color: 'bg-green-600 hover:bg-green-700',
      count: '8',
      description: 'Pending assignments'
    },
    {
      id: 'queue',
      title: 'Manage Queue',
      icon: Users,
      color: 'bg-purple-600 hover:bg-purple-700',
      count: '15',
      description: 'Patients in queue'
    },
    {
      id: 'emergency',
      title: 'Emergency Cases',
      icon: AlertTriangle,
      color: 'bg-red-600 hover:bg-red-700',
      count: '2',
      description: 'Urgent cases'
    }
  ];

  const recentRegistrations = [
    {
      id: '1',
      name: 'Sunita Devi',
      age: 35,
      village: 'Rampur',
      condition: 'Pregnancy check-up',
      registeredTime: '10 minutes ago',
      status: 'waiting'
    },
    {
      id: '2',
      name: 'Ravi Kumar',
      age: 42,
      village: 'Bharatpur',
      condition: 'Diabetes follow-up',
      registeredTime: '25 minutes ago',
      status: 'assigned'
    },
    {
      id: '3',
      name: 'Kamala Singh',
      age: 58,
      village: 'Shyampur',
      condition: 'Hypertension',
      registeredTime: '1 hour ago',
      status: 'completed'
    }
  ];

  const dailyStats = [
    { label: 'Registrations', value: '24', change: '+6', color: 'text-blue-400' },
    { label: 'Assignments', value: '18', change: '+4', color: 'text-green-400' },
    { label: 'Consultations', value: '22', change: '+8', color: 'text-purple-400' },
    { label: 'Emergencies', value: '3', change: '+1', color: 'text-red-400' }
  ];

  const villages = [
    { name: 'Rampur', patients: 8, status: 'active' },
    { name: 'Bharatpur', patients: 5, status: 'active' },
    { name: 'Shyampur', patients: 12, status: 'high' },
    { name: 'Govindpur', patients: 3, status: 'low' }
  ];

  const handleLogout = () => {
    speak('Logging out');
    logout();
    navigate('/');
  };

  const handlePatientAction = (patient: any, action: string) => {
    speak(`${action} for patient ${patient.name} from ${patient.village}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MediTech</h1>
              <p className="text-gray-400 text-sm">Health Worker Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-gray-400 text-sm">Community Health Worker</p>
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
        {/* Daily Stats */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Today's Statistics</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {dailyStats.map((stat, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <span className={`${stat.color} text-xs font-medium`}>{stat.change}</span>
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Registrations */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Recent Registrations</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentRegistrations.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{patient.name}</p>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{patient.village}</span>
                          <span>•</span>
                          <span>Age: {patient.age}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${patient.status === 'waiting' ? 'bg-yellow-600 text-white' : ''}
                        ${patient.status === 'assigned' ? 'bg-blue-600 text-white' : ''}
                        ${patient.status === 'completed' ? 'bg-green-600 text-white' : ''}
                      `}>
                        {patient.status}
                      </span>
                      <p className="text-gray-400 text-xs mt-1">{patient.registeredTime}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{patient.condition}</p>
                  
                  {patient.status === 'waiting' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePatientAction(patient, 'Assign doctor')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
                      >
                        Assign Doctor
                      </button>
                      <button
                        onClick={() => handlePatientAction(patient, 'Mark emergency')}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Village Coverage & Activity */}
          <div className="space-y-6">
            {/* Village Coverage */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Village Coverage</h3>
              <div className="space-y-3">
                {villages.map((village, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">{village.name}</p>
                        <p className="text-gray-400 text-sm">{village.patients} active patients</p>
                      </div>
                    </div>
                    <span className={`
                      w-3 h-3 rounded-full
                      ${village.status === 'high' ? 'bg-red-500' : ''}
                      ${village.status === 'active' ? 'bg-green-500' : ''}
                      ${village.status === 'low' ? 'bg-yellow-500' : ''}
                    `}></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white text-sm">Assigned Dr. Sharma to Sunita Devi</p>
                    <p className="text-gray-400 text-xs">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <UserPlus className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white text-sm">Registered new patient: Ravi Kumar</p>
                    <p className="text-gray-400 text-xs">25 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white text-sm">Escalated emergency case to senior doctor</p>
                    <p className="text-gray-400 text-xs">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthWorkerDashboard;