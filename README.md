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

### 🛠️ Tools You'll Need  
To get started with this project, you'll need the following tools:

#### 1. **Download and Install:** [Visual Studio Code](https://code.visualstudio.com/) 
   > Code editor for writing and managing your project files.  

#### 2. **Download and Install:** [Node.js (LTS)](https://nodejs.org/en/) 
   > A JavaScript runtime environment for running server-side code. Make sure to install version 20 or later.  

#### 3. **Sign up or Sign in:** [MongoDB Atlas (Database)](https://www.mongodb.com/cloud/atlas) 
   > Cloud-based database to securely store user data.  

#### 4. **Sign up or Sign in:** [GitHub](https://github.com/) 
   > A platform for hosting and collaborating on code repositories. You’ll use GitHub to push your project and deploy it with Vercel.  

#### 5. **Sign up or Sign in:** [Vercel](https://vercel.com/) 
   > Deployment platform for hosting your application.

---

## Setup Instructions
Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/jengerred/Reusable-NEXT-User-Auth.git
cd Reusable-NEXT-User-Auth
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
1. Create a `.env.local` file in the root directory of your project by typing the following command in your terminal:  
> touch .env.local

 2. Add the following variables to your newly created `.env.local` file:
```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
Runtime=nodejs
```
<details>
<summary>How to Get Your MongoDB Connection String</summary>
 
   
  #### - 1. Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
  
  **- 2. Create a new cluster** (free tier available).
  
  **- 3.** Under "**Database Access**," create a **database user** with a **username** and **password.**
  
  **- 4.** Under "**Network Access**," **allow access** from your IP address or `0.0.0.0/0` (for development).
  
  **- 5. Click "Connect" → "Drivers" → Copy the connection string** (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority`).
  
  **- 6. Replace** `<username>`, `<password>`, and `<dbname>` with your actual database credentials.
  
  **- 7.** Replace **`your_mongodb_connection_string`** in **`.env.local`** with **your connection string**.
    </details>
    
  ---
  
<details>
<summary>How to Generate a Secure JWT Secret Key:</summary> 
   
   
  #### - 1. Open your terminal in the project directory.
   
  **- 2.** Run the following command to **generate a secure random key**:  
     ```
     node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
     ```
     
  **- 3. Copy the output and paste it** into `JWT_SECRET` in your `.env.local` file.
  
</details>

---

### 4. Run the Development Server
Start the development server locally:
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser to view the app.

---

## Deployment
To deploy this project using Vercel:
1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and import your repository.
3. Add the environment variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`, `Runtime`) in Vercel's dashboard under "Environment Variables."
4. Deploy your project with one click!

---

## Want to Learn How To Create this Yourself?
To help others recreate this project, I’ve created a detailed tutorial that walks through every step of building this authentication system **from scratch**. The tutorial covers:
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

---

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE.md) file for details.

### Commercial Use
While this project is free for personal and educational use under the MIT License, commercial use requires purchasing a license.  
Visit [Buy Commercial License](https://gumroad.com/your-link) for details.




