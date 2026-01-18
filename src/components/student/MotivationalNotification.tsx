import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const notifications = [
  { emoji: '🎉', text: '347 students learning with you!', subtext: 'Keep going! 💪' },
  { emoji: '🔥', text: "You're on a 5-day streak!", subtext: "Don't break it! 🏆" },
  { emoji: '💡', text: 'Quick break?', subtext: 'Stretch for 2 mins!' },
  { emoji: '⭐', text: 'You earned 50 bonus points!', subtext: 'Great work! 🎯' },
  { emoji: '👥', text: 'Your friend Priya just started', subtext: 'learning Math! 📚' },
];

export function MotivationalNotification() {
  const [show, setShow] = useState(true);
  const [notification, setNotification] = useState(notifications[0]);

  useEffect(() => {
    // Randomly select a notification
    const randomIndex = Math.floor(Math.random() * notifications.length);
    setNotification(notifications[randomIndex]);
  }, []);

  if (!show) return null;

  return (
    <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl p-4 shadow-lg animate-[slideDown_0.3s_ease-out] relative">
      <button
        onClick={() => setShow(false)}
        className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full p-1 transition-all"
      >
        <X size={18} />
      </button>
      <div className="flex items-center gap-3">
        <div className="text-3xl">{notification.emoji}</div>
        <div className="flex-1">
          <p className="font-bold text-white">{notification.text}</p>
          <p className="text-sm text-white/90">{notification.subtext}</p>
        </div>
      </div>
    </div>
  );
}
