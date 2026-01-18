import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { UserProfile } from '../App';

interface TeacherSetupProps {
  initialProfile: UserProfile;
  onComplete: (profile: UserProfile) => void;
}

const subjects = ['Math', 'Science', 'English', 'Hindi', 'Social Studies'];
const classes = ['Class 6-8', 'Class 9-10', 'Class 11-12'];
const nicknames = ['Assistant', 'Helper', 'Guide', 'Companion', 'Custom'];

export function TeacherSetup({ initialProfile, onComplete }: TeacherSetupProps) {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [teachingSubjects, setTeachingSubjects] = useState<string[]>(['Math']);
  const [teachingClasses, setTeachingClasses] = useState<string[]>(['Class 6-8']);
  const [nickname, setNickname] = useState('Assistant');
  const [customNickname, setCustomNickname] = useState('');

  const toggleSubject = (subject: string) => {
    setTeachingSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const toggleClass = (cls: string) => {
    setTeachingClasses(prev =>
      prev.includes(cls)
        ? prev.filter(c => c !== cls)
        : [...prev, cls]
    );
  };

  const handleSubmit = () => {
    const finalNickname = nickname === 'Custom' ? customNickname : nickname;
    onComplete({
      ...initialProfile,
      name,
      school,
      teachingSubjects,
      teachingClasses,
      nickname: finalNickname,
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
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#138808] focus:outline-none bg-white"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-[#2C3E50] font-semibold mb-2">
            School Name (Optional):
          </label>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#138808] focus:outline-none bg-white"
            placeholder="Enter school name"
          />
        </div>

        <div>
          <label className="block text-[#2C3E50] font-semibold mb-3">
            Subjects you teach:
          </label>
          <div className="flex flex-wrap gap-3">
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => toggleSubject(subject)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  teachingSubjects.includes(subject)
                    ? 'bg-[#138808] text-white shadow-md'
                    : 'bg-white text-[#2C3E50] border-2 border-gray-300'
                }`}
              >
                {teachingSubjects.includes(subject) ? '☑' : '☐'} {subject}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[#2C3E50] font-semibold mb-3">
            Classes you teach:
          </label>
          <div className="flex flex-wrap gap-3">
            {classes.map(cls => (
              <button
                key={cls}
                onClick={() => toggleClass(cls)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  teachingClasses.includes(cls)
                    ? 'bg-[#138808] text-white shadow-md'
                    : 'bg-white text-[#2C3E50] border-2 border-gray-300'
                }`}
              >
                {teachingClasses.includes(cls) ? '☑' : '☐'} {cls}
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
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#138808] focus:outline-none bg-white mb-2"
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
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#138808] focus:outline-none bg-white"
              placeholder="Enter custom nickname"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name || (nickname === 'Custom' && !customNickname)}
          className="w-full bg-gradient-to-r from-[#138808] to-[#16a00a] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Let's Start!</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
