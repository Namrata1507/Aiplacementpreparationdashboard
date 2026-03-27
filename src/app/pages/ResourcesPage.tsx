import { ExternalLink, Youtube, BookOpen, Code, Laptop, FileText, Trophy } from "lucide-react";

const resourceCategories = [
  {
    title: "Coding Platforms",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    resources: [
      {
        name: "LeetCode",
        description: "Practice coding problems and prepare for interviews",
        url: "https://leetcode.com",
        tag: "Essential",
        icon: "💻",
      },
      {
        name: "HackerRank",
        description: "Coding challenges and skill certification",
        url: "https://hackerrank.com",
        tag: "Popular",
        icon: "🎯",
      },
      {
        name: "CodeChef",
        description: "Competitive programming and contests",
        url: "https://codechef.com",
        tag: "Contests",
        icon: "🍳",
      },
      {
        name: "Codeforces",
        description: "Advanced competitive programming",
        url: "https://codeforces.com",
        tag: "Advanced",
        icon: "⚔️",
      },
    ],
  },
  {
    title: "Learning Resources",
    icon: BookOpen,
    color: "from-purple-500 to-pink-500",
    resources: [
      {
        name: "GeeksforGeeks",
        description: "Tutorials, algorithms, and interview preparation",
        url: "https://geeksforgeeks.org",
        tag: "Essential",
        icon: "📚",
      },
      {
        name: "W3Schools",
        description: "Web development tutorials and references",
        url: "https://w3schools.com",
        tag: "Beginner",
        icon: "🌐",
      },
      {
        name: "TutorialsPoint",
        description: "Programming language tutorials",
        url: "https://tutorialspoint.com",
        tag: "Reference",
        icon: "📖",
      },
      {
        name: "JavaTPoint",
        description: "Java and other language tutorials",
        url: "https://javatpoint.com",
        tag: "Reference",
        icon: "☕",
      },
    ],
  },
  {
    title: "Video Tutorials",
    icon: Youtube,
    color: "from-red-500 to-orange-500",
    resources: [
      {
        name: "freeCodeCamp",
        description: "Free coding tutorials and courses",
        url: "https://youtube.com/@freecodecamp",
        tag: "Free",
        icon: "🎓",
      },
      {
        name: "Traversy Media",
        description: "Web development crash courses",
        url: "https://youtube.com/@traversymedia",
        tag: "Popular",
        icon: "🎬",
      },
      {
        name: "Programming with Mosh",
        description: "Clean code and programming fundamentals",
        url: "https://youtube.com/@programmingwithmosh",
        tag: "Quality",
        icon: "👨‍🏫",
      },
      {
        name: "The Net Ninja",
        description: "Modern web development tutorials",
        url: "https://youtube.com/@netninja",
        tag: "Trending",
        icon: "🥷",
      },
    ],
  },
  {
    title: "Interview Prep",
    icon: Laptop,
    color: "from-green-500 to-emerald-500",
    resources: [
      {
        name: "InterviewBit",
        description: "Structured interview preparation courses",
        url: "https://interviewbit.com",
        tag: "Structured",
        icon: "🎤",
      },
      {
        name: "Pramp",
        description: "Practice mock interviews with peers",
        url: "https://pramp.com",
        tag: "Mock",
        icon: "🤝",
      },
      {
        name: "interviewing.io",
        description: "Anonymous technical interviews",
        url: "https://interviewing.io",
        tag: "Practice",
        icon: "🎭",
      },
      {
        name: "Blind",
        description: "Professional network for tech workers",
        url: "https://teamblind.com",
        tag: "Community",
        icon: "👥",
      },
    ],
  },
  {
    title: "Aptitude & Reasoning",
    icon: FileText,
    color: "from-yellow-500 to-orange-500",
    resources: [
      {
        name: "IndiaBix",
        description: "Aptitude questions and solutions",
        url: "https://indiabix.com",
        tag: "Essential",
        icon: "📝",
      },
      {
        name: "PrepInsta",
        description: "Company-wise placement papers",
        url: "https://prepinsta.com",
        tag: "Company-wise",
        icon: "💼",
      },
      {
        name: "Cracku",
        description: "Aptitude questions and mock tests",
        url: "https://cracku.in",
        tag: "Mock Tests",
        icon: "✅",
      },
      {
        name: "FreshersWorld",
        description: "Placement papers and job alerts",
        url: "https://freshersworld.com",
        tag: "Jobs",
        icon: "🔔",
      },
    ],
  },
  {
    title: "Competitive Programming",
    icon: Trophy,
    color: "from-indigo-500 to-purple-500",
    resources: [
      {
        name: "AtCoder",
        description: "Japanese competitive programming platform",
        url: "https://atcoder.jp",
        tag: "International",
        icon: "🗾",
      },
      {
        name: "TopCoder",
        description: "Competitive programming and challenges",
        url: "https://topcoder.com",
        tag: "Classic",
        icon: "🏆",
      },
      {
        name: "SPOJ",
        description: "Sphere online judge problems",
        url: "https://spoj.com",
        tag: "Practice",
        icon: "🌍",
      },
      {
        name: "Project Euler",
        description: "Mathematical programming challenges",
        url: "https://projecteuler.net",
        tag: "Math",
        icon: "🔢",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Learning Resources</h1>
        <p className="text-slate-600">Curated collection of platforms and tools for placement preparation</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold mb-1">24+</div>
          <div className="text-sm text-blue-100">Platforms</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold mb-1">6</div>
          <div className="text-sm text-purple-100">Categories</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold mb-1">100%</div>
          <div className="text-sm text-green-100">Free Access</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold mb-1">24/7</div>
          <div className="text-sm text-orange-100">Available</div>
        </div>
      </div>

      {/* Resource Categories */}
      {resourceCategories.map((category, categoryIndex) => {
        const Icon = category.icon;
        return (
          <div key={categoryIndex} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{category.title}</h2>
                <p className="text-sm text-slate-600">{category.resources.length} resources available</p>
              </div>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.resources.map((resource, resourceIndex) => (
                <a
                  key={resourceIndex}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all group cursor-pointer"
                >
                  {/* Icon */}
                  <div className="text-3xl w-12 h-12 rounded-lg bg-slate-100 group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-colors">
                    {resource.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                        {resource.name}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                        resource.tag === 'Essential' ? 'bg-red-100 text-red-700' :
                        resource.tag === 'Popular' ? 'bg-blue-100 text-blue-700' :
                        resource.tag === 'Free' ? 'bg-green-100 text-green-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {resource.tag}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{resource.description}</p>
                  </div>

                  {/* Link Icon */}
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-purple-600 flex-shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        );
      })}

      {/* Pro Tip */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-purple-200">
        <h3 className="font-bold text-slate-900 mb-2">💡 Pro Tips</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <p>Start with one platform in each category and master it before moving to others</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <p>Use video tutorials to understand concepts, then practice on coding platforms</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">•</span>
            <p>Join community forums and discussion groups to stay motivated and get help</p>
          </div>
        </div>
      </div>
    </div>
  );
}
