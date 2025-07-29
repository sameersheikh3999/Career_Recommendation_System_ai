#!/usr/bin/env python3
"""
Setup script for CareerAI - AI-Powered Career Recommendation System
"""

import os
import sys
import subprocess
import platform

def run_command(command, cwd=None):
    """Run a command and return the result"""
    try:
        result = subprocess.run(command, shell=True, check=True, cwd=cwd, 
                              capture_output=True, text=True)
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, e.stderr

def check_python_version():
    """Check if Python version is compatible"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8 or higher is required")
        print(f"Current version: {version.major}.{version.minor}.{version.micro}")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} detected")
    return True

def check_node_version():
    """Check if Node.js is installed and version is compatible"""
    success, output = run_command("node --version")
    if not success:
        print("❌ Node.js is not installed")
        print("Please install Node.js 16 or higher from https://nodejs.org/")
        return False
    
    version = output.strip().replace('v', '')
    major_version = int(version.split('.')[0])
    if major_version < 16:
        print(f"❌ Node.js 16 or higher is required")
        print(f"Current version: {version}")
        return False
    
    print(f"✅ Node.js {version} detected")
    return True

def install_backend_dependencies():
    """Install Python dependencies for the backend"""
    print("\n🔧 Installing backend dependencies...")
    
    # Create virtual environment if it doesn't exist
    if not os.path.exists("backend/venv"):
        print("Creating virtual environment...")
        success, output = run_command("python -m venv venv", cwd="backend")
        if not success:
            print(f"❌ Failed to create virtual environment: {output}")
            return False
    
    # Install dependencies
    pip_cmd = "venv/bin/pip" if platform.system() != "Windows" else "venv\\Scripts\\pip"
    success, output = run_command(f"{pip_cmd} install -r requirements.txt", cwd="backend")
    if not success:
        print(f"❌ Failed to install backend dependencies: {output}")
        return False
    
    print("✅ Backend dependencies installed successfully")
    return True

def install_frontend_dependencies():
    """Install Node.js dependencies for the frontend"""
    print("\n🔧 Installing frontend dependencies...")
    
    success, output = run_command("npm install", cwd="frontend")
    if not success:
        print(f"❌ Failed to install frontend dependencies: {output}")
        return False
    
    print("✅ Frontend dependencies installed successfully")
    return True

def create_env_file():
    """Create environment file if it doesn't exist"""
    env_file = "backend/.env"
    if not os.path.exists(env_file):
        print("\n📝 Creating environment file...")
        with open(env_file, "w") as f:
            f.write("# CareerAI Environment Variables\n")
            f.write("FLASK_ENV=development\n")
            f.write("FLASK_DEBUG=True\n")
            f.write("API_URL=http://localhost:5000\n")
        print("✅ Environment file created")

def main():
    """Main setup function"""
    print("🚀 CareerAI Setup Script")
    print("=" * 50)
    
    # Check prerequisites
    print("\n📋 Checking prerequisites...")
    if not check_python_version():
        return False
    
    if not check_node_version():
        return False
    
    # Install dependencies
    if not install_backend_dependencies():
        return False
    
    if not install_frontend_dependencies():
        return False
    
    # Create environment file
    create_env_file()
    
    print("\n🎉 Setup completed successfully!")
    print("\n📖 Next steps:")
    print("1. Start the backend server:")
    print("   cd backend")
    print("   python app.py")
    print("\n2. In a new terminal, start the frontend:")
    print("   cd frontend")
    print("   npm start")
    print("\n3. Open your browser and go to: http://localhost:3000")
    print("\n📚 For more information, see the README.md file")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 