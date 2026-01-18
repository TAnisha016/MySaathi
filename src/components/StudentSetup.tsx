import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { UserProfile } from '../App';

interface StudentSetupProps {
  initialProfile: UserProfile;
  onComplete: (profile: UserProfile) => void;
}

const grades = [
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 
  'Class 11', 'Class 12'
];

const subjects = ['Math', 'Science', 'English', 'Hindi', 'Social Studies'];

const nicknames = ['Buddy', 'Dost', 'Friend', 'Saathi', 'Teacher', 'Custom'];

export function StudentSetup({ initialProfile, onComplete }: StudentSetupProps) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('Class 8');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Math', 'Science']);
  const [nickname, setNickname] = useState('Buddy');
  const [customNickname, setCustomNickname] = useState('');

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = () => {
    const finalNickname = nickname === 'Custom' ? customNickname : nickname;
    onComplete({
      ...initialProfile,
      name,
      grade,
      subjects: selectedSubjects,
      nickname: finalNickname,
      points: 0,
      streak: 0,
      topicsMastered: 0,
      hoursLearned: 0,
    });
  };

  return (
    <div className="min-h-screen p-6 max-w-md mx-auto">
      <div className="text-center mb-8 pt-6">
        <h1 className="text-2xl font-bold text-[#2C3E50]">
          Let's get to know you better!
        </h1>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[#2C3E50] font-semibold mb-2">
            Your Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#FF9933] focus:outline-none bg-white"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-[#2C3E50] font-semibold mb-2">
            Your Class/Grade:
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#FF9933] focus:outline-none bg-white"
          >
            {grades.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[#2C3E50] font-semibold mb-3">
            Subjects you want help with:
          </label>
          <div className="flex flex-wrap gap-3">
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => toggleSubject(subject)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedSubjects.includes(subject)
                    ? 'bg-[#FF9933] text-white shadow-md'
                    : 'bg-white text-[#2C3E50] border-2 border-gray-300'
                }`}
              >
                {selectedSubjects.includes(subject) ? '☑' : '☐'} {subject}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[#2C3E50] font-semibold mb-2">
            What should I call MySaathi?
          </label>
          <select
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#FF9933] focus:outline-none bg-white mb-2"
          >
            {nicknames.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {nickname === 'Custom' && (
            <input
              type="text"
              value={customNickname}
              onChange={(e) => setCustomNickname(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#FF9933] focus:outline-none bg-white"
              placeholder="Enter custom nickname"
            />
          )}
          <p className="text-sm text-gray-600 mt-2">
            (Options: Buddy, Dost, Friend, Saathi, Teacher, or Your Own!)
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name || (nickname === 'Custom' && !customNickname)}
          className="w-full bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Let's Start!</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
