import { GraduationCap, BookOpen } from 'lucide-react';
import type { UserType } from '../App';

interface UserTypeSelectionProps {
  onSelect: (type: UserType) => void;
}

export function UserTypeSelection({ onSelect }: UserTypeSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">
          Welcome to MySaathi! 🎉
        </h1>
        <p className="text-lg text-[#2C3E50] mt-4">Who are you?</p>
      </div>

      <div className="w-full space-y-6">
        <button
          onClick={() => onSelect('student')}
          className="w-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-[#FF9933] group"
        >
          <div className="text-6xl mb-4 text-center">👨‍🎓</div>
          <h2 className="text-2xl font-bold text-[#FF9933] text-center mb-3 flex items-center justify-center gap-2">
            <GraduationCap size={28} />
            STUDENT
          </h2>
          <p className="text-[#2C3E50] text-center">
            I want to learn and grow with MySaathi
          </p>
        </button>

        <button
          onClick={() => onSelect('teacher')}
          className="w-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-[#138808] group"
        >
          <div className="text-6xl mb-4 text-center">👨‍🏫</div>
          <h2 className="text-2xl font-bold text-[#138808] text-center mb-3 flex items-center justify-center gap-2">
            <BookOpen size={28} />
            TEACHER
          </h2>
          <p className="text-[#2C3E50] text-center">
            I want to teach better and help my students
          </p>
        </button>
      </div>
    </div>
  );
}
