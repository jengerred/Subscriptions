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
    await connectDB(); // Connect to MongoDB.

    const data = await request.json(); // Parse incoming JSON request body.

    // Validate input data against the schema.
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));

      return new Response(
        JSON.stringify({ errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { email, password } = result.data;

    // Check if user exists in the database.
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return new Response(
        JSON.stringify({
          errors: [{ field: 'email', message: 'Email not found' }],
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if the provided password matches the hashed password in the database.
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({
          errors: [{ field: 'password', message: 'Incorrect password' }],
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate a JWT token for the authenticated user.
    const token = await createJWT(user._id.toString());

    // Set a secure HTTP-only cookie with the token.
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
        success: true,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ errors: [{ message: 'Internal server error' }] }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
