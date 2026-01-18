import { useState } from 'react';
import { ArrowLeft, Search, AlertTriangle, CheckCircle } from 'lucide-react';

interface FactCheckerProps {
  onBack: () => void;
}

const fakeNewsAlerts = [
  {
    id: 1,
    claim: 'Free laptops for all students',
    status: 'FAKE',
    description: 'This is a hoax spreading on WhatsApp. No official government announcement has been made.',
  },
  {
    id: 2,
    claim: 'Exam dates postponed',
    status: 'FAKE',
    description: 'Official exam dates remain unchanged. Always check the board\'s official website.',
  },
  {
    id: 3,
    claim: 'New education policy changes',
    status: 'PARTIALLY TRUE',
    description: 'Some changes are true, but many viral claims are exaggerated. Verify from official sources.',
  },
];

export function FactChecker({ onBack }: FactCheckerProps) {
  const [claim, setClaim] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ status: string; message: string } | null>(null);

  const handleCheck = () => {
    if (!claim.trim()) return;

    setChecking(true);
    setTimeout(() => {
      setResult({
        status: 'uncertain',
        message: 'We couldn\'t find definitive information about this claim. Please verify from official sources like government websites, school administration, or trusted news outlets.',
      });
      setChecking(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft size={24} className="text-[#2C3E50]" />
          </button>
          <h1 className="text-xl font-bold text-[#2C3E50]">Fact Checker 🔍</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Check Claim */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="font-bold text-[#2C3E50] mb-4">
            Check if something is true or fake
          </h3>
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="Paste or type the claim you want to verify..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#FF9933] focus:outline-none bg-white resize-none"
            rows={4}
          />
          <button
            onClick={handleCheck}
            disabled={!claim.trim() || checking}
            className="w-full mt-4 bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Search size={20} />
            <span>{checking ? 'Checking...' : 'Check Now →'}</span>
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle size={24} className="text-yellow-600" />
              <h3 className="font-bold text-yellow-800">Verification Result</h3>
            </div>
            <p className="text-[#2C3E50]">{result.message}</p>
          </div>
        )}

        {/* Recent Fake News Alerts */}
        <div>
          <h3 className="font-bold text-[#2C3E50] mb-4 flex items-center gap-2">
            📰 Recent Fake News Alerts:
          </h3>
          <div className="space-y-3">
            {fakeNewsAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white rounded-3xl p-5 shadow-md border-l-4 border-red-500"
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle size={20} className="text-red-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-[#2C3E50] mb-1">
                      "{alert.claim}"
                    </p>
                    <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                      {alert.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 ml-8">{alert.description}</p>
                <button className="ml-8 mt-3 text-[#FF9933] font-semibold text-sm hover:underline">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-[#138808] to-[#16a00a] rounded-3xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle size={24} />
            <h3 className="font-bold text-lg">Tips to Spot Fake News:</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span>✓</span>
              <p>Check the source - Is it official?</p>
            </div>
            <div className="flex items-start gap-2">
              <span>✓</span>
              <p>Look for the date - Is it current?</p>
            </div>
            <div className="flex items-start gap-2">
              <span>✓</span>
              <p>Verify with multiple sources</p>
            </div>
            <div className="flex items-start gap-2">
              <span>✓</span>
              <p>Don't share without verifying</p>
            </div>
            <div className="flex items-start gap-2">
              <span>✓</span>
              <p>Ask your teacher or MySaathi</p>
            </div>
          </div>
          <button className="w-full mt-4 bg-white text-[#138808] py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
}
