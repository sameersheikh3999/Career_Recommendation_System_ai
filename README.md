# AI-Powered Career Recommendation System

An intelligent career recommendation system that uses machine learning to suggest personalized career paths based on user skills, interests, and preferences.

## 🚀 Features

- **Skill Analysis**: Analyze user skills and experience levels
- **Interest Matching**: Match user interests with career opportunities
- **Personality Assessment**: Consider personality traits in recommendations
- **Market Trends**: Incorporate current job market trends
- **Interactive UI**: Modern, responsive web interface
- **Personalized Reports**: Detailed career path recommendations with explanations

## 🛠️ Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Python Flask
- **Machine Learning**: Scikit-learn, Pandas, NumPy
- **Database**: SQLite (for development)
- **Styling**: Tailwind CSS
- **Deployment**: Docker support

## 📁 Project Structure

```
AI_Powered_Career_Recommendation_System/
├── frontend/                 # React frontend application
├── backend/                  # Flask backend API
├── ml_models/               # Machine learning models and data
├── data/                    # Career and job data
├── docs/                    # Documentation
└── docker/                  # Docker configuration
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AI_Powered_Career_Recommendation_System.git
   cd AI_Powered_Career_Recommendation_System
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📊 How It Works

1. **User Input**: Users provide their skills, interests, experience, and preferences
2. **Data Processing**: The system processes and normalizes user input
3. **ML Analysis**: Machine learning models analyze compatibility with different careers
4. **Recommendation Engine**: Generates personalized career recommendations
5. **Results Display**: Presents detailed career paths with explanations

## 🤖 Machine Learning Models

- **Skill Matching Algorithm**: Cosine similarity for skill-job matching
- **Interest Classification**: Multi-label classification for interest areas
- **Career Clustering**: K-means clustering for career categorization
- **Recommendation Engine**: Collaborative filtering and content-based filtering

## 📈 Data Sources

- Career information from various job boards
- Skill requirements from industry standards
- Salary data and market trends
- Job growth projections

## 🧪 Testing

```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests
cd frontend
npm test
```

## 📝 API Documentation

### Endpoints

- `POST /api/recommendations` - Get career recommendations
- `GET /api/careers` - Get all available careers
- `GET /api/skills` - Get all skills database
- `POST /api/feedback` - Submit feedback on recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Career data sources and APIs
- Open-source machine learning libraries
- Community contributors and feedback

## 📞 Contact

- Project Link: [https://github.com/yourusername/AI_Powered_Career_Recommendation_System](https://github.com/yourusername/AI_Powered_Career_Recommendation_System)
- Issues: [https://github.com/yourusername/AI_Powered_Career_Recommendation_System/issues](https://github.com/yourusername/AI_Powered_Career_Recommendation_System/issues)

---

⭐ Star this repository if you find it helpful! 