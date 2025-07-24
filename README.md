# REST Countries API Documentation

ExamApp is a web-based examination platform built with React and Tailwind CSS, designed for users to take exams, view results, and manage their sessions securely. The application features a modern, responsive UI with a dark, semi-transparent theme (bg-gray-800/60, backdrop-blur-sm, bg-gradient-to-br). Users are locked into the exam attempt page to prevent navigation away, ensuring a focused testing environment. The app integrates with a backend API for fetching exams, submitting answers, and retrieving results, with authentication handled via JWT.
React: JavaScript library for building user interfaces.
React Router: For client-side routing (/, /results, /attempt, /login).
Tailwind CSS: Utility-first CSS framework for styling (custom theme with primary: #2563eb, error: #dc2626).
Framer Motion: For animations (e.g., fade-ins, scale effects).
Heroicons: For icons (e.g., PencilSquareIcon, ClockIcon, ArrowRightEndOnRectangleIcon).

State Management:
React Context: For authentication state (AuthContext).
React Hooks: useState, useEffect, useNavigate, useContext.


HTTP Client:
Axios: For API requests to fetch exams, submit answers, and retrieve results.


Assets:
Custom logo (ELogo.png) for branding in Navbar and cards.


Fonts:
'Georgia', serif: For titles (e.g., exam titles, page headings).
'Gill Sans', sans-serif: For body text and buttons.

# The site is deployed and is live now at 
 - 📱 [Eleva Online Quiz System]()

## Setup Instructions

### **1. Get the repository**
```sh
cd Eleva (Elevate knowledge)
```

### **2. Get to the backend for backend dependency installation**
```sh
cd backend
npm install
```

### **3. Get to the frontend for frontend dependency installation**
```sh
cd frontend
npm install
```

### **4. Setup Environment Variables (backend)**
Create a `.env` file in the root directory (backend) and add the following:
```env
PORT=5000
MONGO_URI=<mongodb+srv:<MongoDB_URi>>
JWT_SECRET=<JWT Token>
```

### **4. Setup Environment Variables (frontend)**
Create a `.env` file in the root directory (frontend) and add the following:
```env
VITE_API_URL=http://localhost:5000/api
```

### **5. Start the Server**
```sh
npm run dev
```
The API will run on `http://localhost:5000`.

### **6. Start the client**
```sh
npm run dev
```

---

## 🚀 Technologies used 🚀

 - 📱 [MongoDB](https://www.mongodb.com/)
 - 📱 [Express](https://expressjs.com/)
 - 📱 [React](https://react.dev/)
 - 📱 [Node Js](https://nodejs.org/en)

 ## 🚀 Libraries used 🚀

 - 📱 [ReactIcons/Fa](https://www.mongodb.com/](https://www.npmjs.com/package/react-icons)
 - 📱 [Framer Motion](https://expressjs.com/](https://motion.dev/docs/react)
 - 📱 [HeroIcons](https://react.dev/](https://heroicons.com/)

## Endpoints

# To test the API endpoints, use the following Postman collection:Eleva Postman Collection
 - 📱 [Eleva Online Quiz System](https://.postman.co/workspace/My-Workspace~3e05d1cc-7d21-4e88-8d55-ddba4f855d13/collection/33331251-af223994-7423-4009-9eed-4b2679737ce0?action=share&creator=33331251)
---
