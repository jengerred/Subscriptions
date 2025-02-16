import connectDB from '@/lib/db'; // Import the function to establish a connection to the MongoDB database.
import { User } from '@/models/User'; // Import the User model to interact with the user collection in MongoDB.
import { createJWT } from '@/lib/auth'; // Import the function to create JSON Web Tokens (JWT) for authentication.
import { cookies } from 'next/headers'; // Import Next.js cookies utility for managing HTTP-only cookies.
import { z } from 'zod'; // Import Zod for schema validation of input data.

export const config = {
  runtime: 'nodejs', // Specify that this API route uses the Node.js runtime instead of Edge.
};

// Define a schema for validating registration input using Zod
const registerSchema = z.object({
  email: z.string().email('Invalid email address'), // Validate email format and return a custom error message if invalid.
  password: z.string()
    .min(12, 'Password must be at least 12 characters') // Ensure password is at least 12 characters long.
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter') // Require at least one uppercase letter in the password.
    .regex(/[0-9]/, 'Password must contain at least one number'), // Require at least one number in the password.
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters') // Enforce a minimum length of 2 characters for the first name.
    .max(50, 'First name too long'), // Enforce a maximum length of 50 characters for the first name.
});

export async function POST(request: Request) {
  try {
    await connectDB(); // Establish a connection to MongoDB.

    const requestData = await request.json(); // Parse the incoming JSON request body.

    // Validate input data against the schema using Zod
    const validationResult = registerSchema.safeParse(requestData);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues.map((issue) => ({
        field: issue.path.join('.'), // Identify which field caused the error (e.g., "email" or "password").
        message: issue.message, // Include the specific error message for that field.
      }));

      return new Response(
        JSON.stringify({ errors: errorMessages }), // Return all validation errors as a structured JSON response.
        { status: 400, headers: { 'Content-Type': 'application/json' } } // Set status to 400 (Bad Request).
      );
    }

    const { email, password, firstName } = validationResult.data; // Destructure validated fields from the request data.

    // Check if a user with the same email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          errors: [{ field: 'email', message: 'User already exists' }], // Return an error if the email is already registered.
        }),
        { status: 409, headers: { 'Content-Type': 'application/json' } } // Set status to 409 (Conflict).
      );
    }

    // Create a new user in the database
    const user = await User.create({
      email,
      password, // The password will be hashed automatically by a pre-save hook in the User model.
      firstName,
    });

    // Generate a JWT token for the new user
    const token = await createJWT(user._id.toString());

    // Set a secure HTTP-only cookie with the JWT token
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true, // Prevent client-side JavaScript access to the cookie (mitigates XSS attacks).
      secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production environments.
      sameSite: 'lax', // Restrict cross-site cookie usage except for top-level navigation.
      maxAge: 60 * 60 * 2, // Set expiration time to 2 hours (in seconds).
      path: '/', // Make the cookie accessible across all routes on the domain.
    });

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: user._id, // Return the user's unique ID.
          email: user.email, // Return the user's email address.
          firstName: user.firstName, // Return the user's first name.
        },
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } } // Set status to 201 (Created).
    );
  } catch (error) {
    console.error('Registration error:', error); // Log any errors that occur during processing.

    return new Response(
      JSON.stringify({ errors: [{ message: 'Internal server error' }] }), // Return a generic error message for unexpected issues.
      { status: 500, headers: { 'Content-Type': 'application/json' } } // Set status to 500 (Internal Server Error).
    );
  }
}
