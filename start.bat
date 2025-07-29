@echo off
echo Starting CareerAI - AI-Powered Career Recommendation System
echo ==========================================================

echo.
echo Starting Backend Server...
start "CareerAI Backend" cmd /k "cd backend && python app.py"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend Server...
start "CareerAI Frontend" cmd /k "cd frontend && npm start"

echo.
echo 🎉 CareerAI is starting up!
echo.
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul 