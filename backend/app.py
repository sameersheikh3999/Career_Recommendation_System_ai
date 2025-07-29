from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
import joblib
import os
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# Global variables for models and data
careers_data = None
skills_vectorizer = None
career_clusters = None

def load_data():
    """Load career data and initialize models"""
    global careers_data, skills_vectorizer, career_clusters
    
    # Load career data
    careers_data = pd.read_csv('data/careers.csv')
    
    # Initialize TF-IDF vectorizer for skills
    skills_vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
    skills_matrix = skills_vectorizer.fit_transform(careers_data['skills'].fillna(''))
    
    # Create career clusters
    kmeans = KMeans(n_clusters=10, random_state=42)
    career_clusters = kmeans.fit_predict(skills_matrix)
    
    return careers_data, skills_vectorizer, career_clusters

def calculate_skill_similarity(user_skills, career_skills):
    """Calculate similarity between user skills and career requirements"""
    user_skills_text = ' '.join(user_skills)
    career_skills_text = career_skills if isinstance(career_skills, str) else ' '.join(career_skills)
    
    # Vectorize the texts
    combined_texts = [user_skills_text, career_skills_text]
    tfidf_matrix = skills_vectorizer.transform(combined_texts)
    
    # Calculate cosine similarity
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    return similarity

def get_career_recommendations(user_data):
    """Generate career recommendations based on user input"""
    user_skills = user_data.get('skills', [])
    user_interests = user_data.get('interests', [])
    user_experience = user_data.get('experience', 'entry')
    user_personality = user_data.get('personality', [])
    
    recommendations = []
    
    for idx, career in careers_data.iterrows():
        # Calculate skill similarity
        skill_score = calculate_skill_similarity(user_skills, career['skills'])
        
        # Calculate interest match
        interest_score = 0
        if user_interests:
            career_interests = career['interests'].split(',') if pd.notna(career['interests']) else []
            common_interests = set(user_interests) & set(career_interests)
            interest_score = len(common_interests) / len(user_interests) if user_interests else 0
        
        # Experience level match
        experience_score = 1.0 if career['experience_level'] == user_experience else 0.5
        
        # Personality match
        personality_score = 0.5  # Default score, can be enhanced with personality analysis
        
        # Calculate overall score
        overall_score = (skill_score * 0.4 + interest_score * 0.3 + 
                        experience_score * 0.2 + personality_score * 0.1)
        
        recommendations.append({
            'career_id': career['id'],
            'title': career['title'],
            'description': career['description'],
            'skills_required': career['skills'],
            'salary_range': career['salary_range'],
            'growth_potential': career['growth_potential'],
            'work_environment': career['work_environment'],
            'skill_score': round(skill_score, 3),
            'interest_score': round(interest_score, 3),
            'experience_score': round(experience_score, 3),
            'overall_score': round(overall_score, 3),
            'match_reasons': get_match_reasons(skill_score, interest_score, experience_score)
        })
    
    # Sort by overall score and return top recommendations
    recommendations.sort(key=lambda x: x['overall_score'], reverse=True)
    return recommendations[:10]

def get_match_reasons(skill_score, interest_score, experience_score):
    """Generate reasons why a career matches the user"""
    reasons = []
    
    if skill_score > 0.7:
        reasons.append("Strong skill alignment")
    elif skill_score > 0.4:
        reasons.append("Moderate skill match")
    
    if interest_score > 0.6:
        reasons.append("High interest compatibility")
    elif interest_score > 0.3:
        reasons.append("Some interest overlap")
    
    if experience_score > 0.8:
        reasons.append("Perfect experience level match")
    
    return reasons

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    """Get career recommendations based on user input"""
    try:
        user_data = request.json
        
        if not user_data:
            return jsonify({'error': 'No data provided'}), 400
        
        recommendations = get_career_recommendations(user_data)
        
        return jsonify({
            'recommendations': recommendations,
            'total_recommendations': len(recommendations),
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/careers', methods=['GET'])
def get_all_careers():
    """Get all available careers"""
    try:
        careers_list = careers_data.to_dict('records')
        return jsonify({
            'careers': careers_list,
            'total_careers': len(careers_list)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/skills', methods=['GET'])
def get_all_skills():
    """Get all available skills"""
    try:
        all_skills = set()
        for skills in careers_data['skills'].dropna():
            if isinstance(skills, str):
                all_skills.update([skill.strip() for skill in skills.split(',')])
        
        return jsonify({
            'skills': sorted(list(all_skills)),
            'total_skills': len(all_skills)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/interests', methods=['GET'])
def get_all_interests():
    """Get all available interests"""
    try:
        all_interests = set()
        for interests in careers_data['interests'].dropna():
            if isinstance(interests, str):
                all_interests.update([interest.strip() for interest in interests.split(',')])
        
        return jsonify({
            'interests': sorted(list(all_interests)),
            'total_interests': len(all_interests)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    """Submit feedback on recommendations"""
    try:
        feedback_data = request.json
        
        # In a real application, you would save this to a database
        # For now, we'll just log it
        print(f"Feedback received: {feedback_data}")
        
        return jsonify({
            'message': 'Feedback submitted successfully',
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/career/<int:career_id>', methods=['GET'])
def get_career_details(career_id):
    """Get detailed information about a specific career"""
    try:
        career = careers_data[careers_data['id'] == career_id]
        
        if career.empty:
            return jsonify({'error': 'Career not found'}), 404
        
        career_data = career.iloc[0].to_dict()
        return jsonify(career_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Load data when starting the application
    print("Loading career data and initializing models...")
    load_data()
    print("Data loaded successfully!")
    
    app.run(debug=True, host='0.0.0.0', port=5000) 