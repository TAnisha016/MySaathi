import { useState } from 'react';
import { ArrowLeft, Star, Flame, BookOpen, Clock, Globe, Bell, Sun, Wifi, Volume2, TrendingUp, Heart, Search, HelpCircle, Share2, LogOut } from 'lucide-react';
import type { UserProfile } from '../../App';
import { WellnessDashboard } from './WellnessDashboard';
import { FactChecker } from './FactChecker';

interface ProfileSettingsProps {
  profile: UserProfile;
  onLogout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

type View = 'profile' | 'wellness' | 'factchecker';

export function ProfileSettings({ profile, onLogout, updateProfile }: ProfileSettingsProps) {
  const [currentView, setCurrentView] = useState<View>('profile');

  if (currentView === 'wellness') {
    return <WellnessDashboard profile={profile} onBack={() => setCurrentView('profile')} />;
  }

  if (currentView === 'factchecker') {
    return <FactChecker onBack={() => setCurrentView('profile')} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-3">
          <ArrowLeft size={24} className="text-[#2C3E50]" />
          <h1 className="text-xl font-bold text-[#2C3E50]">Profile & Settings</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#FF9933] to-[#FFB366] rounded-3xl p-6 text-white text-center shadow-lg">
          <div className="text-6xl mb-3">👤</div>
          <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
          <p className="text-sm opacity-90">{profile.grade} • Student</p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="font-bold text-[#2C3E50] mb-4">Your Stats:</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star size={20} className="text-[#FFD700]" />
                <span className="text-[#2C3E50]">Total Points:</span>
              </div>
              <span className="font-bold text-[#FF9933]">{profile.points || 850} ⭐</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame size={20} className="text-[#FF9933]" />
                <span className="text-[#2C3E50]">Learning Streak:</span>
              </div>
              <span className="font-bold text-[#FF9933]">{profile.streak || 5} days 🔥</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-[#138808]" />
                <span className="text-[#2C3E50]">Topics Mastered:</span>
              </div>
              <span className="font-bold text-[#FF9933]">{profile.topicsMastered || 23} 📚</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-[#138808]" />
                <span className="text-[#2C3E50]">Hours Learned:</span>
              </div>
              <span className="font-bold text-[#FF9933]">{profile.hoursLearned || 42.5} ⏱</span>
            </div>
          </div>
        </div>

        {/* MySaathi Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="font-bold text-[#2C3E50] mb-4 flex items-center gap-2">
            <span>🤖</span> MySaathi Settings
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#2C3E50]">Nickname: "{profile.nickname}"</span>
          </div>
          <button className="w-full bg-[#FFF8F0] border-2 border-[#FF9933] text-[#FF9933] py-3 rounded-xl font-semibold hover:bg-[#FFE8D0] transition-all">
            Change Nickname
          </button>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="font-bold text-[#2C3E50] mb-4 flex items-center gap-2">
            ⚙️ App Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-[#2C3E50]" />
                <span className="text-[#2C3E50]">Language:</span>
              </div>
              <span className="font-semibold text-[#FF9933]">English</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-[#2C3E50]" />
                <span className="text-[#2C3E50]">Notifications:</span>
              </div>
              <span className="font-semibold text-[#138808]">On</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun size={20} className="text-[#2C3E50]" />
                <span className="text-[#2C3E50]">Theme:</span>
              </div>
              <span className="font-semibold text-[#FF9933]">Light Mode</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wifi size={20} className="text-[#2C3E50]" />
                <span className="text-[#2C3E50]">Offline Mode:</span>
              </div>
              <span className="font-semibold text-[#138808]">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 size={20} className="text-[#2C3E50]" />
                <span className="text-[#2C3E50]">Voice:</span>
              </div>
              <span className="font-semibold text-[#138808]">On</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <button 
            onClick={() => setCurrentView('profile')}
            className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-3 text-left"
          >
            <TrendingUp size={24} className="text-[#FF9933]" />
            <span className="font-semibold text-[#2C3E50]">Progress Reports</span>
          </button>

          <button 
            onClick={() => setCurrentView('wellness')}
            className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-3 text-left"
          >
            <Heart size={24} className="text-[#FF9933]" />
            <span className="font-semibold text-[#2C3E50]">Wellness Dashboard</span>
          </button>

          <button 
            onClick={() => setCurrentView('factchecker')}
            className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-3 text-left"
          >
            <Search size={24} className="text-[#FF9933]" />
            <span className="font-semibold text-[#2C3E50]">Fact Checker Tool</span>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-3 text-left">
            <HelpCircle size={24} className="text-[#FF9933]" />
            <span className="font-semibold text-[#2C3E50]">Help & Support</span>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-3 text-left">
            <Share2 size={24} className="text-[#FF9933]" />
            <span className="font-semibold text-[#2C3E50]">Share App with Friends</span>
          </button>

          <button 
            onClick={onLogout}
            className="w-full bg-red-50 border-2 border-red-300 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-3 text-left"
          >
            <LogOut size={24} className="text-red-600" />
            <span className="font-semibold text-red-600">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
