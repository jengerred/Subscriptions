// Import necessary functions from jose for JWT operations
// NOTE: jose is a modern, secure library for JSON Web Token (JWT) operations
import { SignJWT, jwtVerify } from 'jose';


// Import bcrypt for password hashing and comparison
// NOTE: bcrypt is a secure password hashing function, resistant to rainbow table attacks
import bcrypt from 'bcryptjs';

// Password hashing function
// NOTE: This function hashes passwords with a salt factor of 12, which is considered secure
export const hashPassword = (password: string) => bcrypt.hash(password, 12);

// Password comparison function
// NOTE: This function securely compares a plain text password with a hashed password
export const comparePasswords = (password: string, hash: string) => 
  bcrypt.compare(password, hash);

// JWT creation function
// NOTE: This function creates a JWT token with a 2-hour expiration time
export const createJWT = (userId: string) => 
  new SignJWT({ userId }) // Create a new JWT with the userId as payload
    .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm to HS256
    .setIssuedAt() // Set the "issued at" time to now
    .setExpirationTime('2h') // Set the expiration time to 2 hours from now
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!)); // Sign the JWT with the secret key
// NOTE: Ensure JWT_SECRET is set in your environment variables for security

// JWT verification function
// NOTE: This function verifies the authenticity and expiration of a JWT token
export const verifyJWT = (token: string) => 
  jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!)); // Verify the JWT using the secret key
// NOTE: This function will throw an error if the token is invalid or expired
