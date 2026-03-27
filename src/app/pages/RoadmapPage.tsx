import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, Award, CheckCircle, Circle } from "lucide-react";

const roadmapData = [
  {
    phase: "Foundation",
    period: "Weeks 1-4",
    color: "blue",
    sections: [
      {
        title: "Programming Basics",
        tasks: [
          { id: 1, title: "Learn C/C++ or Java Fundamentals", duration: "2 weeks", difficulty: "Easy", completed: true },
          { id: 2, title: "Object-Oriented Programming Concepts", duration: "1 week", difficulty: "Easy", completed: true },
          { id: 3, title: "Basic Input/Output Operations", duration: "3 days", difficulty: "Easy", completed: true },
        ]
      },
      {
        title: "Basic Data Structures",
        tasks: [
          { id: 4, title: "Arrays and Strings", duration: "1 week", difficulty: "Easy", completed: true },
          { id: 5, title: "Linked Lists", duration: "5 days", difficulty: "Medium", completed: false },
          { id: 6, title: "Stacks and Queues", duration: "5 days", difficulty: "Medium", completed: false },
        ]
      },
    ]
  },
  {
    phase: "Intermediate",
    period: "Weeks 5-12",
    color: "purple",
    sections: [
      {
        title: "Advanced DSA",
        tasks: [
          { id: 7, title: "Trees and Binary Search Trees", duration: "1 week", difficulty: "Medium", completed: false },
          { id: 8, title: "Graphs - BFS and DFS", duration: "1 week", difficulty: "Hard", completed: false },
          { id: 9, title: "Dynamic Programming Basics", duration: "2 weeks", difficulty: "Hard", completed: false },
          { id: 10, title: "Greedy Algorithms", duration: "1 week", difficulty: "Medium", completed: false },
        ]
      },
      {
        title: "Aptitude Training",
        tasks: [
          { id: 11, title: "Quantitative Aptitude", duration: "2 weeks", difficulty: "Medium", completed: false },
          { id: 12, title: "Logical Reasoning", duration: "2 weeks", difficulty: "Medium", completed: false },
          { id: 13, title: "Verbal Ability", duration: "1 week", difficulty: "Easy", completed: false },
        ]
      },
    ]
  },
  {
    phase: "Advanced",
    period: "Weeks 13-20",
    color: "pink",
    sections: [
      {
        title: "Advanced Coding",
        tasks: [
          { id: 14, title: "Advanced Dynamic Programming", duration: "2 weeks", difficulty: "Hard", completed: false },
          { id: 15, title: "Graph Advanced Algorithms", duration: "1 week", difficulty: "Hard", completed: false },
          { id: 16, title: "Bit Manipulation", duration: "4 days", difficulty: "Medium", completed: false },
        ]
      },
      {
        title: "System Design",
        tasks: [
          { id: 17, title: "System Design Fundamentals", duration: "1 week", difficulty: "Medium", completed: false },
          { id: 18, title: "Scalability Concepts", duration: "1 week", difficulty: "Hard", completed: false },
        ]
      },
    ]
  },
  {
    phase: "Company-Specific",
    period: "Weeks 21-24",
    color: "green",
    sections: [
      {
        title: "Interview Preparation",
        tasks: [
          { id: 19, title: "Mock Interviews", duration: "Ongoing", difficulty: "Hard", completed: false },
          { id: 20, title: "Company-Specific Questions", duration: "2 weeks", difficulty: "Hard", completed: false },
          { id: 21, title: "Resume Building", duration: "3 days", difficulty: "Easy", completed: false },
          { id: 22, title: "HR Interview Prep", duration: "1 week", difficulty: "Medium", completed: false },
        ]
      },
    ]
  },
];

export default function RoadmapPage() {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({0: true});

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border') => {
    const colors: Record<string, Record<string, string>> = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-500' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-500' },
      pink: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-500' },
      green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-500' },
    };
    return colors[color]?.[variant] || colors.blue[variant];
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Learning Roadmap</h1>
        <p className="text-slate-600">A structured path from foundation to placement success</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 via-pink-500 to-green-500" />

        <div className="space-y-8">
          {roadmapData.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="relative">
              {/* Phase Marker */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full ${getColorClasses(phase.color, 'bg')} flex items-center justify-center text-white font-bold text-lg shadow-lg z-10`}>
                  {phaseIndex + 1}
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-slate-900">{phase.phase}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(phase.color, 'text')} bg-${phase.color}-50`}>
                      {phase.period}
                    </span>
                  </div>

                  {/* Sections */}
                  <div className="space-y-4 mt-6">
                    {phase.sections.map((section, sectionIndex) => {
                      const sectionKey = phaseIndex * 10 + sectionIndex;
                      const isExpanded = expandedSections[sectionKey];
                      const completedTasks = section.tasks.filter(t => t.completed).length;
                      const totalTasks = section.tasks.length;

                      return (
                        <div key={sectionIndex} className="border border-slate-200 rounded-xl overflow-hidden">
                          {/* Section Header */}
                          <button
                            onClick={() => toggleSection(sectionKey)}
                            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Award className={`w-5 h-5 ${getColorClasses(phase.color, 'text')}`} />
                              <span className="font-semibold text-slate-900">{section.title}</span>
                              <span className="text-sm text-slate-500">
                                ({completedTasks}/{totalTasks} completed)
                              </span>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            )}
                          </button>

                          {/* Tasks */}
                          {isExpanded && (
                            <div className="p-4 space-y-2">
                              {section.tasks.map((task) => (
                                <div
                                  key={task.id}
                                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer"
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    {task.completed ? (
                                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
                                    )}
                                    <div className="flex-1">
                                      <p className={`font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                                        {task.title}
                                      </p>
                                      <div className="flex items-center gap-3 mt-1">
                                        <div className="flex items-center gap-1">
                                          <Clock className="w-3 h-3 text-slate-400" />
                                          <span className="text-xs text-slate-500">{task.duration}</span>
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
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
