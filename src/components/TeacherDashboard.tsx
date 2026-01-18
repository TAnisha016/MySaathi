import { Menu, Globe, Bell, User, TrendingUp, FileText, Lightbulb, Sparkles } from 'lucide-react';
import type { UserProfile } from '../App';

interface TeacherDashboardProps {
  profile: UserProfile;
  onLogout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export function TeacherDashboard({ profile, onLogout }: TeacherDashboardProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu size={24} className="text-[#2C3E50]" />
            <h1 className="text-xl font-bold text-[#138808]">MySaathi</h1>
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
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-[#138808] to-[#16a00a] rounded-3xl p-6 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-2">Welcome back, {profile.name}! 👋</h2>
          <div className="flex items-start gap-3 mt-4 bg-white/20 rounded-2xl p-4">
            <div className="text-2xl">🤖</div>
            <div>
              <p className="font-semibold mb-1">Your {profile.nickname} says:</p>
              <p className="text-sm">
                "You've helped 45 students this week! Your dedication is inspiring! 🌟"
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={24} className="text-[#138808]" />
            <h3 className="text-lg font-bold text-[#2C3E50]">This Week's Overview</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FFF8F0] rounded-xl p-4">
              <div className="text-2xl mb-1">👥</div>
              <p className="text-2xl font-bold text-[#FF9933]">45</p>
              <p className="text-sm text-[#2C3E50]">students helped</p>
            </div>
            <div className="bg-[#FFF8F0] rounded-xl p-4">
              <div className="text-2xl mb-1">📝</div>
              <p className="text-2xl font-bold text-[#FF9933]">12</p>
              <p className="text-sm text-[#2C3E50]">lesson plans</p>
            </div>
            <div className="bg-[#FFF8F0] rounded-xl p-4">
              <div className="text-2xl mb-1">✏️</div>
              <p className="text-2xl font-bold text-[#FF9933]">8</p>
              <p className="text-sm text-[#2C3E50]">quizzes made</p>
            </div>
            <div className="bg-[#FFF8F0] rounded-xl p-4">
              <div className="text-2xl mb-1">⏱</div>
              <p className="text-2xl font-bold text-[#FF9933]">6.5</p>
              <p className="text-sm text-[#2C3E50]">hours saved</p>
            </div>
          </div>
          <button className="w-full mt-4 text-[#138808] font-semibold text-sm hover:underline">
            View Detailed Analytics →
          </button>
        </div>

        {/* Teaching Insights */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={24} className="text-[#FFD700]" />
            <h3 className="text-lg font-bold text-[#2C3E50]">Teaching Insights</h3>
          </div>
          <p className="text-sm text-[#2C3E50] mb-3">Students struggling with:</p>
          <div className="space-y-2">
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-sm font-semibold text-red-700">• Algebra (Class 9)</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-sm font-semibold text-red-700">• Photosynthesis (Class 10)</p>
            </div>
          </div>
          <button className="w-full mt-4 bg-[#FFD700] text-[#2C3E50] py-3 rounded-xl font-semibold hover:bg-[#ffd700dd] transition-all">
            Get Teaching Tips →
          </button>
        </div>

        {/* New Teaching Methods */}
        <div className="bg-gradient-to-r from-[#FF9933] to-[#FFB366] rounded-3xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={24} />
            <h3 className="text-lg font-bold">New Teaching Methods</h3>
          </div>
          <p className="text-sm mb-4">
            "Active Learning Strategies for Science Classes"
          </p>
          <button className="bg-white text-[#FF9933] px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all">
            Read Article →
          </button>
        </div>

        {/* Start Creating */}
        <button className="w-full bg-gradient-to-r from-[#138808] to-[#16a00a] text-white py-5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3">
          <FileText size={24} />
          <span>Start Creating →</span>
        </button>
        <p className="text-center text-sm text-gray-600">
          (Lesson plans, quizzes, teaching resources)
        </p>
      </div>
    </div>
  );
}
