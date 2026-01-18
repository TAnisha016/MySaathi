import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ChevronDown, Paperclip, Mic, Send } from 'lucide-react';
import type { UserProfile } from '../../App';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

interface ChatInterfaceProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const modes = [
  { id: 'tutor', name: 'Tutor Mode', icon: '🎓', description: 'Learn anything, ask doubts' },
  { id: 'companion', name: 'Learning Companion', icon: '🎮', description: 'Fun challenges & games' },
  { id: 'career', name: 'Career Pathfinder', icon: '💼', description: 'Explore future careers' },
  { id: 'solver', name: 'Problem Solver', icon: '🧩', description: 'Solve problems together' },
  { id: 'mentor', name: 'Mentor Mode', icon: '🌟', description: 'Talk to professionals' },
];

export function ChatInterface({ profile, updateProfile }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hey ${profile.name}! Ready to learn something new today? 📚`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [currentMode, setCurrentMode] = useState(modes[0]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: getBotResponse(input),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Update learning stats
      updateProfile({
        points: (profile.points || 0) + 10,
        hoursLearned: (profile.hoursLearned || 0) + 0.1,
      });
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();
    if (lower.includes('photosynthesis')) {
      return "Of course! Let me explain in simple terms:\n\nPhotosynthesis (प्रकाश संश्लेषण) is how plants make their own food using sunlight! 🌱☀️\n\n• Plants use: Sunlight + Water + CO2\n• They make: Glucose (food) + Oxygen\n• It happens in leaves (chlorophyll)\n\nWant me to ask you some questions to test this? 🧪";
    } else if (lower.includes('math') || lower.includes('algebra')) {
      return "Great choice! Math is all about practice. What specific topic do you want to learn? Algebra, Geometry, or something else? I'm here to help! 📐";
    } else if (lower.includes('help') || lower.includes('doubt')) {
      return "I'm here to help! You can:\n• Ask me to explain any topic\n• Upload your homework photo 📷\n• Request practice questions\n• Talk about study stress\n\nWhat would you like to do?";
    } else {
      return `That's a great question! I'd love to help you understand this better. Let me break it down step by step for you. Would you like a detailed explanation or a quick summary? 🤔`;
    }
  };

  const handleModeChange = (mode: typeof modes[0]) => {
    setCurrentMode(mode);
    setShowModeSelector(false);
    const modeMessage: Message = {
      id: Date.now().toString(),
      sender: 'bot',
      text: `Great! Let's switch to ${mode.name}. ${mode.description} 😊`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, modeMessage]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ArrowLeft size={24} className="text-[#2C3E50]" />
              <div>
                <h2 className="font-bold text-[#2C3E50]">
                  MySaathi ({profile.nickname})
                </h2>
              </div>
            </div>
            <button
              onClick={() => setShowModeSelector(!showModeSelector)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FFF8F0] text-[#FF9933] font-semibold text-sm hover:bg-[#FFE8D0] transition-all"
            >
              <span>Mode: {currentMode.icon} {currentMode.name.split(' ')[0]}</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mode Selector Modal */}
      {showModeSelector && (
        <div className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-[#2C3E50] mb-4">
              Current Mode: {currentMode.icon} {currentMode.name}
            </h3>
            <p className="text-sm text-gray-600 mb-6">Select Mode:</p>
            <div className="space-y-3">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleModeChange(mode)}
                  className={`w-full text-left p-4 rounded-2xl transition-all ${
                    currentMode.id === mode.id
                      ? 'bg-[#FF9933] text-white'
                      : 'bg-[#FFF8F0] text-[#2C3E50] hover:bg-[#FFE8D0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{mode.icon}</span>
                    <div>
                      <p className="font-bold">{mode.name}</p>
                      <p className="text-sm opacity-90">{mode.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModeSelector(false)}
                className="flex-1 bg-gray-200 text-[#2C3E50] py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-md mx-auto w-full p-4 space-y-4">
        {/* Live learners notification */}
        <div className="flex justify-end">
          <div className="bg-[#FFD700] text-white px-4 py-2 rounded-2xl text-sm shadow-md max-w-xs">
            <p className="font-bold">🎉 347 students</p>
            <p className="text-xs">learning with you! Keep going! 💪</p>
          </div>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                message.sender === 'user'
                  ? 'bg-[#FF9933] text-white rounded-tr-sm'
                  : 'bg-white text-[#2C3E50] rounded-tl-sm'
              }`}
            >
              {message.sender === 'bot' && (
                <p className="text-xs font-semibold mb-1 flex items-center gap-1">
                  🤖 {profile.nickname}:
                </p>
              )}
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-[#2C3E50] rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-2">
            <button className="text-[#FF9933] p-2 hover:bg-[#FFF8F0] rounded-xl transition-all">
              <Paperclip size={24} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#FF9933] focus:outline-none"
            />
            <button className="text-[#FF9933] p-2 hover:bg-[#FFF8F0] rounded-xl transition-all">
              <Mic size={24} />
            </button>
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white p-3 rounded-xl hover:shadow-lg transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
