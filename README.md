# Full-Stack Authentication App

This project is a full-stack application with a frontend built using **React** and **Next.js** and a backend built using **Node.js** and **Express**. It provides basic authentication functionality, including user login, signup, and a protected profile page. 

## Table of Contents

- [Frontend (React/Next.js)](#frontend-reactnextjs)
  - [Public Pages](#public-pages)
  - [Authentication Pages](#authentication-pages)
  - [Protected Page](#protected-page)
  - [Routing](#routing)
  - [UI](#ui)
  - [Bonus Features](#bonus-features)
- [Backend (Node.js/Express)](#backend-nodesexpress)
  - [Endpoints](#endpoints)
  - [Database](#database)
- [How to Run the Project](#how-to-run-the-project)

---

## Frontend (React/Next.js)

### Public Pages:
- **/public**: A public page accessible without login.

### Authentication Pages:
- **/login**: The login page where users can authenticate.
- **/signup**: The signup page where users can create a new account.

### Protected Page:
- **/profile**: A profile page accessible only after the user is logged in.

### Routing:
- Users trying to access `/profile` without being logged in will be redirected to `/login`.
- After logging in, users will be redirected to `/profile`.

### UI:
- The app features a basic and responsive UI.
- Tailwind CSS is used for styling (no UI libraries).
- The UI adapts to different screen sizes, including a hamburger menu for smaller screens.

### Bonus Features:
- **Debouncing for Real-Time Feedback**: To enhance user experience, **debouncing** has been implemented for the email input field on the signup page. This allows users to receive real-time feedback when entering their email address, improving form validation performance.
- **Signup Feedback**: During the signup process, users are provided with instant feedback on their email and username, ensuring that they know whether the inputs are valid or already taken, making the process smoother and more user-friendly.

---

## Backend (Node.js/Express)

### Endpoints:
- **POST /api/auth/signup**: Creates a new user. It accepts the user's email, username, and password to register.
- **POST /api/auth/login**: Authenticates the user and returns a JWT token to be used for future requests.
- **GET /api/auth/me**: Returns the authenticated user's data (email, username, etc.), only if the user is logged in.
- **GET /api/auth/checkEmail**: Returns the user's data email, for debouncing.
- **GET /api/auth/checkUserName**: Returns the user's data username, for debouncing.

### Database:
- The application uses **MongoDB** to store user data. The database contains user documents with details like email, username, and password.
- The password is securely hashed before storage.

### Image Upload Endpoint:
- **POST /api/auth/upload-image**: Allows users to upload a profile image. This image is stored in the backend and associated with the user's profile.

---

## How to Run the Project

### Prerequisites:
- Install **Node.js** and **npm** on your machine.
- Install **MongoDB** locally or use a cloud-based MongoDB provider like MongoDB Atlas.

### Running the Backend:
1. Navigate to the backend directory.
2. Install the required dependencies:
   npm install
3. Create .env file with these:
FRONTEND_URL="http://localhost:3000"
    
MONGO_URI=""
    
JWT_ACCESS_SECRET=""
    
JWT_REFRESH_SECRET=""

4. npm run dev

### Running the Frontend:
1. Navigate to the Frontend directory.
2. Install the required dependencies:
   npm install
3. npm run dev
