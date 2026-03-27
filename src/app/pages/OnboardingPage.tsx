import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, GraduationCap, Calendar, ArrowRight, Upload, FileText, X } from 'lucide-react';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    field: '',
    year: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!formData.name || !formData.age || !formData.field || !formData.year) {
      alert('Please fill in all required fields');
      return;
    }

    // Save profile data to localStorage
    const profileData = {
      ...formData,
      resumeFileName: resumeFile?.name || null,
      resumeUploaded: !!resumeFile
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // In a real app, you would upload the resume file to a server here
    if (resumeFile) {
      console.log('Resume file ready to upload:', resumeFile);
      // You could convert to base64 and store, or upload to server
    }
    
    // Navigate to assessment test
    navigate('/assessment');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (PDF, DOC, DOCX)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        setResumeFile(file);
      } else {
        alert('Please upload a PDF or Word document');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        setResumeFile(file);
      } else {
        alert('Please upload a PDF or Word document');
      }
    }
  };

  const removeResume = () => {
    setResumeFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-slate-600">
            Help us personalize your placement preparation journey
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                required
                min="16"
                max="40"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your age"
              />
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <GraduationCap className="inline mr-2" size={18} />
                Field of Study *
              </label>
              <select
                value={formData.field}
                onChange={(e) => handleChange('field', e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="">Select your field</option>
                <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                <option value="MCA">MCA (Master of Computer Applications)</option>
                <option value="Engineering">B.Tech/B.E. (Engineering)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Year of Study */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Calendar className="inline mr-2" size={18} />
                Year of Study *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleChange('year', year)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      formData.year === year
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Upload className="inline mr-2" size={18} />
                Upload Resume (Optional)
              </label>
              
              {!resumeFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <Upload className="text-slate-500" size={24} />
                    </div>
                    <div>
                      <p className="text-slate-700 font-medium mb-1">
                        Drag & drop your resume here
                      </p>
                      <p className="text-sm text-slate-500 mb-3">
                        or click to browse files
                      </p>
                    </div>
                    <input
                      type="file"
                      id="resume-upload"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors"
                    >
                      Choose File
                    </label>
                    <p className="text-xs text-slate-400 mt-2">
                      Supported formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{resumeFile.name}</p>
                        <p className="text-sm text-slate-500">{formatFileSize(resumeFile.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeResume}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove resume"
                    >
                      <X className="text-red-500" size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Continue to Skill Assessment
              <ArrowRight size={20} />
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Next Step:</strong> After completing your profile, you'll take a quick skill 
            assessment test (15-20 questions, ~20 minutes) to help us understand your current level 
            and create a personalized roadmap.
          </p>
        </div>
      </div>
    </div>
  );
}