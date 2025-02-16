import { cookies } from 'next/headers'; // Import Next.js cookies utility for managing HTTP-only cookies.

// NOTE: We use the Next.js cookies utility because it provides a secure way to handle
// server-side cookie operations, which is crucial for maintaining session security.

export async function POST() {
  try {
    const cookieStore = await cookies(); // Retrieve cookies from the user's browser.

    // NOTE: By using server-side cookie management, we ensure that the logout process
    // cannot be tampered with by client-side JavaScript, enhancing security.

    cookieStore.delete('token'); // Delete the JWT token cookie to log out the user.

    // NOTE: Deleting the token cookie effectively logs out the user by removing their
    // authentication credentials. This is a secure way to end a user's session.

    return new Response(null, {
      status: 302, // Redirect response code indicating successful logout.
      headers: { Location: '/login' }, // Redirect user to login page after logout.
    });

    // NOTE: Using a 302 redirect is a standard practice for logout operations.
    // It ensures that the user is immediately directed to the login page,
    // preventing them from accessing authenticated routes after logout.

  } catch (error) {
    console.error('Logout error:', error); // Log any errors that occur during processing.

    // NOTE: Error logging is crucial for debugging and monitoring the application's health.
    // However, we ensure that detailed error information is not exposed to the client.

    return new Response(
      JSON.stringify({ errors: [{ message: 'Failed to log out. Please try again.' }] }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );

    // NOTE: In case of an error, we return a generic message to the client.
    // This practice prevents potential information leakage about the system's internals,
    // which could be exploited by malicious actors.
  }
}

// SECURITY NOTES:
// 1. Server-side cookie management: By handling the logout process server-side,
//    we prevent client-side tampering with the authentication state.
// 2. HTTP-only cookies: The token is stored in an HTTP-only cookie, which protects
//    against cross-site scripting (XSS) attacks by making the cookie inaccessible to client-side scripts.
// 3. Immediate redirection: The user is immediately redirected to the login page,
//    reducing the window of opportunity for accessing authenticated resources after logout.
// 4. Error handling: Generic error messages are used to prevent information leakage.
// 5. Stateless authentication: By simply removing the JWT token, we maintain a stateless
//    authentication system, which is scalable and doesn't require server-side session storage.

// BEST PRACTICES:
// - Always use HTTPS in production to encrypt the cookie data in transit.
// - Implement CSRF protection for the logout endpoint if it's not already covered by a global CSRF middleware.
// - Consider implementing a token blacklist or using short-lived tokens with refresh mechanisms for additional security.
