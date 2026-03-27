import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Clock, Award, ExternalLink, CheckCircle2, SkipForward } from "lucide-react";
import { Button } from "../components/ui/button";

const taskData: Record<string, any> = {
  "1": {
    title: "Solve 2 DSA problems on Arrays",
    difficulty: "Medium",
    duration: "30 min",
    category: "Data Structures & Algorithms",
    description: "Practice array manipulation and problem-solving skills with two curated problems focusing on common patterns like two-pointer technique and sliding window.",
    objectives: [
      "Understand array traversal techniques",
      "Master two-pointer approach",
      "Improve time complexity optimization",
    ],
    instructions: [
      "Start with easier problem to warm up",
      "Try to solve without hints first",
      "Analyze time and space complexity",
      "Review editorial if stuck for more than 20 minutes",
    ],
    resources: [
      { name: "LeetCode - Two Sum", url: "https://leetcode.com", platform: "LeetCode" },
      { name: "GeeksforGeeks - Array Problems", url: "https://geeksforgeeks.org", platform: "GFG" },
      { name: "Array Tutorial Video", url: "https://youtube.com", platform: "YouTube" },
    ],
  },
  "5": {
    title: "TCS Mock Interview Prep",
    difficulty: "Medium",
    duration: "60 min",
    category: "Interview Preparation",
    description: "Prepare for TCS interview rounds with company-specific questions, coding patterns, and HR interview tips.",
    objectives: [
      "Understand TCS interview format",
      "Practice commonly asked questions",
      "Prepare behavioral answers",
    ],
    instructions: [
      "Review TCS interview pattern",
      "Practice at least 5 coding questions",
      "Prepare answers for common HR questions",
      "Time yourself while solving problems",
    ],
    resources: [
      { name: "TCS Previous Year Questions", url: "#", platform: "PDF" },
      { name: "TCS NQT Practice", url: "https://prepinsta.com", platform: "PrepInsta" },
      { name: "TCS Interview Experience", url: "https://geeksforgeeks.org", platform: "GFG" },
    ],
  },
};

export default function TaskDetailPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = taskData[taskId || "1"] || taskData["1"];

  const handleComplete = () => {
    // In real app, would update backend
    alert("Task marked as complete! 🎉");
    navigate("/dashboard");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-3">
                  {task.category}
                </div>
                <h1 className="text-3xl font-bold mb-2">{task.title}</h1>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{task.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  task.difficulty === 'Easy' ? 'bg-green-500/20' :
                  task.difficulty === 'Medium' ? 'bg-yellow-500/20' :
                  'bg-red-500/20'
                }`}>
                  {task.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Description</h2>
              <p className="text-slate-700 leading-relaxed">{task.description}</p>
            </div>

            {/* Learning Objectives */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Learning Objectives</h2>
              <div className="space-y-2">
                {task.objectives.map((objective: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-slate-700">{objective}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Instructions</h2>
              <div className="space-y-2">
                {task.instructions.map((instruction: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <p className="text-slate-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Resources & Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {task.resources.map((resource: any, index: number) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all group"
                  >
                    <div>
                      <p className="font-medium text-slate-900 group-hover:text-purple-600">
                        {resource.name}
                      </p>
                      <p className="text-sm text-slate-500">{resource.platform}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-purple-600" />
                  </a>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
              <Button
                onClick={handleComplete}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                size="lg"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Mark as Complete
              </Button>
              <Button
                onClick={handleSkip}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <SkipForward className="w-5 h-5 mr-2" />
                Skip for Now
              </Button>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
          <h3 className="font-bold text-slate-900 mb-2">💡 Pro Tip</h3>
          <p className="text-sm text-slate-700">
            Try to solve the problem independently before looking at solutions. If you're stuck, take a 5-minute break 
            and come back with fresh eyes. Learning happens through struggle!
          </p>
        </div>
      </div>
    </div>
  );
}
