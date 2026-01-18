import { useState } from 'react';
import { ArrowLeft, Trophy, ArrowRight } from 'lucide-react';
import type { UserProfile } from '../../App';
import { PracticeQuiz } from './PracticeQuiz';

interface PracticeSectionProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

interface PracticeCategory {
  id: string;
  name: string;
  icon: string;
  topics: { name: string; questions: number }[];
}

const categories: PracticeCategory[] = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: '📐',
    topics: [
      { name: 'Algebra Basics', questions: 10 },
      { name: 'Geometry Problems', questions: 15 },
      { name: 'Word Problems', questions: 8 },
    ],
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    topics: [
      { name: 'Photosynthesis Quiz', questions: 12 },
      { name: 'Physics Motion', questions: 10 },
      { name: 'Chemistry Elements', questions: 15 },
    ],
  },
  {
    id: 'social',
    name: 'Social Studies',
    icon: '🌍',
    topics: [
      { name: 'Indian History', questions: 20 },
      { name: 'Geography Quiz', questions: 12 },
    ],
  },
];

export function PracticeSection({ profile, updateProfile }: PracticeSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  if (selectedTopic) {
    return (
      <PracticeQuiz
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
        profile={profile}
        updateProfile={updateProfile}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft size={24} className="text-[#2C3E50]" />
            <h1 className="text-xl font-bold text-[#2C3E50]">Practice Zone</h1>
          </div>
          <div className="flex items-center gap-2 text-[#FFD700]">
            <Trophy size={24} />
            <span className="font-bold text-[#FF9933]">{profile.points || 850}</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#2C3E50] mb-4">📝 Your Practice Resources</h2>
        </div>

        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-lg font-bold text-[#2C3E50]">{category.name}</h3>
            </div>
            <div className="space-y-2 mb-4">
              {category.topics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between text-[#2C3E50]">
                  <span className="text-sm">• {topic.name} ({topic.questions} Qs)</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedTopic(category.topics[0].name)}
              className="w-full bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Start</span>
              <ArrowRight size={20} />
            </button>
          </div>
        ))}

        {/* Custom Practice */}
        <div className="bg-gradient-to-r from-[#138808] to-[#16a00a] rounded-3xl p-6 shadow-lg text-white">
          <div className="text-center">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-lg font-bold mb-2">+ Create Custom Practice</h3>
            <p className="text-sm opacity-90">
              Ask MySaathi to make questions for you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
