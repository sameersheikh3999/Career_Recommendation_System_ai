import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Star, TrendingUp, DollarSign, Users, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';

interface CareerRecommendation {
  career_id: number;
  title: string;
  description: string;
  skills_required: string;
  salary_range: string;
  growth_potential: string;
  work_environment: string;
  skill_score: number;
  interest_score: number;
  experience_score: number;
  overall_score: number;
  match_reasons: string[];
}

const Results: React.FC = () => {
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null);

  useEffect(() => {
    const loadResults = () => {
      try {
        const resultsData = localStorage.getItem('careerResults');
        if (resultsData) {
          const data = JSON.parse(resultsData);
          setRecommendations(data.recommendations || []);
        }
      } catch (error) {
        console.error('Error loading results:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.8) return 'Excellent';
    if (score >= 0.6) return 'Good';
    if (score >= 0.4) return 'Fair';
    return 'Poor';
  };

  const getGrowthIcon = (growth: string) => {
    switch (growth.toLowerCase()) {
      case 'very high':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'high':
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      default:
        return <TrendingUp className="h-5 w-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your career recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <Brain className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Career Recommendations
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Based on your assessment, here are the careers that best match your profile.
          </p>
          <Link
            to="/assessment"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Take Assessment Again</span>
          </Link>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recommendations List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Recommendations</h2>
            {recommendations.map((career, index) => (
              <div
                key={career.career_id}
                className={`card cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCareer?.career_id === career.career_id ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => setSelectedCareer(career)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-primary-100 text-primary-800 text-sm font-medium px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">{career.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{career.description}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(career.overall_score)}`}>
                      {Math.round(career.overall_score * 100)}%
                    </div>
                    <div className="text-sm text-gray-500">{getScoreLabel(career.overall_score)} Match</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-700">Skills</div>
                    <div className={`text-lg font-semibold ${getScoreColor(career.skill_score)}`}>
                      {Math.round(career.skill_score * 100)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-700">Interests</div>
                    <div className={`text-lg font-semibold ${getScoreColor(career.interest_score)}`}>
                      {Math.round(career.interest_score * 100)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-700">Experience</div>
                    <div className={`text-lg font-semibold ${getScoreColor(career.experience_score)}`}>
                      {Math.round(career.experience_score * 100)}%
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {career.match_reasons.map((reason, idx) => (
                    <span key={idx} className="tag tag-skill text-xs">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Career Details */}
          <div className="lg:sticky lg:top-8">
            {selectedCareer ? (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedCareer.title}</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedCareer.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.skills_required.split(',').map((skill, idx) => (
                        <span key={idx} className="tag tag-skill">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <h4 className="font-semibold text-gray-900">Salary Range</h4>
                      </div>
                      <p className="text-gray-600">{selectedCareer.salary_range}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        {getGrowthIcon(selectedCareer.growth_potential)}
                        <h4 className="font-semibold text-gray-900">Growth Potential</h4>
                      </div>
                      <p className="text-gray-600">{selectedCareer.growth_potential}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Work Environment</h3>
                    <p className="text-gray-600">{selectedCareer.work_environment}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Why This Career Matches You</h3>
                    <ul className="space-y-2">
                      {selectedCareer.match_reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                          <span className="text-gray-600">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-4 pt-4 border-t border-gray-200">
                    <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Like This Career</span>
                    </button>
                    <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                      <ThumbsDown className="h-4 w-4" />
                      <span>Not Interested</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card text-center py-12">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Career</h3>
                <p className="text-gray-600">
                  Click on any career from the list to see detailed information and why it matches your profile.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results; 