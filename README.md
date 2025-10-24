📚 CoursePedia — A Full-Stack LMS Platform
CoursePedia is a comprehensive, role-based Learning Management System (LMS) built as a full-stack learning project. It empowers instructors to create and manage courses, while enabling students to browse, enroll, and track their learning progress.

This project serves as a practical, end-to-end exploration of how modern, real-world full-stack applications are structured and built.

✨ Core Features
Role-Based Access Control: Separate dashboards and functionalities for Instructors (👨‍🏫) and Students (👨‍🎓).

Course Management: Full CRUD (Create, Read, Update, Delete) operations for courses, including publish/unpublish toggles.

Lecture Control: Ability to add, edit, and delete video lectures within each course.

Secure APIs: Backend APIs secured with robust validation and sanitization.

Video Uploads: Integrated with Cloudinary for efficient video lecture hosting.

Payment Integration: Seamless course purchasing powered by the Razorpay payment gateway.

Progress Tracking: Students can track their course completion progress.

Reviews & Ratings: Functionality for students to leave reviews and ratings on courses.

User Dashboards: Dedicated dashboards providing analytics and information based on user roles.

⚙️ Tech Stack
Frontend
React

Redux Toolkit (For complex state management)

Tailwind CSS (For modern UI/UX design)

Firebase (For Google Authentication)

Backend
Node.js

Express.js (Server framework)

MongoDB (Database)

JWT (JSON Web Tokens) (For authentication & authorization)

Services & Integrations
Cloudinary (Video and Image Hosting)

Razorpay (Payment Gateway)

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

1. Prerequisites
Ensure you have the following installed on your system:

Node.js (which includes npm)

MongoDB (or a MongoDB Atlas account)

2. Installation
Clone the repository:

Bash

git clone https://github.com/your-username/coursepedia.git
cd coursepedia
Set up the Backend:

Navigate to the server directory and install dependencies:

Bash

cd server
npm install
Create a .env file in the server directory. (See the 🔑 Environment Variables section below).

Start the backend server:

Bash

npm run dev
Set up the Frontend:

Navigate to the client directory from the root folder and install dependencies:

Bash

cd ../client
npm install
Create a .env file in the client directory for your Firebase config keys.

Start the React development server:

Bash

npm run dev
🔑 Environment Variables
You will need to create a .env file in the server directory and add the following variables:

Code snippet

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_super_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
You also need to add your Firebase configuration to a .env file in the client directory:

Code snippet

# Firebase (Frontend .env)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
# ... (and other Firebase config keys)
💡 Future Scope
(Coming Soon) AI Help: Integrate the Gemini API to provide an AI-powered help assistant for students.

Advanced Dashboard: Detailed analytics for instructors on course performance and student engagement.

Quizzes & Assignments: Implement functionality for adding quizzes and assignments to courses.
