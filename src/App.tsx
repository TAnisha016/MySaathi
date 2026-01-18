import { useState, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { UserTypeSelection } from './components/UserTypeSelection';
import { StudentSetup } from './components/StudentSetup';
import { TeacherSetup } from './components/TeacherSetup';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';

export type UserType = 'student' | 'teacher' | null;
export type Language = 'en' | 'hi' | 'pa';

export interface UserProfile {
  name: string;
  userType: UserType;
  language: Language;
  nickname: string;
  // Student specific
  grade?: string;
  subjects?: string[];
  // Teacher specific
  school?: string;
  teachingSubjects?: string[];
  teachingClasses?: string[];
  // Progress
  points?: number;
  streak?: number;
  topicsMastered?: number;
  hoursLearned?: number;
}

type Screen = 'welcome' | 'userType' | 'setup' | 'dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Load saved profile from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mysaathi_profile');
    if (saved) {
      const profile = JSON.parse(saved);
      setUserProfile(profile);
      setCurrentScreen('dashboard');
    }
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    if (userProfile && currentScreen === 'dashboard') {
      localStorage.setItem('mysaathi_profile', JSON.stringify(userProfile));
    }
  }, [userProfile, currentScreen]);

  const handleLogin = (language: Language) => {
    setCurrentScreen('userType');
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserProfile({ 
      name: '', 
      userType: type, 
      language: 'en',
      nickname: type === 'student' ? 'Buddy' : 'Assistant'
    });
    setCurrentScreen('setup');
  };

  const handleSetupComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('mysaathi_profile');
    setUserProfile(null);
    setCurrentScreen('welcome');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {currentScreen === 'welcome' && (
        <Welcome onLogin={handleLogin} />
      )}
      
      {currentScreen === 'userType' && (
        <UserTypeSelection onSelect={handleUserTypeSelect} />
      )}
      
      {currentScreen === 'setup' && userProfile && (
        <>
          {userProfile.userType === 'student' ? (
            <StudentSetup 
              initialProfile={userProfile}
              onComplete={handleSetupComplete} 
            />
          ) : (
            <TeacherSetup 
              initialProfile={userProfile}
              onComplete={handleSetupComplete} 
            />
          )}
        </>
      )}
      
      {currentScreen === 'dashboard' && userProfile && (
        <>
          {userProfile.userType === 'student' ? (
            <StudentDashboard 
              profile={userProfile}
              onLogout={handleLogout}
              updateProfile={updateProfile}
            />
          ) : (
            <TeacherDashboard 
              profile={userProfile}
              onLogout={handleLogout}
              updateProfile={updateProfile}
            />
          )}
        </>
      )}
    </div>
  );
}
