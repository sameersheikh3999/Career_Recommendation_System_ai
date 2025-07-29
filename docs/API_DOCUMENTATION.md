# CareerAI API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication
Currently, the API does not require authentication. All endpoints are publicly accessible.

## Endpoints

### 1. Health Check

**GET** `/api/health`

Check if the API is running and healthy.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Get Career Recommendations

**POST** `/api/recommendations`

Get personalized career recommendations based on user input.

**Request Body:**
```json
{
  "skills": ["Python", "JavaScript", "SQL"],
  "interests": ["Technology", "Problem Solving", "Analytics"],
  "experience": "entry",
  "personality": ["Analytical", "Creative", "Team Player"],
  "workEnvironment": "office",
  "salaryExpectation": "50000-75000"
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "career_id": 1,
      "title": "Software Engineer",
      "description": "Develop software applications and systems...",
      "skills_required": "Python,JavaScript,Java,SQL,Git,Agile",
      "salary_range": "$60,000 - $120,000",
      "growth_potential": "High",
      "work_environment": "Office/Remote",
      "skill_score": 0.85,
      "interest_score": 0.75,
      "experience_score": 1.0,
      "overall_score": 0.87,
      "match_reasons": ["Strong skill alignment", "High interest compatibility"]
    }
  ],
  "total_recommendations": 10,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 3. Get All Careers

**GET** `/api/careers`

Retrieve all available careers in the database.

**Response:**
```json
{
  "careers": [
    {
      "id": 1,
      "title": "Software Engineer",
      "description": "Develop software applications...",
      "skills": "Python,JavaScript,Java,SQL,Git,Agile",
      "interests": "Technology,Problem Solving,Programming,Innovation",
      "experience_level": "entry",
      "salary_range": "$60,000 - $120,000",
      "growth_potential": "High",
      "work_environment": "Office/Remote"
    }
  ],
  "total_careers": 25
}
```

### 4. Get All Skills

**GET** `/api/skills`

Retrieve all available skills in the database.

**Response:**
```json
{
  "skills": [
    "Python",
    "JavaScript",
    "Java",
    "SQL",
    "Machine Learning",
    "Data Analysis"
  ],
  "total_skills": 50
}
```

### 5. Get All Interests

**GET** `/api/interests`

Retrieve all available interests in the database.

**Response:**
```json
{
  "interests": [
    "Technology",
    "Problem Solving",
    "Analytics",
    "Creativity",
    "Business"
  ],
  "total_interests": 30
}
```

### 6. Get Career Details

**GET** `/api/career/{career_id}`

Get detailed information about a specific career.

**Parameters:**
- `career_id` (integer): The ID of the career

**Response:**
```json
{
  "id": 1,
  "title": "Software Engineer",
  "description": "Develop software applications and systems...",
  "skills": "Python,JavaScript,Java,SQL,Git,Agile",
  "interests": "Technology,Problem Solving,Programming,Innovation",
  "experience_level": "entry",
  "salary_range": "$60,000 - $120,000",
  "growth_potential": "High",
  "work_environment": "Office/Remote"
}
```

### 7. Submit Feedback

**POST** `/api/feedback`

Submit feedback about career recommendations.

**Request Body:**
```json
{
  "career_id": 1,
  "rating": 5,
  "feedback": "Great recommendation!",
  "user_id": "user123"
}
```

**Response:**
```json
{
  "message": "Feedback submitted successfully",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "No data provided"
}
```

### 404 Not Found
```json
{
  "error": "Career not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error message"
}
```

## Data Models

### Career Model
```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "skills": "string (comma-separated)",
  "interests": "string (comma-separated)",
  "experience_level": "string (entry|mid|senior)",
  "salary_range": "string",
  "growth_potential": "string (Low|Medium|High|Very High)",
  "work_environment": "string"
}
```

### Recommendation Model
```json
{
  "career_id": "integer",
  "title": "string",
  "description": "string",
  "skills_required": "string",
  "salary_range": "string",
  "growth_potential": "string",
  "work_environment": "string",
  "skill_score": "float (0-1)",
  "interest_score": "float (0-1)",
  "experience_score": "float (0-1)",
  "overall_score": "float (0-1)",
  "match_reasons": "array of strings"
}
```

## Rate Limiting

Currently, there are no rate limits implemented. However, it's recommended to implement rate limiting for production use.

## CORS

The API supports CORS and is configured to accept requests from any origin during development. For production, you should configure specific allowed origins.

## Testing

You can test the API endpoints using tools like:
- Postman
- curl
- Insomnia
- Thunder Client (VS Code extension)

### Example curl commands:

```bash
# Health check
curl http://localhost:5000/api/health

# Get recommendations
curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "skills": ["Python", "JavaScript"],
    "interests": ["Technology", "Problem Solving"],
    "experience": "entry"
  }'

# Get all careers
curl http://localhost:5000/api/careers

# Get specific career
curl http://localhost:5000/api/career/1
``` 