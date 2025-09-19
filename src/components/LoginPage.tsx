import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useVoice } from '../contexts/VoiceContext';
import { 
  Heart, 
  UserCheck, 
  Users, 
  Pill, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Loader
} from 'lucide-react';
import VoiceButton from './VoiceButton';

const LoginPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
  const { speak } = useVoice();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const roleConfig = {
    'patient': {
      icon: Heart,
      name: t('patient'),
      color: 'bg-blue-600',
      gradient: 'from-blue-600 to-blue-800'
    },
    'doctor': {
      icon: UserCheck,
      name: t('doctor'),
      color: 'bg-green-600',
      gradient: 'from-green-600 to-green-800'
    },
    'health-worker': {
      icon: Users,
      name: t('healthWorker'),
      color: 'bg-orange-600',
      gradient: 'from-orange-600 to-orange-800'
    },
    'pharmacist': {
      icon: Pill,
      name: t('pharmacist'),
      color: 'bg-purple-600',
      gradient: 'from-purple-600 to-purple-800'
    }
  };

  const currentRole = roleConfig[role as keyof typeof roleConfig];

  useEffect(() => {
    if (currentRole) {
      speak(`${t('login')} ${currentRole.name}`);
    }
  }, [currentRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      speak('Please fill in all fields');
      return;
    }

    const success = await login(formData.username, formData.password, role!);
    
    if (success) {
      speak(`Welcome ${formData.username}`);
      // Navigate to appropriate dashboard
      const dashboardRoutes = {
        'patient': '/patient-dashboard',
        'doctor': '/doctor-dashboard',
        'health-worker': '/health-worker-dashboard',
        'pharmacist': '/pharmacist-dashboard'
      };
      navigate(dashboardRoutes[role as keyof typeof dashboardRoutes]);
    } else {
      setError('Invalid credentials');
      speak('Invalid credentials');
    }
  };

  const handleVoiceInput = (field: string) => {
    speak(`Please speak your ${field}`);
    // This would integrate with speech recognition
  };

  if (!currentRole) {
    return <div>Invalid role</div>;
  }

  const IconComponent = currentRole.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentRole.gradient} to-black`}>
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center gap-2">
          <IconComponent className="w-8 h-8 text-white" />
          <h1 className="text-xl font-bold text-white">{currentRole.name}</h1>
        </div>
        
        <div className="w-16"></div> {/* Spacer for centering */}
      </header>

      {/* Login Form */}
      <main className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            {/* Role Icon */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('login')} - {currentRole.name}
              </h2>
              <p className="text-white/80 text-sm">Enter your credentials to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-white text-sm font-medium mb-2">
                  {t('username')}
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    placeholder={`Enter your ${t('username').toLowerCase()}`}
                    required
                  />
                  <VoiceButton
                    onVoiceClick={() => handleVoiceInput('username')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    ariaLabel="Voice input for username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                  {t('password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 pr-20 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    placeholder={`Enter your ${t('password').toLowerCase()}`}
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                    <VoiceButton
                      onVoiceClick={() => handleVoiceInput('password')}
                      size="sm"
                      ariaLabel="Voice input for password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-white/80 text-sm hover:text-white transition-colors"
                  onClick={() => speak('Contact your administrator for password reset')}
                >
                  {t('forgotPassword')}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full py-4 px-6 bg-white text-gray-900 font-semibold rounded-lg
                  hover:bg-gray-100 transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-white/50
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                  text-lg min-h-[48px]
                `}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <IconComponent className="w-5 h-5" />
                    {t('loginButton')}
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-black/20 rounded-lg">
              <p className="text-white/60 text-xs mb-2">Demo credentials:</p>
              <p className="text-white/80 text-sm">Username: demo | Password: demo123</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;