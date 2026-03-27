import { useState, useEffect } from "react";
import { Link } from "react-router";
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  TrendingUp, 
  Sparkles,
  ChevronRight,
  Calendar,
  Clock,
  Award,
  FileText
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

const dailyTasks = [
  { id: 1, title: "Solve 2 DSA problems on Arrays", completed: true, time: "30 min" },
  { id: 2, title: "Complete Aptitude Quiz - Time & Work", completed: true, time: "15 min" },
  { id: 3, title: "Watch: System Design Basics", completed: false, time: "20 min" },
  { id: 4, title: "Practice SQL Queries", completed: false, time: "25 min" },
];

const upcomingTasks = [
  { id: 5, title: "TCS Mock Interview Prep", date: "Tomorrow", difficulty: "Medium" },
  { id: 6, title: "Graph Algorithms Practice", date: "Mar 28", difficulty: "Hard" },
  { id: 7, title: "Operating Systems - Revision", date: "Mar 29", difficulty: "Easy" },
];

const aiSuggestions = [
  "Focus more on Dynamic Programming - your current accuracy is 45%",
  "Great progress on Arrays! Try advanced problems",
  "Schedule mock interviews for next week",
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState(dailyTasks);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  
  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    const results = localStorage.getItem('assessmentResults');
    if (profile) setUserProfile(JSON.parse(profile));
    if (results) setAssessmentResults(JSON.parse(results));
  }, []);

  const userName = userProfile?.name || 'Student';
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = (completedCount / tasks.length) * 100;
  const currentStreak = 12;

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

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
            <p className="text-blue-100">
              {userProfile ? `${userProfile.field} • ${userProfile.year}` : 'Keep up the great work on your placement journey'}
            </p>
          </div>
          {assessmentResults && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-3">
              <Award className="text-yellow-300" size={24} />
              <div>
                <p className="text-sm text-blue-100">Skill Level</p>
                <p className="text-xl font-bold">{assessmentResults.skillLevel}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tasks & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Tasks */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Today's Tasks</h2>
                <p className="text-sm text-slate-500">
                  {completedCount} of {tasks.length} completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{completedCount}/{tasks.length}</div>
                <Progress value={progressPercentage} className="w-24 mt-2" />
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-purple-300 transition-all cursor-pointer"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-300 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{task.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/roadmap">
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                View Full Roadmap
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming Tasks</h2>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/task/${task.id}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{task.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{task.date}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        task.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {task.difficulty}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Stats & AI */}
        <div className="space-y-6">
          {/* Streak Tracker */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm text-orange-100">Current Streak</p>
                <p className="text-3xl font-bold">{currentStreak} Days</p>
              </div>
            </div>
            <p className="text-sm text-orange-100">Keep going! Don't break the chain 🔥</p>
          </div>

          {/* Progress Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4">Weekly Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">DSA Problems</span>
                  <span className="text-sm font-bold text-slate-900">24/30</span>
                </div>
                <Progress value={80} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Aptitude Quizzes</span>
                  <span className="text-sm font-bold text-slate-900">8/10</span>
                </div>
                <Progress value={80} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Mock Interviews</span>
                  <span className="text-sm font-bold text-slate-900">2/5</span>
                </div>
                <Progress value={40} />
              </div>
            </div>
            <Link to="/analytics">
              <Button variant="outline" className="w-full mt-4">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Detailed Analytics
              </Button>
            </Link>
          </div>

          {/* AI Suggestions */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-slate-900">AI Suggestions</h3>
            </div>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Status */}
          {userProfile?.resumeUploaded && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Resume</h3>
                  <p className="text-xs text-slate-500">Uploaded</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-3">{userProfile.resumeFileName}</p>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                  View
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors">
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}