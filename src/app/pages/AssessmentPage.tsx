import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Clock, CheckCircle, XCircle, Code, Brain, BookOpen } from 'lucide-react';

// Question types
interface Question {
  id: number;
  type: 'coding' | 'aptitude' | 'technical';
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Generate questions based on field and year
const generateQuestions = (field: string, year: string): Question[] => {
  const yearNum = parseInt(year.charAt(0));
  
  const questions: Question[] = [
    // Coding Questions
    {
      id: 1,
      type: 'coding',
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correctAnswer: 1,
      difficulty: yearNum <= 2 ? 'easy' : 'medium'
    },
    {
      id: 2,
      type: 'coding',
      question: 'Which data structure uses LIFO (Last In First Out)?',
      options: ['Queue', 'Stack', 'Array', 'Tree'],
      correctAnswer: 1,
      difficulty: 'easy'
    },
    {
      id: 3,
      type: 'coding',
      question: 'What does the "this" keyword refer to in JavaScript?',
      options: ['Global object', 'Current function', 'Current object context', 'Parent object'],
      correctAnswer: 2,
      difficulty: yearNum <= 2 ? 'medium' : 'easy'
    },
    {
      id: 4,
      type: 'coding',
      question: 'Which sorting algorithm has the best average-case time complexity?',
      options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'],
      correctAnswer: 2,
      difficulty: yearNum >= 3 ? 'medium' : 'hard'
    },
    {
      id: 5,
      type: 'coding',
      question: 'What is a linked list?',
      options: [
        'An array with fixed size',
        'A linear data structure with nodes containing data and references',
        'A tree structure',
        'A hash table'
      ],
      correctAnswer: 1,
      difficulty: 'easy'
    },
    
    // Aptitude Questions
    {
      id: 6,
      type: 'aptitude',
      question: 'If A = 1, B = 2, C = 3... what is the sum of letters in "CODE"?',
      options: ['24', '26', '28', '30'],
      correctAnswer: 2,
      difficulty: 'easy'
    },
    {
      id: 7,
      type: 'aptitude',
      question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
      options: ['38', '40', '42', '44'],
      correctAnswer: 2,
      difficulty: 'medium'
    },
    {
      id: 8,
      type: 'aptitude',
      question: 'If 5 workers can complete a task in 12 days, how many days will 10 workers take?',
      options: ['4 days', '6 days', '8 days', '10 days'],
      correctAnswer: 1,
      difficulty: 'easy'
    },
    {
      id: 9,
      type: 'aptitude',
      question: 'What is 15% of 200?',
      options: ['25', '30', '35', '40'],
      correctAnswer: 1,
      difficulty: 'easy'
    },
    {
      id: 10,
      type: 'aptitude',
      question: 'A train travels 120 km in 2 hours. What is its average speed?',
      options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'],
      correctAnswer: 2,
      difficulty: 'easy'
    },
    
    // Technical Questions
    {
      id: 11,
      type: 'technical',
      question: 'What does SQL stand for?',
      options: [
        'Structured Query Language',
        'Simple Query Language',
        'Standard Query Language',
        'System Query Language'
      ],
      correctAnswer: 0,
      difficulty: 'easy'
    },
    {
      id: 12,
      type: 'technical',
      question: 'Which of these is NOT an OOP principle?',
      options: ['Encapsulation', 'Inheritance', 'Compilation', 'Polymorphism'],
      correctAnswer: 2,
      difficulty: 'easy'
    },
    {
      id: 13,
      type: 'technical',
      question: 'What is the purpose of a constructor in OOP?',
      options: [
        'To destroy objects',
        'To initialize objects',
        'To copy objects',
        'To compare objects'
      ],
      correctAnswer: 1,
      difficulty: yearNum <= 2 ? 'medium' : 'easy'
    },
    {
      id: 14,
      type: 'technical',
      question: 'Which protocol is used for secure web communication?',
      options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
      correctAnswer: 1,
      difficulty: 'easy'
    },
    {
      id: 15,
      type: 'technical',
      question: 'What does API stand for?',
      options: [
        'Application Programming Interface',
        'Advanced Programming Interface',
        'Application Process Integration',
        'Automated Programming Interface'
      ],
      correctAnswer: 0,
      difficulty: 'easy'
    },
    
    // Advanced questions for 3rd/4th year
    ...(yearNum >= 3 ? [
      {
        id: 16,
        type: 'coding' as const,
        question: 'What is the space complexity of recursive Fibonacci?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 1,
        difficulty: 'medium' as const
      },
      {
        id: 17,
        type: 'technical' as const,
        question: 'Which design pattern ensures a class has only one instance?',
        options: ['Factory', 'Singleton', 'Observer', 'Strategy'],
        correctAnswer: 1,
        difficulty: 'medium' as const
      },
      {
        id: 18,
        type: 'coding' as const,
        question: 'What is a deadlock in operating systems?',
        options: [
          'A lock that cannot be opened',
          'A situation where processes wait indefinitely for resources',
          'A type of mutex',
          'An error in compilation'
        ],
        correctAnswer: 1,
        difficulty: 'medium' as const
      }
    ] : [])
  ];
  
  return questions.slice(0, yearNum >= 3 ? 18 : 15);
};

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Load user profile
    const profile = localStorage.getItem('userProfile');
    if (!profile) {
      navigate('/onboarding');
      return;
    }
    const parsedProfile = JSON.parse(profile);
    setUserProfile(parsedProfile);
    
    // Generate questions based on profile
    const generatedQuestions = generateQuestions(parsedProfile.field, parsedProfile.year);
    setQuestions(generatedQuestions);
    setAnswers(new Array(generatedQuestions.length).fill(-1));
  }, [navigate]);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isStarted && timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, isStarted]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / questions.length) * 100;
    
    // Determine skill level
    let skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    if (score >= 75) {
      skillLevel = 'Advanced';
    } else if (score >= 50) {
      skillLevel = 'Intermediate';
    } else {
      skillLevel = 'Beginner';
    }

    // Save assessment results
    const results = {
      score,
      skillLevel,
      correctAnswers,
      totalQuestions: questions.length,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('assessmentResults', JSON.stringify(results));
    navigate('/assessment-results');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'coding':
        return <Code className="text-blue-500" size={20} />;
      case 'aptitude':
        return <Brain className="text-purple-500" size={20} />;
      case 'technical':
        return <BookOpen className="text-green-500" size={20} />;
      default:
        return null;
    }
  };

  if (!userProfile || questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
                <Brain className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Skill Assessment Test
              </h1>
              <p className="text-slate-600">
                Welcome, {userProfile.name}! Let's evaluate your current skill level.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Clock className="text-blue-500" size={24} />
                <div>
                  <p className="font-medium text-slate-800">Duration: 20 minutes</p>
                  <p className="text-sm text-slate-600">The timer will start when you begin</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <BookOpen className="text-purple-500" size={24} />
                <div>
                  <p className="font-medium text-slate-800">Total Questions: {questions.length}</p>
                  <p className="text-sm text-slate-600">Coding, Aptitude, and Technical MCQs</p>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="font-medium text-slate-800 mb-2">Assessment Breakdown:</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Coding & Data Structures</li>
                  <li>• Logical Reasoning & Aptitude</li>
                  <li>• Technical Concepts ({userProfile.field})</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setIsStarted(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Start Assessment
            </button>

            <p className="text-center text-sm text-slate-500 mt-4">
              Based on your performance, we'll create a personalized learning roadmap
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const answeredCount = answers.filter(a => a !== -1).length;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Skill Assessment</h2>
              <p className="text-sm text-slate-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg">
              <Clock className="text-red-500" size={20} />
              <span className="font-bold text-red-600">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="mt-2 text-sm text-slate-600">
            Answered: {answeredCount} / {questions.length}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            {getTypeIcon(currentQ.type)}
            <span className="text-sm font-medium text-slate-600 capitalize">
              {currentQ.type}
            </span>
            <span className="ml-auto text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
              {currentQ.difficulty}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-6">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === index
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-slate-300'
                    }`}
                  >
                    {answers[currentQuestion] === index && (
                      <CheckCircle className="text-white" size={16} />
                    )}
                  </div>
                  <span className="text-slate-700">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Next Question
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
            >
              Submit Assessment
            </button>
          )}
        </div>

        {/* Question Navigator */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h4 className="font-medium text-slate-700 mb-3">Question Navigator</h4>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                  index === currentQuestion
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : answers[index] !== -1
                    ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
