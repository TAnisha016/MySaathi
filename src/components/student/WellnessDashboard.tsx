import { ArrowLeft, MessageCircle } from 'lucide-react';
import type { UserProfile } from '../../App';

interface WellnessDashboardProps {
  profile: UserProfile;
  onBack: () => void;
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const studyHours = [1.5, 2.5, 2, 4, 3, 2.5, 1.5];

export function WellnessDashboard({ profile, onBack }: WellnessDashboardProps) {
  const averageHours = studyHours.reduce((a, b) => a + b, 0) / studyHours.length;
  const maxHours = Math.max(...studyHours);

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft size={24} className="text-[#2C3E50]" />
          </button>
          <h1 className="text-xl font-bold text-[#2C3E50]">Your Wellness 🧘</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Wellness Score */}
        <div className="bg-gradient-to-r from-[#138808] to-[#16a00a] rounded-3xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-2">This Week's Wellness Score:</p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-4xl font-bold mb-2">75/100</p>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div className="bg-white h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="text-5xl">😊</div>
          </div>
          <p className="text-sm mt-3 font-semibold">Good! Keep it up!</p>
        </div>

        {/* Study Patterns */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="font-bold text-[#2C3E50] mb-4 flex items-center gap-2">
            📊 Study Patterns
          </h3>
          <div className="flex items-end justify-between h-32 mb-4">
            {weekDays.map((day, index) => {
              const height = (studyHours[index] / maxHours) * 100;
              return (
                <div key={day} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full flex items-end justify-center h-24">
                    <div
                      className="bg-gradient-to-t from-[#FF9933] to-[#FFB366] rounded-t-lg w-8"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-[#2C3E50] font-medium">{day}</span>
                </div>
              );
            })}
          </div>
          <div className="bg-[#FFF8F0] rounded-xl p-4">
            <p className="text-sm text-[#2C3E50]">
              <strong>Average:</strong> {averageHours.toFixed(1)} hrs/day
            </p>
          </div>
        </div>

        {/* Recent Check-ins */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="font-bold text-[#2C3E50] mb-4 flex items-center gap-2">
            💬 Recent Check-ins
          </h3>
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">😊</span>
              <div>
                <p className="font-semibold text-[#2C3E50]">Yesterday</p>
                <p className="text-sm text-gray-600">Feeling good</p>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">😟</span>
              <div>
                <p className="font-semibold text-[#2C3E50]">2 days ago</p>
                <p className="text-sm text-gray-600">Stressed</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">😃</span>
              <div>
                <p className="font-semibold text-[#2C3E50]">3 days ago</p>
                <p className="text-sm text-gray-600">Confident</p>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-[#FFD700]/20 border-2 border-[#FFD700] rounded-3xl p-6">
          <h3 className="font-bold text-[#2C3E50] mb-4 flex items-center gap-2">
            💡 MySaathi's Suggestions:
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-[#FF9933] mt-1">•</span>
              <p className="text-[#2C3E50]">Take more study breaks</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#FF9933] mt-1">•</span>
              <p className="text-[#2C3E50]">Try 5-min meditation</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#FF9933] mt-1">•</span>
              <p className="text-[#2C3E50]">Sleep 7-8 hours tonight</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#FF9933] mt-1">•</span>
              <p className="text-[#2C3E50]">Talk to someone if needed</p>
            </div>
          </div>
        </div>

        {/* Talk to MySaathi */}
        <button className="w-full bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white py-5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3">
          <MessageCircle size={24} />
          <span>Want to talk about it?</span>
        </button>
        <p className="text-center text-sm text-gray-600">
          Chat with MySaathi about your feelings
        </p>
      </div>
    </div>
  );
}
