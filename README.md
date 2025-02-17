# Reusable NEXT.js User Authentication System

## **Overview**
This repository contains a secure, reusable authentication system built with **NEXT.js**, **MongoDB**, and **Vercel**. The project demonstrates best practices in mobile and web application security, including password hashing, token-based authentication, and data encryption. It adheres to industry standards like the **OWASP Mobile Application Security Verification Standard (MASVS)** and integrates robust security measures to protect user data.

This system supports:
- **User Registration and Login**: Securely handle user credentials using bcrypt hashing.
- **JWT-Based Authentication**: Manage sessions with JSON Web Tokens (JWT) signed with HMAC-SHA256.
- **Protected Routes**: Ensure only authenticated users can access sensitive resources.
- **Encrypted Data Storage**: Use AES-256 encryption for sensitive data stored in MongoDB.
- **Scalability**: Designed to support additional features like Multi-Factor Authentication (MFA) and AI-driven threat detection.

## **Why This Project is Secure**
1. **Password Security**:
   - Passwords are hashed using bcrypt with a salt to prevent brute-force attacks.
   - Plaintext passwords are never stored in the database.

2. **Session Management**:
   - JWT tokens are used for session management, signed with HMAC-SHA256.
   - Tokens include expiration policies to mitigate session hijacking risks.

3. **Data Encryption**:
   - MongoDB stores sensitive user data encrypted with AES-256.
   - Data transmitted between the client and server is secured using HTTPS/TLS 1.3.

4. **Protected Routes**:
   - Only authenticated users with valid JWT tokens can access protected pages like the dashboard.

5. **Compliance with Standards**:
   - Adheres to OWASP MASVS Level 2 requirements for secure authentication mechanisms.
   - Implements secure coding practices to address vulnerabilities like improper credential storage (OWASP M1) and insecure communication (OWASP M2).

---

## **Future Enhancements**
To further enhance security, the following features can be implemented:
1. **Multi-Factor Authentication (MFA)**:
   Add an extra layer of security by requiring users to verify their identity through a second factor, such as an SMS code or biometric verification.

2. **AI-Driven Threat Detection**:
   Integrate machine learning models to detect anomalies in login patterns or suspicious activities in real time.

3. **Role-Based Access Control (RBAC)**:
   Implement fine-grained access control to restrict specific actions based on user roles (e.g., admin vs. regular user).

4. **Zero Trust Architecture**:
   Continuously validate user identities and device integrity before granting access to resources.

---

## **How to Use This Repository**

### Prerequisites
- Node.js installed on your system.
- A MongoDB database (local or cloud-based).
- A Vercel account for deployment.

### Setup Instructions
Follow these steps to set up the project locally:

#### 1. Clone the Repository
```bash
git clone https://github.com/jengerred/Reusable-NEXT-User-Auth.git
cd Reusable-NEXT-User-Auth
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add the following variables:
```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
Runtime=nodejs
```

#### 4. Connect MongoDB
Set up a MongoDB database (e.g., using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) and replace `your_mongodb_connection_string` in `.env.local` with your connection string.

#### 5. Run the Development Server
Start the development server locally:
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser to view the app.

---

## **Deployment**
To deploy this project using Vercel:
1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and import your repository.
3. Add the environment variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`, `Runtime`) in Vercel's dashboard under "Environment Variables."
4. Deploy your project with one click!

---

## **Step-by-Step Tutorial**
To help others recreate this project, I’ve created a detailed tutorial that walks through every step of building this authentication system from scratch. The tutorial covers:
1. Setting up a NEXT.js project.
2. Connecting MongoDB for secure data storage.
3. Implementing bcrypt for password hashing.
4. Using JWT for session management.
5. Securing routes with authentication middleware.
6. Deploying the app on Vercel.

You can find the tutorial [here](https://github.com/jengerred/Reusable-NEXT-User-Auth/wiki).

---

## **How to Use This Authentication System**
1. Register a new account on the registration page.
2. Log in using your credentials; your password will be securely hashed before being stored in the database.
3. Upon successful login, you’ll receive a JWT token that grants access to protected routes like the dashboard.
4. Use this system as a foundation for any app requiring secure user authentication, such as e-commerce platforms or social media apps.

---

## **Live Demo**
You can view the live version of this project here:  
[Live Demo](https://reusable-next-user-auth-woad.vercel.app/)

