import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, CheckCircle, X } from 'lucide-react';
import axios from 'axios';

interface AssessmentData {
  skills: string[];
  interests: string[];
  experience: string;
  personality: string[];
  workEnvironment: string;
  salaryExpectation: string;
}

const CareerAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [availableInterests, setAvailableInterests] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<AssessmentData>({
    skills: [],
    interests: [],
    experience: 'entry',
    personality: [],
    workEnvironment: 'office',
    salaryExpectation: '50000-75000'
  });

  useEffect(() => {
    // Load available skills and interests from API
    const loadData = async () => {
      try {
        const [skillsResponse, interestsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/skills'),
          axios.get('http://localhost:5000/api/interests')
        ]);
        setAvailableSkills(skillsResponse.data.skills);
        setAvailableInterests(interestsResponse.data.interests);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handlePersonalityToggle = (trait: string) => {
    setFormData(prev => ({
      ...prev,
      personality: prev.personality.includes(trait)
        ? prev.personality.filter(p => p !== trait)
        : [...prev.personality, trait]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/recommendations', formData);
      // Store results in localStorage or state management
      localStorage.setItem('careerResults', JSON.stringify(response.data));
      navigate('/results');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Error submitting assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Skills', description: 'Select your technical and soft skills' },
    { number: 2, title: 'Interests', description: 'Choose areas that interest you' },
    { number: 3, title: 'Experience', description: 'Tell us about your experience level' },
    { number: 4, title: 'Personality', description: 'Select personality traits that describe you' },
    { number: 5, title: 'Preferences', description: 'Set your work environment and salary expectations' }
  ];

  const personalityTraits = [
    'Analytical', 'Creative', 'Extroverted', 'Introverted', 'Leadership',
    'Team Player', 'Detail-oriented', 'Big Picture Thinker', 'Problem Solver',
    'Innovative', 'Organized', 'Adaptable', 'Persistent', 'Communicative'
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Your Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.skills.includes(skill)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Your Interests</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.interests.includes(interest)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience Level</h3>
            <div className="space-y-4">
              {[
                { value: 'entry', label: 'Entry Level (0-2 years)', description: 'Just starting your career' },
                { value: 'mid', label: 'Mid Level (3-7 years)', description: 'Some professional experience' },
                { value: 'senior', label: 'Senior Level (8+ years)', description: 'Extensive professional experience' }
              ].map((level) => (
                <label key={level.value} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="experience"
                    value={level.value}
                    checked={formData.experience === level.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personality Traits</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {personalityTraits.map((trait) => (
                <button
                  key={trait}
                  onClick={() => handlePersonalityToggle(trait)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.personality.includes(trait)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {trait}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Work Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Environment</label>
                <select
                  value={formData.workEnvironment}
                  onChange={(e) => setFormData(prev => ({ ...prev, workEnvironment: e.target.value }))}
                  className="input-field"
                >
                  <option value="office">Office</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="field">Field Work</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Expectation</label>
                <select
                  value={formData.salaryExpectation}
                  onChange={(e) => setFormData(prev => ({ ...prev, salaryExpectation: e.target.value }))}
                  className="input-field"
                >
                  <option value="30000-50000">$30,000 - $50,000</option>
                  <option value="50000-75000">$50,000 - $75,000</option>
                  <option value="75000-100000">$75,000 - $100,000</option>
                  <option value="100000-150000">$100,000 - $150,000</option>
                  <option value="150000+">$150,000+</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <Brain className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Career Assessment
          </h1>
          <p className="text-lg text-gray-600">
            Let's discover your perfect career path. This assessment will take about 5-10 minutes.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span className="font-semibold">{step.number}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm font-medium text-gray-900">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </span>
            <p className="text-sm text-gray-600 mt-1">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Assessment Form */}
        <div className="card">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="btn-primary flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Get Recommendations</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAssessment; 