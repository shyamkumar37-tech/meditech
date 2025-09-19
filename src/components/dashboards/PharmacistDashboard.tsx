import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useVoice } from '../../contexts/VoiceContext';
import { useNavigate } from 'react-router-dom';
import { 
  Pill,
  FileText,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  LogOut,
  User,
  Calendar
} from 'lucide-react';
import VoiceButton from '../VoiceButton';

const PharmacistDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { speak } = useVoice();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      speak(`Welcome ${user.name}, pharmacist dashboard loaded`);
    }
  }, [user]);

  const quickActions = [
    {
      id: 'prescriptions',
      title: t('viewPrescription'),
      icon: FileText,
      color: 'bg-blue-600 hover:bg-blue-700',
      count: '18',
      description: 'Pending prescriptions'
    },
    {
      id: 'dispense',
      title: t('dispense'),
      icon: Pill,
      color: 'bg-green-600 hover:bg-green-700',
      count: '12',
      description: 'Ready to dispense'
    },
    {
      id: 'inventory',
      title: 'Inventory',
      icon: Package,
      color: 'bg-purple-600 hover:bg-purple-700',
      count: '245',
      description: 'Medicines in stock'
    },
    {
      id: 'alerts',
      title: 'Low Stock Alerts',
      icon: AlertTriangle,
      color: 'bg-red-600 hover:bg-red-700',
      count: '8',
      description: 'Items running low'
    }
  ];

  const pendingPrescriptions = [
    {
      id: '1',
      patientName: 'Ramesh Kumar',
      doctorName: 'Dr. Sharma',
      medicines: [
        { name: 'Amlodipine 5mg', quantity: '30 tablets', instructions: '1 tablet daily' },
        { name: 'Metformin 500mg', quantity: '60 tablets', instructions: '2 tablets daily' }
      ],
      prescriptionDate: '2024-01-15',
      status: 'pending',
      priority: 'normal'
    },
    {
      id: '2',
      patientName: 'Priya Sharma',
      doctorName: 'Dr. Gupta',
      medicines: [
        { name: 'Insulin Glargine', quantity: '3 vials', instructions: 'As directed' },
        { name: 'Glucose strips', quantity: '100 strips', instructions: 'For testing' }
      ],
      prescriptionDate: '2024-01-15',
      status: 'urgent',
      priority: 'high'
    },
    {
      id: '3',
      patientName: 'Mohan Singh',
      doctorName: 'Dr. Patel',
      medicines: [
        { name: 'Aspirin 75mg', quantity: '30 tablets', instructions: '1 tablet daily' },
        { name: 'Atorvastatin 20mg', quantity: '30 tablets', instructions: '1 tablet at bedtime' }
      ],
      prescriptionDate: '2024-01-14',
      status: 'ready',
      priority: 'normal'
    }
  ];

  const inventoryAlerts = [
    { medicine: 'Paracetamol 500mg', currentStock: 45, minStock: 100, status: 'low' },
    { medicine: 'Amoxicillin 250mg', currentStock: 8, minStock: 50, status: 'critical' },
    { medicine: 'ORS Packets', currentStock: 15, minStock: 100, status: 'low' },
    { medicine: 'Insulin Vials', currentStock: 2, minStock: 20, status: 'critical' }
  ];

  const dailyStats = [
    { label: 'Dispensed', value: '24', change: '+8', color: 'text-green-400' },
    { label: 'Pending', value: '18', change: '+3', color: 'text-yellow-400' },
    { label: 'Revenue', value: '₹12,450', change: '+15%', color: 'text-blue-400' },
    { label: 'Customers', value: '32', change: '+5', color: 'text-purple-400' }
  ];

  const handleLogout = () => {
    speak('Logging out');
    logout();
    navigate('/');
  };

  const handlePrescriptionAction = (prescription: any, action: string) => {
    speak(`${action} prescription for ${prescription.patientName}`);
  };

  const readPrescription = (prescription: any) => {
    const medicineList = prescription.medicines.map((med: any) => 
      `${med.name}, ${med.quantity}, ${med.instructions}`
    ).join('. ');
    
    speak(`Prescription for ${prescription.patientName} by ${prescription.doctorName}. Medicines: ${medicineList}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MediTech</h1>
              <p className="text-gray-400 text-sm">Pharmacy Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-gray-400 text-sm">Licensed Pharmacist</p>
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
          <h3 className="text-xl font-bold text-white mb-4">Today's Overview</h3>
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
          {/* Pending Prescriptions */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Pending Prescriptions</h3>
              <div className="flex gap-2">
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {pendingPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{prescription.patientName}</p>
                        <p className="text-gray-400 text-sm">By: {prescription.doctorName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${prescription.status === 'pending' ? 'bg-yellow-600 text-white' : ''}
                        ${prescription.status === 'urgent' ? 'bg-red-600 text-white' : ''}
                        ${prescription.status === 'ready' ? 'bg-green-600 text-white' : ''}
                      `}>
                        {prescription.status}
                      </span>
                      <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {prescription.prescriptionDate}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-white font-medium text-sm mb-2">Medicines:</h4>
                    <div className="space-y-1">
                      {prescription.medicines.map((medicine, index) => (
                        <div key={index} className="text-gray-300 text-sm bg-gray-800/50 rounded p-2">
                          <div className="flex justify-between items-start">
                            <span className="font-medium">{medicine.name}</span>
                            <span className="text-gray-400">{medicine.quantity}</span>
                          </div>
                          <p className="text-gray-400 text-xs mt-1">{medicine.instructions}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => readPrescription(prescription)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <VoiceButton size="sm" />
                      Read Aloud
                    </button>
                    <button
                      onClick={() => handlePrescriptionAction(prescription, 'Dispense')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Dispense
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Alerts & Recent Activity */}
          <div className="space-y-6">
            {/* Inventory Alerts */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Inventory Alerts</h3>
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="space-y-3">
                {inventoryAlerts.map((item, index) => (
                  <div
                    key={index}
                    className={`
                      p-3 rounded-lg border-l-4
                      ${item.status === 'critical' 
                        ? 'bg-red-600/20 border-red-600' 
                        : 'bg-yellow-600/20 border-yellow-600'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-white font-medium text-sm">{item.medicine}</p>
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${item.status === 'critical' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'}
                      `}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">
                      Current: {item.currentStock} | Minimum: {item.minStock}
                    </p>
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
                    <p className="text-white text-sm">Dispensed medicines to Ramesh Kumar</p>
                    <p className="text-gray-400 text-xs">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <Package className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white text-sm">Updated inventory: Paracetamol restocked</p>
                    <p className="text-gray-400 text-xs">30 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white text-sm">Low stock alert: Insulin vials</p>
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

export default PharmacistDashboard;