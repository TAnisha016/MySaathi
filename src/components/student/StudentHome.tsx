import { Menu, Globe, Bell, User, TrendingUp, AlertTriangle, MessageCircle, Flame, Star, BookOpen, Clock } from 'lucide-react';
import type { UserProfile } from '../../App';
import { MotivationalNotification } from './MotivationalNotification';

interface StudentHomeProps {
  profile: UserProfile;
}

export function StudentHome({ profile }: StudentHomeProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu size={24} className="text-[#2C3E50]" />
            <h1 className="text-xl font-bold text-[#FF9933]">MySaathi</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#2C3E50]">
              <Globe size={20} />
            </button>
            <button className="text-[#2C3E50] relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF9933] rounded-full"></span>
            </button>
            <button className="text-[#2C3E50]">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Motivational Notification */}
        <MotivationalNotification />

        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-[#FF9933] to-[#FFB366] rounded-3xl p-6 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-2">Hi {profile.name}! 👋</h2>
          <div className="flex items-start gap-3 mt-4 bg-white/20 rounded-2xl p-4">
            <div className="text-2xl">🤖</div>
            <div>
              <p className="font-semibold mb-1">Your {profile.nickname} says:</p>
              <p className="text-sm">
                "You've been doing great recently! Keep up the amazing work! 🌟"
              </p>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={24} className="text-[#FF9933]" />
            <h3 className="text-lg font-bold text-[#2C3E50]">Your Progress This Week</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-[#FFF8F0] rounded-xl p-4 flex items-center gap-3">
              <Flame size={32} className="text-[#FF9933]" />
              <div>
                <p className="text-2xl font-bold text-[#FF9933]">{profile.streak || 5}</p>
                <p className="text-sm text-[#2C3E50]">day streak! 🔥</p>
              </div>
            </div>
            <div className="bg-[#FFF8F0] rounded-xl p-4 flex items-center gap-3">
              <Star size={32} className="text-[#FFD700]" />
              <div>
                <p className="text-2xl font-bold text-[#FF9933]">{profile.points || 850}</p>
                <p className="text-sm text-[#2C3E50]">points earned</p>
              </div>
            </div>
            <div className="bg-[#FFF8F0] rounded-xl p-4 flex items-center gap-3">
              <BookOpen size={32} className="text-[#138808]" />
              <div>
                <p className="text-2xl font-bold text-[#FF9933]">{profile.topicsMastered || 12}</p>
                <p className="text-sm text-[#2C3E50]">topics done</p>
              </div>
            </div>
            <div className="bg-[#FFF8F0] rounded-xl p-4 flex items-center gap-3">
              <Clock size={32} className="text-[#138808]" />
              <div>
                <p className="text-2xl font-bold text-[#FF9933]">{profile.hoursLearned || 8.5}</p>
                <p className="text-sm text-[#2C3E50]">hours learned</p>
              </div>
            </div>
          </div>
          <button className="w-full text-[#FF9933] font-semibold text-sm hover:underline">
            View Detailed Stats →
          </button>
        </div>

        {/* Fake News Alert */}
        <div className="bg-red-50 border-2 border-red-300 rounded-3xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={24} className="text-red-600" />
            <h3 className="text-lg font-bold text-red-600">BEWARE: Fake News Alert!</h3>
          </div>
          <div className="bg-white rounded-xl p-4 mb-3">
            <p className="font-semibold text-[#2C3E50] mb-2">
              "Exam dates changed" - FAKE
            </p>
            <p className="text-sm text-gray-600">
              This is false news spreading online. Check official sources only!
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition-all">
              Learn More
            </button>
            <button className="px-6 bg-white text-red-600 py-2 rounded-xl font-semibold border-2 border-red-600 hover:bg-red-50 transition-all">
              Dismiss
            </button>
          </div>
        </div>

        {/* Start Learning Button */}
        <button className="w-full bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white py-5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3">
          <MessageCircle size={24} />
          <span>Start Learning →</span>
        </button>
        <p className="text-center text-sm text-gray-600">
          (Tap to chat with MySaathi)
        </p>
      </div>
    </div>
  );
}
