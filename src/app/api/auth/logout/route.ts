import { cookies } from 'next/headers'; // Import Next.js cookies utility for managing HTTP-only cookies.

export async function POST() {
  try {
    const cookieStore = await cookies(); // Retrieve cookies from the user's browser.

    cookieStore.delete('token'); // Delete the JWT token cookie to log out the user.

    return new Response(null, {
      status: 302, // Redirect response code indicating successful logout.
      headers: { Location: '/login' }, // Redirect user to login page after logout.
    });
  } catch (error) {
    console.error('Logout error:', error); // Log any errors that occur during processing.

    return new Response(
      JSON.stringify({ errors: [{ message: 'Failed to log out. Please try again.' }] }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
