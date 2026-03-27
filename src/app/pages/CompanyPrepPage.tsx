import { useState } from "react";
import { Building2, ChevronRight, CheckCircle, Circle, ExternalLink } from "lucide-react";

const companies = [
  {
    id: 1,
    name: "Google",
    logo: "🔍",
    difficulty: "Very Hard",
    color: "red",
    stages: [
      { name: "Online Assessment", status: "not-started", duration: "90 min" },
      { name: "Phone Screen", status: "locked", duration: "45 min" },
      { name: "Technical Round 1", status: "locked", duration: "60 min" },
      { name: "Technical Round 2", status: "locked", duration: "60 min" },
      { name: "Behavioral Interview", status: "locked", duration: "45 min" },
    ],
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "💠",
    difficulty: "Hard",
    color: "blue",
    stages: [
      { name: "Online Coding Test", status: "completed", duration: "90 min" },
      { name: "Technical Interview 1", status: "in-progress", duration: "60 min" },
      { name: "Technical Interview 2", status: "locked", duration: "60 min" },
      { name: "HR Round", status: "locked", duration: "30 min" },
    ],
  },
  {
    id: 3,
    name: "TCS",
    logo: "💼",
    difficulty: "Medium",
    color: "purple",
    stages: [
      { name: "Aptitude Test", status: "completed", duration: "90 min" },
      { name: "Coding Round", status: "completed", duration: "60 min" },
      { name: "Technical Interview", status: "completed", duration: "45 min" },
      { name: "HR Interview", status: "in-progress", duration: "30 min" },
    ],
  },
  {
    id: 4,
    name: "Infosys",
    logo: "🏢",
    difficulty: "Medium",
    color: "green",
    stages: [
      { name: "Online Test", status: "not-started", duration: "95 min" },
      { name: "Technical Interview", status: "locked", duration: "45 min" },
      { name: "HR Interview", status: "locked", duration: "30 min" },
    ],
  },
  {
    id: 5,
    name: "Amazon",
    logo: "📦",
    difficulty: "Hard",
    color: "orange",
    stages: [
      { name: "Online Assessment", status: "not-started", duration: "90 min" },
      { name: "Phone Screen", status: "locked", duration: "45 min" },
      { name: "Onsite Round 1", status: "locked", duration: "60 min" },
      { name: "Onsite Round 2", status: "locked", duration: "60 min" },
      { name: "Bar Raiser", status: "locked", duration: "60 min" },
    ],
  },
  {
    id: 6,
    name: "Wipro",
    logo: "🌐",
    difficulty: "Easy",
    color: "indigo",
    stages: [
      { name: "Written Test", status: "not-started", duration: "120 min" },
      { name: "Technical Interview", status: "locked", duration: "40 min" },
      { name: "HR Interview", status: "locked", duration: "25 min" },
    ],
  },
];

const practiceSets = {
  aptitude: [
    { name: "Quantitative Aptitude - Time & Work", questions: 25, difficulty: "Medium" },
    { name: "Logical Reasoning - Pattern Recognition", questions: 30, difficulty: "Easy" },
    { name: "Data Interpretation", questions: 20, difficulty: "Hard" },
  ],
  coding: [
    { name: "Company-wise DSA Problems", questions: 50, difficulty: "Medium" },
    { name: "Top Interview Questions", questions: 75, difficulty: "Hard" },
    { name: "Quick Revision Set", questions: 40, difficulty: "Easy" },
  ],
  technical: [
    { name: "Operating Systems Concepts", questions: 30, difficulty: "Medium" },
    { name: "DBMS Fundamentals", questions: 35, difficulty: "Medium" },
    { name: "OOP Concepts", questions: 25, difficulty: "Easy" },
  ],
  hr: [
    { name: "Common HR Questions", questions: 20, difficulty: "Easy" },
    { name: "Behavioral Questions", questions: 15, difficulty: "Medium" },
    { name: "Company-specific Questions", questions: 10, difficulty: "Medium" },
  ],
};

export default function CompanyPrepPage() {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [selectedTab, setSelectedTab] = useState<keyof typeof practiceSets>("coding");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />;
      case "locked":
        return <Circle className="w-5 h-5 text-slate-300" />;
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Company Preparation</h1>
        <p className="text-slate-600">Track progress for company-specific preparation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <h2 className="font-bold text-slate-900 mb-4 px-2">Target Companies</h2>
            <div className="space-y-2">
              {companies.map((company) => {
                const isSelected = selectedCompany.id === company.id;
                const completed = company.stages.filter(s => s.status === "completed").length;
                const total = company.stages.length;

                return (
                  <button
                    key={company.id}
                    onClick={() => setSelectedCompany(company)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'border border-slate-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className={`text-2xl w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-white/20' : 'bg-slate-100'
                    }`}>
                      {company.logo}
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {company.name}
                      </p>
                      <p className={`text-xs ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                        {completed}/{total} stages
                      </p>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Header */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                {selectedCompany.logo}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedCompany.name}</h2>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedCompany.difficulty === 'Very Hard' ? 'bg-red-100 text-red-700' :
                    selectedCompany.difficulty === 'Hard' ? 'bg-orange-100 text-orange-700' :
                    selectedCompany.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {selectedCompany.difficulty}
                  </span>
                  <span className="text-sm text-slate-600">
                    {selectedCompany.stages.filter(s => s.status === "completed").length} of {selectedCompany.stages.length} completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interview Stages */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Interview Stages</h3>
            <div className="space-y-3">
              {selectedCompany.stages.map((stage, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    stage.status === "completed" ? 'bg-green-50 border-green-200' :
                    stage.status === "in-progress" ? 'bg-blue-50 border-blue-200' :
                    stage.status === "locked" ? 'bg-slate-50 border-slate-200 opacity-60' :
                    'border-slate-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {getStatusIcon(stage.status)}
                    <div>
                      <p className={`font-medium ${
                        stage.status === "locked" ? 'text-slate-500' : 'text-slate-900'
                      }`}>
                        {stage.name}
                      </p>
                      <p className="text-sm text-slate-500">{stage.duration}</p>
                    </div>
                  </div>
                  {stage.status === "not-started" && (
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                      Start
                    </button>
                  )}
                  {stage.status === "in-progress" && (
                    <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all">
                      Continue
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Practice Sets */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Practice Sets</h2>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          {(Object.keys(practiceSets) as Array<keyof typeof practiceSets>).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-all ${
                selectedTab === tab
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Practice Set Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceSets[selectedTab].map((set, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                  {set.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">{set.questions} questions</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  set.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  set.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {set.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
