import { createJWT } from '@/lib/auth';
import connectDB from '@/lib/db';
import { User } from '@/models/User';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const config = {
  runtime: 'nodejs', // Use Node.js runtime instead of Edge.
};

// Define a schema for validating login input using Zod.
const loginSchema = z.object({
  email: z.string().email('Invalid email format'), // Custom error message for invalid email format.
  password: z.string().min(8, 'Password must be at least 8 characters long'), // Custom error message for short passwords.
});

export async function POST(request: Request) {
  try {
    await connectDB(); // Establish a connection to MongoDB.

    const data = await request.json(); // Parse incoming JSON request body.

    // Validate input data against the schema.
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Invalid input',
          details: result.error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        }),
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Check if user exists in the database.
    const user = await User.findOne({ email }).select('+password'); // Include hashed password in query.

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Email not found' }),
        { status: 404 }
      );
    }

    // Check if the provided password matches the hashed password in the database.
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: 'Incorrect password' }),
        { status: 401 }
      );
    }

    // Generate a JWT token for the authenticated user.
    const token = await createJWT(user._id.toString());

    // Set a secure cookie with the token.
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 2, // Token expires in 2 hours.
      path: '/',
    });

    return new Response(
      JSON.stringify({
        firstName: user.firstName,
        email: user.email,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500 }
    );
  }
}
