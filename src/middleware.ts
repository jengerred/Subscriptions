// Import necessary types and functions from Next.js and custom auth library
import { NextResponse, type NextRequest } from 'next/server';
import { verifyJWT } from './lib/auth';

// NOTE: This middleware function protects routes by checking for a valid JWT token.
// It runs before the request is completed and can redirect unauthenticated users.

// Define the middleware function to handle incoming requests
export async function middleware(request: NextRequest) {

  // Extract the token from the request cookies
  // NOTE: The token is stored in an HTTP-only cookie for security
  const token = request.cookies.get('token')?.value;

  // Get the current path from the request URL
  // NOTE: This allows us to apply different logic based on the requested route
  const path = request.nextUrl.pathname;

  // Check if the path starts with '/dashboard' and there's no token
  // NOTE: This specifically protects the dashboard routes
  if (path.startsWith('/dashboard') && !token) {
    
    // Redirect to the login page if trying to access dashboard without a token
    // NOTE: This ensures unauthenticated users can't access protected routes
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // If a token exists, verify it using the custom verifyJWT function
    // NOTE: This checks if the token is valid and not expired
    if (token) await verifyJWT(token);

    // If verification is successful, allow the request to proceed
    // NOTE: This lets authenticated users access the requested route
    return NextResponse.next();
  } catch  {
    // If token verification fails, redirect to the login page
    // NOTE: This handles cases where the token is invalid or expired
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configure which routes the middleware should run on
// NOTE: This ensures the middleware only runs on dashboard routes, optimizing performance
export const config = {
  matcher: ['/dashboard/:path*'], // Apply to all routes starting with '/dashboard'
}
