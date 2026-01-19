import { useState } from 'react';
import { Smartphone, Mail, Globe } from 'lucide-react';
import type { Language } from '../App';
import logo from "../assets/LOGO_MYSaathi.png";


interface WelcomeProps {
  onLogin: (language: Language) => void;
}

export function Welcome({ onLogin }: WelcomeProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

  const languages = [
    { code: 'en' as Language, label: 'English' },
    { code: 'hi' as Language, label: 'हिन्दी' },
    { code: 'pa' as Language, label: 'ਪੰਜਾਬੀ' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <div className="text-center mb-12">
      <img
  src={logo}
  alt="MySaathi Logo"
  className="h-32 w-32 mb-4 mx-auto"
  />

        <h1 className="text-4xl font-bold text-[#FF9933] mb-2">MySaathi</h1>
        <p className="text-lg text-[#2C3E50]">Your Learning Companion</p>
      </div>

      <div className="w-full mb-8">
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-4">
          <div className="text-7xl text-center mb-4">🤖</div>
          <p className="text-center text-[#2C3E50] text-sm">
            Your friendly AI companion for learning, growing, and discovering your potential
          </p>
        </div>
      </div>

      <div className="w-full space-y-4 mb-8">
        <button
          onClick={() => onLogin(selectedLanguage)}
          className="w-full bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all"
        >
          <Smartphone size={24} />
          <span>Login with Phone</span>
        </button>

        <button
          onClick={() => onLogin(selectedLanguage)}
          className="w-full bg-white text-[#FF9933] py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 border-2 border-[#FF9933] hover:bg-[#FFF8F0] transition-all"
        >
          <Mail size={24} />
          <span>Login with Email</span>
        </button>
      </div>

      <div className="text-center mb-6">
        <button className="text-[#138808] font-medium hover:underline">
          New here? Sign Up
        </button>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Globe size={20} className="text-[#2C3E50]" />
          <span className="text-[#2C3E50] font-medium">Choose Language</span>
        </div>
        <div className="flex gap-2 justify-center flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedLanguage === lang.code
                  ? 'bg-[#FF9933] text-white shadow-md'
                  : 'bg-white text-[#2C3E50] border border-gray-300 hover:border-[#FF9933]'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
