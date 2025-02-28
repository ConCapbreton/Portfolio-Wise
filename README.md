# Portfolio Wise - Dynamic Portfolio with Dashboard

## 🎯 Project Overview
This project is a dynamic portfolio application that allows users to manage and display their skills. It features a secure user authentication system, a responsive design, and a dashboard for managing skills. The application is built using the MERN stack (MongoDB, Express, React, Node.js).

- **Live Demo**:  
  - You can check out the live app [here](https://portfoliowise.netlify.app/portfolio).

## 🚀 Project Details

### Features:
- **Dynamic Portfolio**: Users can create, update, and delete their skills in a dynamic portfolio.
- **User Authentication**: Secure login and signup process with JWT and Argon2.
- **Admin Dashboard**: Admin users have additional privileges to manage other users' permissions and status (Active/Inactive).
- **Responsive Design**: Built mobile-first with **Ant Design** for UI components.

### Technologies:
#### **Frontend**:
- **React**: For building the dynamic and responsive UI.
- **React Router DOM**: For navigation and routing within the app.
- **Axios**: For making HTTP requests to the backend API.
- **Ant Design**: For UI components (forms, buttons, modals, etc.).
- **Font Awesome**: For including icons (used for hamburger menu, user settings, etc.).
- **JWT Decode**: For decoding JWT tokens on the client-side.

#### **Backend**:
- **Node.js (Express)**: For building the server and handling requests.
- **MongoDB**: A NoSQL database for storing users, skills, and other data.
- **Mongoose**: An ODM (Object Document Mapper) for MongoDB, providing a schema-based solution to model application data.
- **jsonwebtoken (JWT)**: For secure user authentication and managing user sessions.
- **argon2**: A password hashing algorithm for secure password storage.
- **Cloudinary**: For managing and storing image uploads.
- **Multer**: For handling `multipart/form-data` and enabling image uploads via Cloudinary.
- **Multer-Storage-Cloudinary**: Storage engine for Multer to directly upload images to Cloudinary.
- **cookie-parser**: For parsing cookies, enabling session management.
- **cors**: To enable Cross-Origin Resource Sharing, allowing communication between the frontend and backend.
- **express-rate-limit**: To limit the number of requests from a client, adding a layer of security.
- **dotenv**: For managing environment variables securely.
- **Deployment**: Render (backend), Netlify (frontend)

## 📂 Project Structure
The project consists of three main folders:

- **front**: React frontend for the application
- **back**: Node.js backend for the API and authentication
- **Dossier Conception**: Contains the client report, graphic charter, wireframes, maquettes, Postman collection and the original instruction.

### GitHub Repo:
[GitHub Repository](https://github.com/ConCapbreton/Portfolio-Wise)

---

## 📌 Features

- **User Authentication**: 
- Users can sign up and log in securely.
  - **JWT Authentication**: The app uses a two-token system for secure authentication with **JWT** (JSON Web Tokens):
    - **Access Token**: A short-lived JWT used to authenticate user requests. It is included in the `Authorization` header for API calls.
    - **Refresh Token**: A secure, long-lived JWT stored in an **HTTP-only cookie**, ensuring it is not accessible from the client-side JavaScript preventing exposure to XSS vulnerabilities. It is used to obtain a new access token when the current one expires, enabling seamless user sessions.

- **User Roles**:
  - Users can be assigned two roles: **Basic** and **Admin**.
  - Admin users have additional privileges, such as the ability to:
    - Promote or demote users to/from Admin role.
    - Mark a user account as **Inactive**, preventing them from logging in.
    - Delete a user account and their associated data, including images stored on Cloudinary.

- **Skill Management**:
  - Users can create, update, and delete their skill entries.
  - Skills are displayed on the **Portfolio Page** as interactive cards, showing details like title, category, and proficiency level.
  
- **User Dashboard**:
  - Users have access to a **Dashboard** where they can manage their portfolio (add, edit, or delete skills).
  - Admin users have a **Users List Page** where they can manage other users (promote, deactivate, delete).
  - All Users can consult the skills of all the other Users. 

- **Mobile-First & Responsive Design**:
  - The app is designed using a mobile-first approach and is fully responsive, offering a smooth experience on both mobile devices and desktops.
  - A hamburger menu is used on mobile and tablet devices, while desktop users have a navigation bar.

- **Cloudinary Image Upload**:
  - User images are stored and managed securely using Cloudinary.
  - Users can upload images as part of their portfolio and skill entries.

---

## 🛠 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ConCapbreton/Portfolio-Wise.git
cd Portfolio-Wise
```

### 2. Set Up Frontend

1. Navigate to the `frontend` folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Create a `.env` file in the `frontend` folder and add the following environment variable:
   ```bash
   REACT_APP_API_URL=http://localhost:5000  # Update with the backend URL (for local development or production URL)
   ```

### 3. Set Up Backend

1. Navigate to the `backend` folder and install dependencies:
   ```bash
   cd ../backend
   npm install
   ```

2. Create a `.env` file in the `backend` folder and add the following environment variables:
   ```bash
   DATABASE_URI=mongodb://localhost:27017/portfolio-wise  # Replace with your MongoDB connection string
   ACCESS_TOKEN_SECRET=your-access-token-secret
   REFRESH_TOKEN_SECRET=your-refresh-token-secret
   PORT=5000  # You can change the port if necessary
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

   **Note**: Update the values of the environment variables with the appropriate credentials.

### 4. Update `allowedOrigins` in the Backend

To run the project locally, you need to update the `allowedOrigins` or `corsOptions` in the backend (`backend/corsOptions.js`) to reflect the locally hosted frontend URL.

For local development, you should add your frontend URL to `allowedOrigins`:

```js
const allowedOrigins = [
    'http://localhost:3000',  // Add the frontend URL when running locally
    // Include other URLs for production, etc.
];
```

### 5. Run the Application Locally

To run the backend and frontend locally, follow these steps:

#### Backend:
1. In the `backend` folder, run the following command:
   ```bash
   npm start
   ```
   This will start the backend server on the port specified (default is 5000).

#### Frontend:
1. In the `frontend` folder, run the following command:
   ```bash
   npm start
   ```
   This will start the frontend development server and the app will be accessible at `http://localhost:3000` by default.

### 6. Testing the API

You can test the backend API using tools like **Postman** or **Insomnia**. A Postman collection is included in the project for easier testing of API routes. You can import the collection from the `Dossier Conception` folder.
```