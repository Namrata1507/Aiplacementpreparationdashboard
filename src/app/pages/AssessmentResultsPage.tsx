import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Trophy, TrendingUp, Target, ArrowRight, Award } from 'lucide-react';

export default function AssessmentResultsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const assessmentResults = localStorage.getItem('assessmentResults');
    const userProfile = localStorage.getItem('userProfile');
    
    if (!assessmentResults || !userProfile) {
      navigate('/onboarding');
      return;
    }

    setResults(JSON.parse(assessmentResults));
    setProfile(JSON.parse(userProfile));
  }, [navigate]);

  const handleContinue = () => {
    navigate('/app/dashboard');
  };

  if (!results || !profile) {
    return <div>Loading...</div>;
  }

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'from-green-500 to-emerald-600';
      case 'Intermediate':
        return 'from-blue-500 to-purple-600';
      case 'Beginner':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getSkillLevelMessage = (level: string) => {
    switch (level) {
      case 'Advanced':
        return "Excellent! You have a strong foundation. We'll focus on advanced topics and interview preparation.";
      case 'Intermediate':
        return "Good job! You have a solid base. We'll help you strengthen your skills and fill knowledge gaps.";
      case 'Beginner':
        return "Great start! We'll build your fundamentals step-by-step with a structured learning path.";
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 animate-bounce">
            <Trophy className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Assessment Complete! 🎉
          </h1>
          <p className="text-slate-600">
            Here's your personalized skill evaluation, {profile.name}
          </p>
        </div>

        {/* Results Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Score Display */}
          <div className="text-center mb-8">
            <div className="inline-flex flex-col items-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                {Math.round(results.score)}%
              </div>
              <p className="text-slate-600">
                {results.correctAnswers} out of {results.totalQuestions} correct
              </p>
            </div>
          </div>

          {/* Skill Level Badge */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Award className={`bg-gradient-to-r ${getSkillLevelColor(results.skillLevel)} bg-clip-text text-transparent`} size={32} />
              <h2 className="text-2xl font-bold text-slate-800">
                Skill Level: <span className={`bg-gradient-to-r ${getSkillLevelColor(results.skillLevel)} bg-clip-text text-transparent`}>
                  {results.skillLevel}
                </span>
              </h2>
            </div>
            <p className="text-center text-slate-600">
              {getSkillLevelMessage(results.skillLevel)}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-blue-500" size={20} />
                <span className="text-sm font-medium text-blue-900">Field</span>
              </div>
              <p className="text-lg font-bold text-blue-900">{profile.field}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-purple-500" size={20} />
                <span className="text-sm font-medium text-purple-900">Year</span>
              </div>
              <p className="text-lg font-bold text-purple-900">{profile.year}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="text-green-500" size={20} />
                <span className="text-sm font-medium text-green-900">Accuracy</span>
              </div>
              <p className="text-lg font-bold text-green-900">{Math.round(results.score)}%</p>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-3">What's Next?</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">✓</span>
                <span>Personalized learning roadmap based on your {results.skillLevel.toLowerCase()} level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">✓</span>
                <span>Daily tasks tailored to your {profile.field} and {profile.year} curriculum</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">✓</span>
                <span>Company-specific preparation for top tech companies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">✓</span>
                <span>Progress tracking and performance analytics</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          Continue to Dashboard
          <ArrowRight size={20} />
        </button>

        <p className="text-center text-sm text-slate-500 mt-4">
          Your roadmap is ready and waiting for you! 🚀
        </p>
      </div>
    </div>
  );
}