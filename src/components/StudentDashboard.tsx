import { useState } from 'react';
import { Home, MessageCircle, FileText, User } from 'lucide-react';
import type { UserProfile } from '../App';
import { StudentHome } from './student/StudentHome';
import { ChatInterface } from './student/ChatInterface';
import { PracticeSection } from './student/PracticeSection';
import { ProfileSettings } from './student/ProfileSettings';

interface StudentDashboardProps {
  profile: UserProfile;
  onLogout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

type Tab = 'home' | 'chat' | 'practice' | 'profile';

export function StudentDashboard({ profile, onLogout, updateProfile }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen pb-20">
      {activeTab === 'home' && <StudentHome profile={profile} />}
      {activeTab === 'chat' && <ChatInterface profile={profile} updateProfile={updateProfile} />}
      {activeTab === 'practice' && <PracticeSection profile={profile} updateProfile={updateProfile} />}
      {activeTab === 'profile' && <ProfileSettings profile={profile} onLogout={onLogout} updateProfile={updateProfile} />}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around items-center py-3">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'home'
                ? 'text-[#FF9933] bg-[#FFF8F0]'
                : 'text-gray-500'
            }`}
          >
            <Home size={24} />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'chat'
                ? 'text-[#FF9933] bg-[#FFF8F0]'
                : 'text-gray-500'
            }`}
          >
            <MessageCircle size={24} />
            <span className="text-xs font-medium">Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'practice'
                ? 'text-[#FF9933] bg-[#FFF8F0]'
                : 'text-gray-500'
            }`}
          >
            <FileText size={24} />
            <span className="text-xs font-medium">Practice</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'text-[#FF9933] bg-[#FFF8F0]'
                : 'text-gray-500'
            }`}
          >
            <User size={24} />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
