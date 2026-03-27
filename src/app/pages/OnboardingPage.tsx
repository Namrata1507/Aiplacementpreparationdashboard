import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, ChevronRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const steps = ['Academic Year', 'Skill Level', 'Target Companies', 'Complete'];

const academicYears = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const skillLevels = [
  { value: 'beginner', label: 'Beginner', desc: 'Just starting out' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
  { value: 'advanced', label: 'Advanced', desc: 'Strong foundation' },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    academicYear: '',
    skillLevel: '',
    targetCompanies: '',
    name: '',
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      localStorage.setItem('hasOnboarded', 'true');
      localStorage.setItem('userName', formData.name || 'Student');
      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/dashboard');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name && formData.academicYear;
      case 1:
        return formData.skillLevel;
      case 2:
        return true; // Optional step
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-xl text-white">Autonomy Loop AI</h1>
              <p className="text-xs text-white/80">Your Placement Preparation Assistant</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  index <= currentStep
                    ? 'bg-white text-purple-600'
                    : 'bg-white/20 text-white/60'
                }`}
              >
                {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-1 mx-2 rounded transition-all ${
                    index < currentStep ? 'bg-white' : 'bg-white/20'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Step 0: Academic Year */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome! Let's get started</h2>
                <p className="text-slate-600">Tell us a bit about yourself</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Select Your Academic Year</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {academicYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => setFormData({ ...formData, academicYear: year })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.academicYear === year
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-slate-200 hover:border-purple-300'
                        }`}
                      >
                        <span className="font-semibold text-slate-900">{year}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Skill Level */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">What's your current skill level?</h2>
                <p className="text-slate-600">This helps us personalize your learning path</p>
              </div>

              <div className="space-y-3">
                {skillLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setFormData({ ...formData, skillLevel: level.value })}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      formData.skillLevel === level.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold text-slate-900">{level.label}</div>
                    <div className="text-sm text-slate-600">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Target Companies */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Target Companies (Optional)</h2>
                <p className="text-slate-600">Which companies are you aiming for?</p>
              </div>

              <div>
                <Label htmlFor="companies">Company Names</Label>
                <Input
                  id="companies"
                  placeholder="e.g., Google, Microsoft, TCS (separate by commas)"
                  value={formData.targetCompanies}
                  onChange={(e) => setFormData({ ...formData, targetCompanies: e.target.value })}
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-2">You can always update this later</p>
              </div>
            </div>
          )}

          {/* Step 3: Complete */}
          {currentStep === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">All Set! 🎉</h2>
                <p className="text-slate-600">
                  Your personalized roadmap is ready. Let's start your placement preparation journey!
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 mt-8">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
