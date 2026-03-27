import { TrendingUp, Award, Target, Zap } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const weeklyProgressData = [
  { day: "Mon", problems: 4, aptitude: 2 },
  { day: "Tue", problems: 6, aptitude: 3 },
  { day: "Wed", problems: 3, aptitude: 4 },
  { day: "Thu", problems: 8, aptitude: 2 },
  { day: "Fri", problems: 5, aptitude: 5 },
  { day: "Sat", problems: 7, aptitude: 3 },
  { day: "Sun", problems: 4, aptitude: 2 },
];

const topicPerformanceData = [
  { topic: "Arrays", score: 85 },
  { topic: "Strings", score: 78 },
  { topic: "LinkedList", score: 65 },
  { topic: "Trees", score: 72 },
  { topic: "Graphs", score: 58 },
  { topic: "DP", score: 45 },
  { topic: "Greedy", score: 68 },
];

const skillRadarData = [
  { subject: "DSA", A: 80, fullMark: 100 },
  { subject: "Aptitude", A: 75, fullMark: 100 },
  { subject: "Coding", A: 85, fullMark: 100 },
  { subject: "Verbal", A: 65, fullMark: 100 },
  { subject: "System Design", A: 55, fullMark: 100 },
  { subject: "HR Skills", A: 70, fullMark: 100 },
];

const stats = [
  { label: "Problems Solved", value: "142", change: "+12%", icon: Target, color: "blue" },
  { label: "Accuracy", value: "73%", change: "+5%", icon: Award, color: "green" },
  { label: "Current Streak", value: "12 days", change: "Active", icon: Zap, color: "orange" },
  { label: "Rank", value: "#246", change: "+34", icon: TrendingUp, color: "purple" },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Performance Analytics</h1>
        <p className="text-slate-600">Track your progress and identify areas for improvement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "from-blue-500 to-blue-600",
            green: "from-green-500 to-green-600",
            orange: "from-orange-500 to-orange-600",
            purple: "from-purple-500 to-purple-600",
          };

          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="problems" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="DSA Problems"
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="aptitude" 
                stroke="#a855f7" 
                strokeWidth={2}
                name="Aptitude Tests"
                dot={{ fill: '#a855f7', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Radar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Skills Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillRadarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" stroke="#64748b" />
              <PolarRadiusAxis stroke="#64748b" />
              <Radar 
                name="Your Skills" 
                dataKey="A" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.5} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topic Performance */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Topic-wise Performance</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={topicPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="topic" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Bar 
              dataKey="score" 
              fill="url(#colorGradient)" 
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">💪 Strengths</h2>
          <div className="space-y-3">
            {[
              { name: "Arrays", score: 85 },
              { name: "Coding Speed", score: 85 },
              { name: "Problem Understanding", score: 80 },
            ].map((strength, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{strength.name}</span>
                  <span className="text-sm font-bold text-green-600">{strength.score}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Areas to Improve */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">📈 Areas to Improve</h2>
          <div className="space-y-3">
            {[
              { name: "Dynamic Programming", score: 45 },
              { name: "Graph Algorithms", score: 58 },
              { name: "System Design", score: 55 },
            ].map((weakness, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{weakness.name}</span>
                  <span className="text-sm font-bold text-orange-600">{weakness.score}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                    style={{ width: `${weakness.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">🤖 AI Insights</h2>
        <div className="space-y-3">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="font-medium mb-1">Focus Area Recommendation</p>
            <p className="text-sm text-blue-100">
              Spend more time on Dynamic Programming. Based on your current trajectory, 
              2 hours of daily practice can improve your score by 20% in 2 weeks.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="font-medium mb-1">Best Practice Time</p>
            <p className="text-sm text-blue-100">
              Your performance peaks between 6 PM - 8 PM. Schedule difficult topics during this time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
